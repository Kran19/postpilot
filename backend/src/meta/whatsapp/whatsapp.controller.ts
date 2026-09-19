import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { WhatsAppService } from './whatsapp.service';

@Controller('api/v1/workspaces/:workspaceId/whatsapp')
export class WhatsAppController {
  constructor(private readonly whatsappService: WhatsAppService) {}

  @Get('metrics')
  async getMetrics(@Param('workspaceId') workspaceId: string) {
    return this.whatsappService.getMetrics(workspaceId);
  }

  @Get('assets')
  async getAssets(@Param('workspaceId') workspaceId: string) {
    return this.whatsappService.getConnectedWhatsAppAssets(workspaceId);
  }

  @Get('conversations')
  async getConversations(@Param('workspaceId') workspaceId: string) {
    return this.whatsappService.getConversations(workspaceId);
  }
}
