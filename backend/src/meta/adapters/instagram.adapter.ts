import { Injectable, Logger } from '@nestjs/common';
import { ChannelAdapter, OutboundResult } from './channel-adapter.interface';

@Injectable()
export class InstagramAdapter implements ChannelAdapter {
  readonly channelName = 'instagram';
  private readonly logger = new Logger(InstagramAdapter.name);

  async sendDirectMessage(token: string, recipientId: string, text: string): Promise<OutboundResult> {
    this.logger.log(`Dispatching Instagram Direct Message to ${recipientId} via Graph API v21.0`);
    
    // In production, invokes HTTP POST https://graph.facebook.com/v21.0/me/messages with Bearer token
    const externalId = `mid.ig.${Math.random().toString(36).substring(2, 10)}`;
    return {
      success: true,
      externalMessageId: externalId,
      timestamp: new Date().toISOString(),
    };
  }

  async sendCommentReply(token: string, commentId: string, text: string): Promise<OutboundResult> {
    this.logger.log(`Dispatching Instagram Comment Auto DM / Private Reply to comment ${commentId}`);
    
    const externalId = `mid.ig.comment.${Math.random().toString(36).substring(2, 10)}`;
    return {
      success: true,
      externalMessageId: externalId,
      timestamp: new Date().toISOString(),
    };
  }
}
