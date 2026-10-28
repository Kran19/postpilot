#!/usr/bin/env bash
# ==============================================================================
# PostPilot Production Management & Deployment Script
# Domain: postpilot.vardaansmartsolutions.com
# ==============================================================================

set -e

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

DOMAIN="postpilot.vardaansmartsolutions.com"
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_DIR="${APP_DIR}/backups"

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Determine docker compose command
get_compose_cmd() {
    if docker compose version &>/dev/null; then
        echo "docker compose"
    elif command -v docker-compose &>/dev/null; then
        echo "docker-compose"
    else
        log_error "Neither 'docker compose' nor 'docker-compose' was found."
        exit 1
    fi
}

COMPOSE_CMD=$(get_compose_cmd)

# Check for .env file
check_env() {
    if [ ! -f "${APP_DIR}/.env" ]; then
        if [ -f "${APP_DIR}/.env.docker.example" ]; then
            log_warn ".env not found. Creating from .env.docker.example..."
            cp "${APP_DIR}/.env.docker.example" "${APP_DIR}/.env"
            log_warn "Please review and edit ${APP_DIR}/.env with your real secrets."
        else
            log_error ".env file missing and .env.docker.example not found!"
            exit 1
        fi
    fi
}

# 1. Full Deploy / Update
cmd_deploy() {
    log_info "Starting PostPilot production deployment..."
    cd "${APP_DIR}"
    check_env

    log_info "Pulling latest code from Git (main branch)..."
    git pull origin main

    log_info "Building and starting containers in background..."
    $COMPOSE_CMD up -d --build

    log_info "Waiting 8 seconds for database and backend initialization..."
    sleep 8

    log_info "Syncing database schema (Prisma db push)..."
    $COMPOSE_CMD exec -T backend npx prisma db push --skip-generate || {
        log_warn "Prisma push encountered a warning, retrying with generation..."
        $COMPOSE_CMD exec -T backend npx prisma db push
    }

    log_info "Pruning dangling Docker images to preserve disk space..."
    docker image prune -f &>/dev/null || true

    log_info "Verifying health endpoint..."
    HEALTH_OUTPUT=$(curl -s "http://127.0.0.1:4015/health" || curl -s "https://${DOMAIN}/health" || echo "")
    if [[ "${HEALTH_OUTPUT}" == *"\"status\":\"up\""* ]] && [[ "${HEALTH_OUTPUT}" == *"\"database\":\"healthy\""* ]]; then
        log_success "Deployment Complete & Database Healthy! Healthcheck response: ${HEALTH_OUTPUT}"
    else
        log_error "Deployment Alert: Health check reported unhealthy or degraded status: ${HEALTH_OUTPUT:-Endpoint pending startup}."
        log_info "Check container logs with: ./deploy.sh logs backend"
    fi

    log_success "PostPilot is running at https://${DOMAIN}"
}

# 2. Database Sync
cmd_db_push() {
    log_info "Running Prisma db push in backend container..."
    cd "${APP_DIR}"
    $COMPOSE_CMD exec backend npx prisma db push
    log_success "Database tables synced successfully!"
}

# 3. Database Backup
cmd_db_backup() {
    log_info "Creating PostgreSQL database backup..."
    mkdir -p "${BACKUP_DIR}"
    TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
    BACKUP_FILE="${BACKUP_DIR}/postpilot_db_${TIMESTAMP}.sql.gz"

    $COMPOSE_CMD exec -T postgres pg_dump -U postpilot -d postpilot_db | gzip > "${BACKUP_FILE}"
    
    if [ -s "${BACKUP_FILE}" ]; then
        log_success "Backup saved: ${BACKUP_FILE} ($(du -h "${BACKUP_FILE}" | cut -f1))"
    else
        log_error "Backup failed or generated empty file."
        rm -f "${BACKUP_FILE}"
        exit 1
    fi
}

# 4. View Logs
cmd_logs() {
    SERVICE="${1:-}"
    cd "${APP_DIR}"
    if [ -n "${SERVICE}" ]; then
        log_info "Tailing logs for service: ${SERVICE} (Ctrl+C to exit)..."
        $COMPOSE_CMD logs -f "${SERVICE}"
    else
        log_info "Tailing logs for all services (Ctrl+C to exit)..."
        $COMPOSE_CMD logs -f
    fi
}

