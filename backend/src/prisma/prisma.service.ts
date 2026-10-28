import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    const rawUrl = process.env.DATABASE_URL || '';
    const sanitizedUrl = rawUrl.replace(/:\/\/[^:]+:[^@]+@/, '://***:***@');
    this.logger.log(`Initializing database connection with target: ${sanitizedUrl || '[DATABASE_URL not set]'}`);

    try {
      await this.$connect();
      this.logger.log('Connected to database successfully.');
    } catch (err: any) {
      this.logger.warn(`Database connection failed on startup: ${err.message}. Backend will continue running in fallback mode.`);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
