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
  const [oauthStatusMessage, setOauthStatusMessage] = useState<string | null>(null);
  const [oauthErrorMessage, setOauthErrorMessage] = useState<string | null>(null);

  const loadAssets = () => {
    channelService.getConnectedAssets('empeor-smart-solutions').then(setAssets);
  };

  useEffect(() => {
    loadAssets();

    // Check for Meta OAuth return callback in URL query (?code=... or ?error=...)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const errorDesc = params.get('error_description') || params.get('error');

      if (errorDesc) {
        setOauthErrorMessage(`Meta OAuth authorization declined or failed: ${errorDesc}`);
        window.history.replaceState({}, '', window.location.pathname);
      } else if (code) {
        const cleanCode = code.replace(/#_.*$/, '').replace(/#.*$/, '').trim();
        setOauthStatusMessage('Exchanging Meta authorization code & discovering Instagram business accounts...');
        channelService
          .handleCallback('empeor-smart-solutions', cleanCode)
          .then(() => {
            setOauthStatusMessage('Meta OAuth handshake completed! Instagram professional account connected.');
            loadAssets();
            window.history.replaceState({}, '', window.location.pathname);
            setTimeout(() => setOauthStatusMessage(null), 6000);
          })
          .catch((err: any) => {
            setOauthErrorMessage(err.message || 'Meta OAuth token exchange failed. Please verify Meta App credentials.');
            setOauthStatusMessage(null);
            window.history.replaceState({}, '', window.location.pathname);
          });
      }
    }
  }, []);

  const handleLaunchMetaOAuth = async () => {
    setIsConnecting(true);
    try {
      const oauthUrl = await channelService.initiateOAuth('empeor-smart-solutions');
      window.location.href = oauthUrl;
    } catch (err) {
      setIsConnecting(false);
      alert('Could not initialize Meta OAuth session.');
    }
  };

  const handleSimulatedConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);
    setTimeout(() => {
      channelService.connectChannel('empeor-smart-solutions', selectedChannel, `${selectedChannel.toUpperCase()} Asset`, handle).then((newAsset) => {
        setAssets((prev) => [...prev, newAsset]);
        setIsConnecting(false);
        setIsModalOpen(false);
        setHandle('');
      });
    }, 600);
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
        {oauthStatusMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between text-xs text-emerald-900 shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">{oauthStatusMessage}</span>
            </div>
            <button onClick={() => setOauthStatusMessage(null)} className="text-emerald-700 hover:text-emerald-950 font-bold">
              Dismiss
            </button>
          </div>
        )}

        {oauthErrorMessage && (
          <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl flex items-center justify-between text-xs text-rose-900 shadow-xs">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span className="font-semibold">{oauthErrorMessage}</span>
            </div>
            <button onClick={() => setOauthErrorMessage(null)} className="text-rose-700 hover:text-rose-950 font-bold">
              Dismiss
            </button>
          </div>
        )}


        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Meta Connected Assets</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Manage Meta Graph API permissions, access token lifecycles, and webhook subscriptions.
            </p>
          </div>
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />} onClick={() => setIsModalOpen(true)}>
            Connect Meta Asset
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {assets.map((asset) => {
            const isLiveAsset = asset.handleOrNumber === '@karanspeak07' || asset.permissions?.includes('instagram_business_basic');

            return (
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
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-gray-900">{asset.name}</h3>
                        {isLiveAsset ? (
                          <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
                            LIVE META ASSET
                          </span>
                        ) : (
                          <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded border border-slate-200">
                            SAMPLE DEMO
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">{asset.handleOrNumber}</p>
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
                    Active Meta API Permissions
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
                      Disconnect Asset
                    </Button>
                  ) : (
                    <Button variant="primary" size="sm">
                      Re-authorize Token
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Connect New Meta Channel"
          description="Authenticate via Meta OAuth 2.0 to authorize Instagram or Facebook business assets."
        >
          <div className="space-y-5">
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Meta OAuth 2.0 Verification Flow
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Clicking below redirects you to Meta&apos;s authentic login dialog requesting access for{' '}
                <code className="font-mono font-bold text-[11px]">instagram_business_basic</code>,{' '}
                <code className="font-mono font-bold text-[11px]">instagram_business_manage_messages</code>, and{' '}
                <code className="font-mono font-bold text-[11px]">instagram_business_manage_comments</code>.
              </p>
            </div>

            <Button
              type="button"
              variant="primary"
              className="w-full py-3"
              isLoading={isConnecting}
              onClick={handleLaunchMetaOAuth}
              leftIcon={<ExternalLink className="w-4 h-4" />}
            >
              Launch Meta OAuth Login (Live)
            </Button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                OR LOCAL TEST SIMULATION
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <form onSubmit={handleSimulatedConnect} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Channel Platform
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
                label="Account Handle or Phone"
                placeholder="@brand_handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                required
              />

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" className="w-1/2" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="secondary" className="w-1/2" isLoading={isConnecting}>
                  Add Test Asset
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </AppShell>
  );
}
