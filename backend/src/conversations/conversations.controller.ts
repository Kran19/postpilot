import { Controller, Get, Post, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TenantGuard } from '../workspaces/tenant.guard';

@UseGuards(JwtAuthGuard, TenantGuard)
@Controller('api/v1/workspaces/:wsId/inbox/conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get()
  async getConversations(@Param('wsId') wsId: string) {
    return this.conversationsService.getWorkspaceConversations(wsId);
  }

  @Post(':id/messages')
  async sendMessage(
    @Param('wsId') wsId: string,
    @Param('id') id: string,
    @Body('text') text: string,
    @Request() req: any,
  ) {
    return this.conversationsService.sendMessage(wsId, id, text, req.user.email);
  }
}
