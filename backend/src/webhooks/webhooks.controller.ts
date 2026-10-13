import { Controller, Get, Post, Query, Body, Headers, HttpCode, HttpStatus, Req, Header } from '@nestjs/common';
import { Request } from 'express';
import { WebhooksService } from './webhooks.service';

@Controller('api/v1/webhooks/meta')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Get()
  @Header('Content-Type', 'text/plain')
  verifySubscription(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
  ) {
    return this.webhooksService.verifySubscriptionToken(mode, token, challenge);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Body() payload: any,
    @Headers('x-hub-signature-256') signature: string,
    @Req() req: Request,
  ) {
    const rawBodyBuffer = (req as any).rawBody || Buffer.from(JSON.stringify(payload || {}));
    const isSignatureValid = this.webhooksService.verifyHmacSignature(rawBodyBuffer, signature);
    const result = await this.webhooksService.processIncomingWebhook(payload, isSignatureValid);
    return { status: 'acknowledged', eventId: result.eventId, duplicate: result.duplicate };
  }
}
