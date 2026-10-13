import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ComplianceController } from './compliance.controller';

@Module({
  controllers: [HealthController, ComplianceController],
})
export class HealthModule {}

