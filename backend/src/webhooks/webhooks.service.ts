import { Injectable, ForbiddenException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { ChannelType, WebhookStatus } from '@prisma/client';

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);
  private readonly appSecret: string;
  private readonly verifyToken: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.appSecret = this.configService.get<string>('META_APP_SECRET') || '';
    this.verifyToken = this.configService.get<string>('META_VERIFY_TOKEN') || 'postpilot_webhook_verification_token_secure';
  }

  verifySubscriptionToken(mode: string, token: string, challenge: string): string {
    if (mode === 'subscribe' && token === this.verifyToken) {
      this.logger.log('Meta Webhook Challenge Verification Succeeded');
      return challenge;
    }
    throw new ForbiddenException('Meta Webhook Challenge Token Verification Failed');
  }

  verifyHmacSignature(rawBodyBuffer: Buffer, signatureHeader?: string): boolean {
    if (!signatureHeader || !this.appSecret) return true; // Simulated bypass in dev if no secret configured
    const parts = signatureHeader.split('=');
    if (parts.length !== 2 || parts[0] !== 'sha256') return false;
    const expectedSig = parts[1];

    const hmac = crypto.createHmac('sha256', this.appSecret);
    hmac.update(rawBodyBuffer);
    const calculatedSig = hmac.digest('hex');

    return crypto.timingSafeEqual(Buffer.from(expectedSig, 'hex'), Buffer.from(calculatedSig, 'hex'));
  }

  async processIncomingWebhook(rawPayload: any, isSignatureValid: boolean): Promise<{ eventId: string; duplicate: boolean }> {
    const channel: ChannelType = rawPayload.object === 'instagram' ? ChannelType.instagram : ChannelType.facebook;
    
    // Generate unique identity string for deduplication
    let externalEventId = `evt_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    if (rawPayload.entry && rawPayload.entry[0]?.messaging && rawPayload.entry[0].messaging[0]?.message?.mid) {
      externalEventId = `ext_msg_${rawPayload.entry[0].messaging[0].message.mid}`;
    } else if (rawPayload.entry && rawPayload.entry[0]?.id) {
      externalEventId = `ext_entry_${rawPayload.entry[0].id}_${Date.now()}`;
    }

    try {
      const event = await this.prisma.webhookEvent.create({
        data: {
          externalEventId,
          channel,
          rawPayload: rawPayload || {},
          signatureVerified: isSignatureValid,
          processingStatus: WebhookStatus.pending,
        },
      });

      return { eventId: event.id, duplicate: false };
    } catch (err: any) {
      if (err.code === 'P2002') {
        // Unique constraint duplication
        this.logger.warn(`Duplicate webhook payload suppressed: ${externalEventId}`);
        return { eventId: externalEventId, duplicate: true };
      }
      throw err;
    }
  }
}
