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
import { Card } from '@/components/ui/Card';
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
    channelService.getConnectedAssets('ws-acme').then(setAssets);
  }, []);

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);
    setTimeout(() => {
      channelService.connectChannel('ws-acme', selectedChannel, `${selectedChannel.toUpperCase()} Asset`, handle).then((newAsset) => {
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
    <AppShell title="Integrations Hub" description="Manage Official Meta API Connected Channels">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">Meta Connected Assets</h2>
            <p className="text-xs text-slate-400 mt-0.5">Manage OAuth permissions, access token lifecycles, and webhook subscriptions.</p>
          </div>
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
            Connect Meta Asset
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assets.map((asset) => (
            <Card key={asset.id} className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg ${
                    asset.channel === 'instagram' ? 'bg-pink-600' :
                    asset.channel === 'facebook' ? 'bg-blue-600' :
                    asset.channel === 'whatsapp' ? 'bg-emerald-600' : 'bg-slate-800'
                  }`}>
                    {asset.channel === 'instagram' && <InstagramIcon className="w-6 h-6" />}
                    {asset.channel === 'facebook' && <FacebookIcon className="w-6 h-6" />}
                    {asset.channel === 'whatsapp' && <MessageSquare className="w-6 h-6" />}
                    {asset.channel === 'threads' && <span className="font-bold text-xl">@</span>}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{asset.name}</h3>
                    <p className="text-xs text-slate-400 font-mono">{asset.handleOrNumber}</p>
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
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{asset.errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">Followers / Audience</span>
                  <span className="font-bold text-slate-200">{asset.followerCount ? asset.followerCount.toLocaleString() : 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Last Sync Timestamp</span>
                  <span className="font-bold text-slate-200">{asset.lastSyncedAt}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Active Meta API Scopes
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {asset.permissions.map((perm) => (
                    <Badge key={perm} variant="outline" className="text-[10px]">
                      <ShieldCheck className="w-3 h-3 text-indigo-400 mr-1" /> {perm}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <Button variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
                  Check Health
                </Button>
                {asset.status === 'connected' ? (
                  <Button variant="ghost" size="sm" className="text-rose-400 hover:bg-rose-500/10" onClick={() => handleDisconnect(asset.id)}>
                    Disconnect
                  </Button>
                ) : (
                  <Button variant="primary" size="sm">
                    Re-authorize Token
                  </Button>
                )}
              </div>
            </Card>
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
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Select Channel Type
              </label>
              <select
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value as ChannelType)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-lg text-sm p-2.5"
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

            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs text-indigo-300">
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
