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
};
