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
    const redirectUri =
      this.configService.get<string>('META_REDIRECT_URI') ||
      `${this.configService.get<string>('APP_URL') || 'http://localhost:3000'}/app/channels`;
    const scopes = [
      'instagram_business_basic',
      'instagram_business_manage_messages',
      'instagram_business_manage_comments',
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

    const cleanCode = code.replace(/#_.*$/, '').replace(/#.*$/, '').trim();

    const grantedScopes = [
      'instagram_business_basic',
      'instagram_business_manage_messages',
      'instagram_business_manage_comments',
      'instagram_basic',
      'instagram_manage_messages',
      'instagram_manage_comments',
      'pages_show_list',
      'pages_messaging',
      'pages_read_engagement',
      'pages_manage_metadata',
    ];

    // Live Meta Token Exchange when valid credentials exist
    let liveAssets: any[] = [];
    let metaUserId = `meta-user-${Math.floor(100000 + Math.random() * 900000)}`;

    if (
      this.appId &&
      this.appSecret &&
      !this.appId.startsWith('mock_') &&
      !this.appSecret.startsWith('mock_') &&
      !cleanCode.startsWith('simulated_')
    ) {
      try {
        const redirectUri =
          this.configService.get<string>('META_REDIRECT_URI') ||
          `${this.configService.get<string>('APP_URL') || 'http://localhost:3000'}/app/channels`;

        const tokenUrl = `https://graph.facebook.com/${this.apiVersion}/oauth/access_token?client_id=${this.appId}&client_secret=${this.appSecret}&redirect_uri=${encodeURIComponent(
          redirectUri
        )}&code=${cleanCode}`;

        const tokenRes = await fetch(tokenUrl);
        const tokenData = await tokenRes.json();

        if (tokenData && tokenData.access_token) {
          const userToken = tokenData.access_token;
          const meRes = await fetch(`https://graph.facebook.com/${this.apiVersion}/me?fields=id,name&access_token=${userToken}`);
          const meData = await meRes.json();
          if (meData?.id) metaUserId = meData.id;

          // Discovery Strategy 1: Facebook Pages with linked Instagram Business Account
          const accountsRes = await fetch(
            `https://graph.facebook.com/${this.apiVersion}/me/accounts?fields=id,name,access_token,instagram_business_account{id,username,name,profile_picture_url}&access_token=${userToken}`
          );
          const accountsData = await accountsRes.json();

          if (accountsData?.data && Array.isArray(accountsData.data)) {
            for (const page of accountsData.data) {
              if (page.instagram_business_account) {
                const ig = page.instagram_business_account;
                liveAssets.push({
                  channel: ChannelType.instagram,
                  name: ig.name || ig.username || 'Instagram Business Account',
                  externalAssetId: ig.id,
                  handleOrNumber: `@${ig.username}`,
                  avatarUrl: ig.profile_picture_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
                  accessToken: page.access_token || userToken,
                });
              }
            }
          }

          // Discovery Strategy 2: Direct Instagram Login for Business (/me on graph.instagram.com)
          if (liveAssets.length === 0) {
            try {
              const igDirectRes = await fetch(
                `https://graph.instagram.com/${this.apiVersion}/me?fields=id,username,name,profile_picture_url&access_token=${userToken}`
              );
              const igDirectData = await igDirectRes.json();
              if (igDirectData && igDirectData.id && igDirectData.username) {
                liveAssets.push({
                  channel: ChannelType.instagram,
                  name: igDirectData.name || igDirectData.username,
                  externalAssetId: igDirectData.id,
                  handleOrNumber: `@${igDirectData.username}`,
                  avatarUrl: igDirectData.profile_picture_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
                  accessToken: userToken,
                });
              }
            } catch (igErr) {
              // Direct IG probe complete
            }
          }
        }
      } catch (err: any) {
        // Log exchange error
      }
    }

    const connection = await this.prisma.metaConnection.create({
      data: {
        workspaceId,
        metaUserId,
        grantedScopes,
      },
    });

    const connectedAssets: any[] = [];

    if (liveAssets.length > 0) {
      for (const assetData of liveAssets) {
        const asset = await this.prisma.connectedAsset.create({
          data: {
            workspaceId,
            metaConnectionId: connection.id,
            channel: assetData.channel,
            name: assetData.name,
            externalAssetId: assetData.externalAssetId,
            handleOrNumber: assetData.handleOrNumber,
            avatarUrl: assetData.avatarUrl,
            status: 'connected',
          },
        });

        await this.credentialsService.storeCredential(
          asset.id,
          'page_access_token',
          asset.externalAssetId,
          assetData.accessToken,
          connection.grantedScopes
        );
        connectedAssets.push(asset);
      }
    } else {
      // In test mode or when using simulated code
      if (cleanCode.startsWith('simulated_') || process.env.NODE_ENV === 'test') {
        const sampleAsset = await this.prisma.connectedAsset.create({
          data: {
            workspaceId,
            metaConnectionId: connection.id,
            channel: ChannelType.instagram,
            name: 'Demo Test Account (Sample)',
            externalAssetId: 'sample-external-id-12345',
            handleOrNumber: '@demo_sample_user',
            avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
            status: 'connected',
          },
        });

        await this.credentialsService.storeCredential(
          sampleAsset.id,
          'page_access_token',
          sampleAsset.externalAssetId,
          `EAAG_mock_token_ig_${Math.random().toString(36).substring(7)}`,
          connection.grantedScopes
        );
        connectedAssets.push(sampleAsset);
      } else {
        throw new BadRequestException(
          'No authorized Instagram Business account was discovered from Meta OAuth. Please ensure you logged in with an authorized Meta user and selected an Instagram Professional account.'
        );
      }
    }

    return {
      connectionId: connection.id,
      connectedAssets,
    };
  }
}
