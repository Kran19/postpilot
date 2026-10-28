import { Injectable, Logger } from '@nestjs/common';
import { ChannelAdapter, OutboundResult } from './channel-adapter.interface';

@Injectable()
export class InstagramAdapter implements ChannelAdapter {
  readonly channelName = 'instagram';
  private readonly logger = new Logger(InstagramAdapter.name);

  async sendDirectMessage(token: string, recipientId: string, text: string): Promise<OutboundResult> {
    this.logger.log(`Dispatching Instagram Direct Message to ${recipientId} via Graph API v21.0`);

    // Live Graph API call if a real token is provided
    if (token && (token.startsWith('EAA') || token.startsWith('IGA'))) {
      try {
        const endpoint = token.startsWith('IGA')
          ? 'https://graph.instagram.com/v21.0/me/messages'
          : 'https://graph.facebook.com/v21.0/me/messages';

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recipient: { id: recipientId },
            message: { text },
          }),
        });

        const data = await res.json();
        if (data && data.message_id) {
          return {
            success: true,
            externalMessageId: data.message_id,
            timestamp: new Date().toISOString(),
          };
        }
        return {
          success: false,
          errorMessage: data?.error?.message || 'Meta Graph API returned an error dispatching message',
          timestamp: new Date().toISOString(),
        };
      } catch (err: any) {
        this.logger.error(`Live Instagram DM dispatch failed: ${err.message}`);
        return {
          success: false,
          errorMessage: err.message,
          timestamp: new Date().toISOString(),
        };
      }
    }

    if (token && token.startsWith('mock_')) {
      const externalId = `mid.ig.test.${Math.random().toString(36).substring(2, 10)}`;
      return {
        success: true,
        externalMessageId: externalId,
        timestamp: new Date().toISOString(),
      };
    }

    return {
      success: false,
      errorMessage: 'Missing valid Meta Bearer token for outbound dispatch',
      timestamp: new Date().toISOString(),
    };
  }

  async sendCommentReply(token: string, commentId: string, text: string): Promise<OutboundResult> {
    this.logger.log(`Dispatching Instagram Comment Public Reply to comment ${commentId}`);

    if (token && (token.startsWith('EAA') || token.startsWith('IGA'))) {
      try {
        const endpoint = token.startsWith('IGA')
          ? `https://graph.instagram.com/v21.0/${commentId}/replies`
          : `https://graph.facebook.com/v21.0/${commentId}/replies`;

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: text }),
        });
        const replyData = await res.json();
        if (replyData && replyData.id) {
          return {
            success: true,
            externalMessageId: replyData.id,
            timestamp: new Date().toISOString(),
          };
        }
        return {
          success: false,
          errorMessage: replyData?.error?.message || 'Meta Graph API returned an error replying to comment',
          timestamp: new Date().toISOString(),
        };
      } catch (err: any) {
        this.logger.error(`Live Instagram comment reply failed: ${err.message}`);
        return {
          success: false,
          errorMessage: err.message,
          timestamp: new Date().toISOString(),
        };
      }
    }

    if (token && token.startsWith('mock_')) {
      const externalId = `mid.ig.comment.test.${Math.random().toString(36).substring(2, 10)}`;
      return {
        success: true,
        externalMessageId: externalId,
        timestamp: new Date().toISOString(),
      };
    }

    return {
      success: false,
      errorMessage: 'Missing valid Meta Bearer token for comment reply',
      timestamp: new Date().toISOString(),
    };
  }
}

