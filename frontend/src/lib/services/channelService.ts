import { ApiClient } from './apiClient';
import { MOCK_CONNECTED_ASSETS } from '../mock-data';
import { ConnectedAsset, ChannelType } from '../types';

export const channelService = {
  async getConnectedAssets(workspaceId: string = 'empeor-smart-solutions'): Promise<ConnectedAsset[]> {
    try {
      const data = await ApiClient.get<ConnectedAsset[]>(`/workspaces/${workspaceId}/channels`);
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn('[channelService] Live backend channels unavailable, using fallback:', err);
    }
    return MOCK_CONNECTED_ASSETS.filter((a) => a.workspaceId === workspaceId || a.workspaceId === 'ws-acme');
  },

  async getAssetByChannel(workspaceId: string = 'empeor-smart-solutions', channel: ChannelType): Promise<ConnectedAsset | null> {
    const assets = await this.getConnectedAssets(workspaceId);
    return assets.find((a) => a.channel === channel) || null;
  },

  async connectChannel(workspaceId: string, channel: ChannelType, name: string, handleOrNumber: string): Promise<ConnectedAsset> {
    const newAsset: ConnectedAsset = {
      id: `asset-${channel}-${Date.now()}`,
      workspaceId,
      channel,
      name,
      handleOrNumber,
      status: 'connected',
      lastSyncedAt: 'Just now',
      permissions: ['messages_manage', 'basic_read'],
    };
    MOCK_CONNECTED_ASSETS.push(newAsset);
    return newAsset;
  },

  async disconnectChannel(assetId: string): Promise<boolean> {
    const idx = MOCK_CONNECTED_ASSETS.findIndex((a) => a.id === assetId);
    if (idx !== -1) {
      MOCK_CONNECTED_ASSETS[idx].status = 'disconnected';
    }
    return true;
  },

  async initiateOAuth(workspaceId: string = 'empeor-smart-solutions'): Promise<string> {
    try {
      const data = await ApiClient.post<{ redirectUrl: string }>(`/workspaces/${workspaceId}/channels/oauth/initiate`);
      if (data && data.redirectUrl) return data.redirectUrl;
    } catch (err) {
      console.warn('[channelService] Live OAuth initiate failed, generating fallback dialog URL:', err);
    }
    const appId = '4558736907726599';
    const redirect = `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/app/channels`;
    const scopes = 'instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments';
    return `https://www.facebook.com/v21.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirect)}&scope=${scopes}&state=${workspaceId}`;
  },

  async handleCallback(workspaceId: string = 'empeor-smart-solutions', code: string): Promise<any> {
    const cleanCode = code.replace(/#_.*$/, '').replace(/#.*$/, '').trim();
    return await ApiClient.post(`/workspaces/${workspaceId}/channels/oauth/callback`, { code: cleanCode });
  },
};
