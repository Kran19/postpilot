'use client';

import React, { useState } from 'react';
import { Settings, ShieldCheck, Key, Lock, Trash2, CheckCircle2 } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SettingsPage() {
  const [workspaceName, setWorkspaceName] = useState('Acme Brand Studio');
  const [webhookSecret, setWebhookSecret] = useState('whsec_meta_98124912948124');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppShell title="Settings">
      <div className="space-y-6 max-w-4xl">
        {/* Workspace Identity Form */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-gray-900">Workspace Profile</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <Input label="Workspace Name" value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} />
            <Input label="Workspace Slug" value="acme-brand-studio" disabled helperText="Used in multi-tenant API routes" />
            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary" size="sm">Save Preferences</Button>
            </div>
            {saved && <p className="text-xs text-[#16A34A] font-medium text-right">✓ Settings saved successfully!</p>}
          </form>
        </div>

        {/* Security & Webhook Compliance */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <h3 className="text-sm font-bold text-gray-900">Meta Webhook Security & Signatures</h3>
          </div>
          <p className="text-xs text-gray-500">
            PostPilot strictly verifies all Meta Graph API webhooks using HMAC SHA-256 signatures (<code className="font-mono text-gray-700">X-Hub-Signature-256</code>).
          </p>

          <Input label="Meta App Webhook Verify Secret" type="password" value={webhookSecret} onChange={(e) => setWebhookSecret(e.target.value)} />
          
          <div className="p-3.5 bg-[#EAF5EE] border border-[#D1E8D7] rounded-xl text-xs text-[#1D3B2A] flex items-center justify-between">
            <span>Meta Data Deletion Callback Endpoint:</span>
            <code className="font-mono text-[11px] text-gray-900 font-bold">https://postpilot.app/api/meta/data-deletion</code>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-[#FFF8F8] rounded-2xl border border-rose-200 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-rose-700 uppercase tracking-wider">Danger Zone</h3>
          <p className="text-xs text-gray-600">
            Revoking access tokens will disconnect all social channels and halt active automations immediately.
          </p>
          <div className="flex gap-3">
            <Button variant="danger" size="sm" onClick={() => alert('Tokens revoked')}>
              Revoke All Meta Tokens
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
