import { Controller, Get, Post, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AutomationsService, CreateAutomationRuleDto } from './automations.service';
import { AutomationEngineService } from './engine/automation-engine.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TenantGuard } from '../workspaces/tenant.guard';
import { AutomationStatus } from '@prisma/client';

@UseGuards(JwtAuthGuard, TenantGuard)
@Controller('api/v1/workspaces/:wsId/automations')
export class AutomationsController {
  constructor(
    private readonly automationsService: AutomationsService,
    private readonly engineService: AutomationEngineService,
  ) {}

  @Get()
  async getAutomations(@Param('wsId') wsId: string) {
    return this.automationsService.getWorkspaceAutomations(wsId);
  }

  @Post()
  async createAutomation(
    @Param('wsId') wsId: string,
    @Body() dto: CreateAutomationRuleDto,
    @Request() req: any,
  ) {
    return this.automationsService.createAutomation(wsId, dto, req.user.userId);
  }

  @Patch(':id/status')
  async toggleStatus(
    @Param('wsId') wsId: string,
    @Param('id') id: string,
    @Body('status') status: AutomationStatus,
  ) {
    return this.automationsService.toggleStatus(wsId, id, status);
  }

  @Post(':id/test-run')
  async testRun(
    @Param('wsId') wsId: string,
    @Param('id') id: string,
    @Body('customerHandle') customerHandle: string,
  ) {
    return this.engineService.executeRule({
      workspaceId: wsId,
      automationId: id,
      customerHandle: customerHandle || '@test_user',
      customerName: 'Test Customer',
      connectedAssetId: 'ig-asset-default',
    });
  }
}
