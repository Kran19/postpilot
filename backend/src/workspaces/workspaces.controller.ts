import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TenantGuard } from './tenant.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/v1/workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Get()
  async getWorkspaces(@Request() req: any) {
    return this.workspacesService.getUserWorkspaces(req.user.userId);
  }

  @UseGuards(TenantGuard)
  @Get(':wsId')
  async getWorkspaceDetails(@Param('wsId') wsId: string) {
    return this.workspacesService.getWorkspaceById(wsId);
  }
}
