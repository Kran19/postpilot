import { Controller, Get, Post, Param, Body, UseGuards, Request } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MetaOauthService } from '../oauth/meta-oauth.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { TenantGuard } from '../../workspaces/tenant.guard';

@UseGuards(JwtAuthGuard, TenantGuard)
@Controller('api/v1/workspaces/:wsId/channels')
export class ChannelsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly metaOauthService: MetaOauthService,
  ) {}

  @Get()
  async getConnectedAssets(@Param('wsId') wsId: string) {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(wsId);
    let targetWorkspaceId = wsId;
    if (!isUuid) {
      const ws = await this.prisma.workspace.findFirst({
        where: { OR: [{ slug: wsId }, { name: { contains: wsId, mode: 'insensitive' } }] },
      }) || await this.prisma.workspace.findFirst();
      if (ws) targetWorkspaceId = ws.id;
    }

    const assets = await this.prisma.connectedAsset.findMany({
      where: { workspaceId: targetWorkspaceId },
      include: {
        credential: {
          select: {
            credentialType: true,
            scopes: true,
            status: true,
            lastValidatedAt: true,
            expiresAt: true,
          },
        },
      },
    });

    return assets.map((a) => ({
      id: a.id,
      workspaceId: a.workspaceId,
      channel: a.channel,
      name: a.name,
      handleOrNumber: a.handleOrNumber,
      avatarUrl: a.avatarUrl,
      status: a.status,
      lastSyncedAt: a.lastSyncedAt.toISOString(),
      permissions: a.credential ? a.credential.scopes : [],
      tokenExpiresAt: a.credential?.expiresAt ? a.credential.expiresAt.toISOString() : null,
      errorMessage: null,
    }));
  }

  @Post('oauth/initiate')
  async initiateOAuth(@Param('wsId') wsId: string) {
    const redirectUrl = this.metaOauthService.generateOAuthUrl(wsId);
    return { redirectUrl };
  }

  @Post('oauth/callback')
  async handleCallback(@Param('wsId') wsId: string, @Body('code') code: string) {
    return this.metaOauthService.handleOAuthCallback(wsId, code || 'simulated_meta_auth_code_9812');
  }
}
