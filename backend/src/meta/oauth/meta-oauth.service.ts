import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { CredentialsService } from '../credentials/credentials.service';
import { ChannelType } from '@prisma/client';

@Injectable()
export class MetaOauthService {
  private readonly appId: string;
  private readonly appSecret: string;
  private readonly apiVersion: string;
  private readonly baseUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly credentialsService: CredentialsService,
  ) {
    this.appId = this.configService.get<string>('META_APP_ID') || '';
    this.appSecret = this.configService.get<string>('META_APP_SECRET') || '';
    this.apiVersion = this.configService.get<string>('META_API_VERSION') || 'v21.0';
    this.baseUrl = this.configService.get<string>('META_GRAPH_API_BASE_URL') || 'https://graph.facebook.com';
  }

  generateOAuthUrl(workspaceId: string): string {
    const redirectUri = `${this.configService.get<string>('API_URL')}/api/v1/workspaces/${workspaceId}/channels/oauth/callback`;
    const scopes = [
      'instagram_basic',
      'instagram_manage_messages',
      'instagram_manage_comments',
      'pages_show_list',
      'pages_messaging',
      'pages_read_engagement',
      'pages_manage_metadata',
    ].join(',');

    return `https://www.facebook.com/${this.apiVersion}/dialog/oauth?client_id=${this.appId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scopes}&state=${workspaceId}`;
  }

  async handleOAuthCallback(workspaceId: string, code: string) {
    if (!code) {
      throw new BadRequestException('Authorization code missing');
    }

    // In production, exchange code with https://graph.facebook.com/v21.0/oauth/access_token
    // Here we generate simulated discovered assets for Facebook & Instagram Professional accounts
    const mockMetaUserId = `meta-user-${Math.floor(100000 + Math.random() * 900000)}`;

    const connection = await this.prisma.metaConnection.create({
      data: {
        workspaceId,
        metaUserId: mockMetaUserId,
        grantedScopes: [
          'instagram_basic',
          'instagram_manage_messages',
          'instagram_manage_comments',
          'pages_show_list',
          'pages_messaging',
          'pages_read_engagement',
          'pages_manage_metadata',
        ],
      },
    });

    // Discovered Assets (1 Instagram Professional + 1 Facebook Page)
    const igAsset = await this.prisma.connectedAsset.create({
      data: {
        workspaceId,
        metaConnectionId: connection.id,
        channel: ChannelType.instagram,
        name: 'Acme Studio Instagram',
        externalAssetId: `ig-asset-${Math.floor(10000 + Math.random() * 90000)}`,
        handleOrNumber: '@acmestudio',
        avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
        status: 'connected',
      },
    });

    await this.credentialsService.storeCredential(
      igAsset.id,
      'page_access_token',
      igAsset.externalAssetId,
      `EAAG_mock_token_ig_${Math.random().toString(36).substring(7)}`,
      connection.grantedScopes
    );

    const fbAsset = await this.prisma.connectedAsset.create({
      data: {
        workspaceId,
        metaConnectionId: connection.id,
        channel: ChannelType.facebook,
        name: 'Acme Studio Official Page',
        externalAssetId: `fb-page-${Math.floor(10000 + Math.random() * 90000)}`,
        handleOrNumber: 'Acme Studio FB',
        avatarUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150',
        status: 'connected',
      },
    });

    await this.credentialsService.storeCredential(
      fbAsset.id,
      'page_access_token',
      fbAsset.externalAssetId,
      `EAAG_mock_token_fb_${Math.random().toString(36).substring(7)}`,
      connection.grantedScopes
    );

    return {
      connectionId: connection.id,
      connectedAssets: [igAsset, fbAsset],
    };
  }
}
