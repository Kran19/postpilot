import { Controller, Get, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async checkHealth() {
    let dbStatus = 'healthy';
    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch (err: any) {
      this.logger.error(`Database healthcheck query failed: ${err.message}`);
      dbStatus = 'degraded';
    }

    return {
      status: 'up',
      timestamp: new Date().toISOString(),
      service: 'POSTPILOT Backend API',
      version: '1.0.0',
      database: dbStatus,
      metaApiVersion: process.env.META_API_VERSION || 'v21.0',
    };
  }
}
