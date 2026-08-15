import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TenantGuard } from '../workspaces/tenant.guard';

@UseGuards(JwtAuthGuard, TenantGuard)
@Controller('api/v1/workspaces/:wsId/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  async getOverview(@Param('wsId') wsId: string) {
    return this.analyticsService.getOverview(wsId);
  }
}