# 5. Service Status
cmd_status() {
    log_info "=== Container Status ==="
    cd "${APP_DIR}"
    $COMPOSE_CMD ps

    echo ""
    log_info "=== Health Check ==="
    curl -s "http://127.0.0.1:4015/health" || echo "Backend not responding on localhost:4015"
    echo ""

    echo ""
    log_info "=== System Resources ==="
    free -h
    df -h / | tail -n 1
}

# 6. Restart Containers
cmd_restart() {
    SERVICE="${1:-}"
    cd "${APP_DIR}"
    if [ -n "${SERVICE}" ]; then
        log_info "Restarting service: ${SERVICE}..."
        $COMPOSE_CMD restart "${SERVICE}"
    else
        log_info "Restarting all PostPilot services..."
        $COMPOSE_CMD restart
    fi
    log_success "Done!"
}

# 7. Stop Containers
cmd_stop() {
    cd "${APP_DIR}"
    log_warn "Stopping PostPilot containers..."
    $COMPOSE_CMD down
    log_success "Containers stopped."
}

# 8. Host Nginx Setup & Reload
cmd_nginx() {
    log_info "Checking Host Nginx configuration..."
    if [ -f "/etc/nginx/conf.d/postpilot.vardaansmartsolutions.com.conf" ]; then
        log_info "Updating /etc/nginx/conf.d/postpilot.vardaansmartsolutions.com.conf..."
        cp "${APP_DIR}/nginx/postpilot.vardaansmartsolutions.com.conf" "/etc/nginx/conf.d/postpilot.vardaansmartsolutions.com.conf"
    fi

    log_info "Testing Nginx syntax..."
    nginx -t
    log_info "Reloading Nginx..."
    systemctl reload nginx
    log_success "Host Nginx reloaded successfully!"
}

# 9. SSL Certbot
cmd_ssl() {
    log_info "Requesting/Renewing SSL with Certbot for ${DOMAIN}..."
    certbot --nginx -d "${DOMAIN}"
    log_success "SSL configured!"
}

# Help / Usage Menu
cmd_help() {
    echo -e "${CYAN}====================================================${NC}"
    echo -e "${CYAN}    PostPilot Production CLI - Management Script    ${NC}"
    echo -e "${CYAN}====================================================${NC}"
    echo "Usage: ./deploy.sh [command]"
    echo ""
    echo "Commands:"
    echo "  deploy          (Default) Pull git, rebuild containers, sync DB, check health"
    echo "  update          Alias for 'deploy'"
    echo "  status          Show container status, healthcheck, RAM and disk usage"
    echo "  db:push         Push Prisma schema to PostgreSQL database"
    echo "  db:backup       Create timestamped gzipped backup of PostgreSQL"
    echo "  logs [service]  Tail logs (e.g., ./deploy.sh logs backend / frontend)"
    echo "  restart [svc]   Restart all or a specific container"
    echo "  stop            Stop all containers (docker compose down)"
    echo "  nginx           Reload host Nginx reverse proxy configuration"
    echo "  ssl             Run certbot SSL setup for domain"
    echo "  help            Display this help menu"
    echo ""
}

# Command Router
ACTION="${1:-deploy}"

case "${ACTION}" in
    deploy|update)
        cmd_deploy
        ;;
    status)
        cmd_status
        ;;
    db:push|db-push)
        cmd_db_push
        ;;
    db:backup|db-backup)
        cmd_db_backup
        ;;
    logs)
        cmd_logs "${2:-}"
        ;;
    restart)
        cmd_restart "${2:-}"
        ;;
    stop)
        cmd_stop
        ;;
    nginx)
        cmd_nginx
        ;;
    ssl)
        cmd_ssl
        ;;
    help|--help|-h)
        cmd_help
        ;;
    *)
        log_error "Unknown command: ${ACTION}"
        cmd_help
        exit 1
        ;;
esac
