'use client';

import React, { useEffect, useState } from 'react';
import { 
  Share2, 
  MessageSquare, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  RefreshCw, 
  Trash2,
  ExternalLink
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/icons/SocialIcons';
import { AppShell } from '@/components/layout/AppShell';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { channelService } from '@/lib/services/channelService';
import { ConnectedAsset, ChannelType } from '@/lib/types';

export default function ChannelsPage() {
  const [assets, setAssets] = useState<ConnectedAsset[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>('instagram');
  const [handle, setHandle] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    channelService.getConnectedAssets('empeor-smart-solutions').then(setAssets);
  }, []);

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);
    setTimeout(() => {
      channelService.connectChannel('empeor-smart-solutions', selectedChannel, `${selectedChannel.toUpperCase()} Asset`, handle).then((newAsset) => {
        setAssets((prev) => [...prev, newAsset]);
        setIsConnecting(false);
        setIsModalOpen(false);
        setHandle('');
      });
    }, 800);
  };

  const handleDisconnect = (id: string) => {
    if (confirm('Are you sure you want to disconnect this Meta asset? Active automations will stop executing for this channel.')) {
      channelService.disconnectChannel(id).then(() => {
        setAssets((prev) => prev.map((a) => a.id === id ? { ...a, status: 'disconnected' } : a));
      });
    }
  };

  return (
    <AppShell title="Integrations Hub">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Meta Connected Assets</h2>
            <p className="text-xs text-gray-500 mt-0.5">Manage OAuth permissions, access token lifecycles, and webhook subscriptions.</p>
          </div>
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />} onClick={() => setIsModalOpen(true)}>
            Connect Meta Asset
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {assets.map((asset) => (
            <div key={asset.id} className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-2xs ${
                    asset.channel === 'instagram' ? 'bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600' :
                    asset.channel === 'facebook' ? 'bg-[#1877F2]' :
                    asset.channel === 'whatsapp' ? 'bg-[#25D366]' : 'bg-black'
                  }`}>
                    {asset.channel === 'instagram' && <InstagramIcon className="w-5 h-5" />}
                    {asset.channel === 'facebook' && <FacebookIcon className="w-5 h-5" />}
                    {asset.channel === 'whatsapp' && <MessageSquare className="w-5 h-5 fill-white text-white" />}
                    {asset.channel === 'threads' && <span className="font-bold text-base">@</span>}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{asset.name}</h3>
                    <p className="text-xs text-gray-400 font-mono">{asset.handleOrNumber}</p>
                  </div>
                </div>

                <Badge variant={
                  asset.status === 'connected' ? 'success' :
                  asset.status === 'reauth_required' ? 'warning' : 'error'
                }>
                  {asset.status === 'connected' ? '● Connected' :
                   asset.status === 'reauth_required' ? '⚠ Reauth Required' : 'Disconnected'}
                </Badge>
              </div>

              {asset.errorMessage && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{asset.errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-xs bg-[#F8F9FA] p-3.5 rounded-xl border border-gray-200/70">
                <div>
                  <span className="text-gray-400 block text-[11px]">Followers / Audience</span>
                  <span className="font-bold text-gray-800">{asset.followerCount ? asset.followerCount.toLocaleString() : 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Last Sync Timestamp</span>
                  <span className="font-bold text-gray-800">{asset.lastSyncedAt}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Active Meta API Scopes
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {asset.permissions.map((perm) => (
                    <span key={perm} className="text-[10px] bg-gray-100 text-gray-700 font-medium px-2 py-0.5 rounded-md flex items-center gap-1 border border-gray-200">
                      <ShieldCheck className="w-3 h-3 text-[#16A34A]" /> {perm}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <Button variant="outline" size="sm" leftIcon={<RefreshCw className="w-3 h-3" />}>
                  Check Health
                </Button>
                {asset.status === 'connected' ? (
                  <Button variant="ghost" size="sm" className="text-rose-600 hover:bg-rose-50" onClick={() => handleDisconnect(asset.id)}>
                    Disconnect
                  </Button>
                ) : (
                  <Button variant="primary" size="sm">
                    Re-authorize Token
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Connect New Meta Channel"
          description="Initiate Meta Graph OAuth handshake to authorize page or account assets."
        >
          <form onSubmit={handleConnect} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Select Channel Type
              </label>
              <select
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value as ChannelType)}
                className="w-full bg-[#F6F7F9] border border-gray-200/90 text-gray-900 rounded-xl text-xs p-2.5 focus:outline-none focus:ring-1 focus:ring-gray-300"
              >
                <option value="instagram">Instagram Business Account</option>
                <option value="facebook">Facebook Page Messaging</option>
                <option value="whatsapp">WhatsApp Business Platform (WABA)</option>
                <option value="threads">Threads Account</option>
              </select>
            </div>

            <Input
              label="Account Handle or Phone Number"
              placeholder="@brand_handle or +1 (800) 555-0199"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              required
            />

            <div className="p-3 bg-[#EAF5EE] border border-[#D1E8D7] rounded-xl text-xs text-[#1D3B2A]">
              This will launch the standard Meta OAuth dialog requesting access tokens. Access tokens are encrypted at rest using AES-256-GCM.
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" className="w-1/2" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="w-1/2" isLoading={isConnecting}>
                Authorize with Meta
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AppShell>
  );
}
