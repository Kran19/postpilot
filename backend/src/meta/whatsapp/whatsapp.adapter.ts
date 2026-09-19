import { Injectable, Logger } from '@nestjs/common';
import { ChannelAdapter, OutboundResult } from '../adapters/channel-adapter.interface';

@Injectable()
export class WhatsAppAdapter implements ChannelAdapter {
  readonly channelName = 'whatsapp' as const;
  private readonly logger = new Logger(WhatsAppAdapter.name);

  async sendDirectMessage(
    token: string,
    recipientPhoneNumber: string,
    text: string,
  ): Promise<OutboundResult> {
    this.logger.log(`[WhatsAppAdapter] Sending direct message to ${recipientPhoneNumber}`);

    try {
      // In production environment with live Graph API credentials:
      // const response = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
      //   method: 'POST',
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     messaging_product: 'whatsapp',
      //     to: recipientPhoneNumber,
      //     type: 'text',
      //     text: { body: text },
      //   }),
      // });
      
      const simulatedMessageId = `wamid.HBgL${Date.now()}`;
      return {
        success: true,
        externalMessageId: simulatedMessageId,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      this.logger.error(`[WhatsAppAdapter] Failed to send message: ${error.message}`);
      return {
        success: false,
        errorMessage: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async sendCommentReply(
    token: string,
    commentId: string,
    text: string,
  ): Promise<OutboundResult> {
    // WhatsApp does not have public comments, route to standard direct response
    return this.sendDirectMessage(token, commentId, text);
  }

  async sendTemplateMessage(
    token: string,
    recipientPhoneNumber: string,
    templateName: string,
    languageCode: string,
    components: any[],
  ): Promise<OutboundResult> {
    this.logger.log(`[WhatsAppAdapter] Sending template ${templateName} (${languageCode}) to ${recipientPhoneNumber}`);

    return {
      success: true,
      externalMessageId: `wamid.HSM.${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
  }
}
