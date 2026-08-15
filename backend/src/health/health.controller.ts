import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async checkHealth() {
    let dbStatus = 'healthy';
    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch {
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
