import { MOCK_CONNECTED_ASSETS } from '../mock-data';
import { ConnectedAsset, ChannelType } from '../types';

export const channelService = {
  async getConnectedAssets(workspaceId: string): Promise<ConnectedAsset[]> {
    return Promise.resolve(MOCK_CONNECTED_ASSETS.filter((a) => a.workspaceId === workspaceId));
  },

  async getAssetByChannel(workspaceId: string, channel: ChannelType): Promise<ConnectedAsset | null> {
    const asset = MOCK_CONNECTED_ASSETS.find((a) => a.workspaceId === workspaceId && a.channel === channel);
    return Promise.resolve(asset || null);
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
    return Promise.resolve(newAsset);
  },

  async disconnectChannel(assetId: string): Promise<boolean> {
    const idx = MOCK_CONNECTED_ASSETS.findIndex((a) => a.id === assetId);
    if (idx !== -1) {
      MOCK_CONNECTED_ASSETS[idx].status = 'disconnected';
    }
    return Promise.resolve(true);
  },
};
