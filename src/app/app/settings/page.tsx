'use client';

import React, { useState } from 'react';
import { Settings, ShieldCheck, Key, Lock, Trash2, CheckCircle2 } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
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
    <AppShell title="Settings & Security" description="Workspace Preferences, Security & Meta Compliance Controls">
      <div className="space-y-8 max-w-4xl">
        {/* Workspace Identity Form */}
        <Card className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Workspace Profile</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <Input label="Workspace Name" value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} />
            <Input label="Workspace Slug" value="acme-brand-studio" disabled helperText="Used in multi-tenant API routes" />
            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary" size="sm">Save Preferences</Button>
            </div>
            {saved && <p className="text-xs text-emerald-400 font-medium text-right">✓ Settings saved successfully!</p>}
          </form>
        </Card>

        {/* Security & Webhook Compliance */}
        <Card className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Meta Webhook Security & Signatures</h3>
          </div>
          <p className="text-xs text-slate-400">
            POSTPILOT strictly verifies all Meta Graph API webhooks using HMAC SHA-256 signatures (`X-Hub-Signature-256`).
          </p>

          <Input label="Meta App Webhook Verify Secret" type="password" value={webhookSecret} onChange={(e) => setWebhookSecret(e.target.value)} />
          
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
            <span>Meta Data Deletion Callback Endpoint:</span>
            <code className="font-mono text-[11px] text-white">https://postpilot.app/api/meta/data-deletion</code>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="space-y-4 border-rose-500/40 bg-rose-950/10">
          <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider">Danger Zone</h3>
          <p className="text-xs text-slate-400">
            Revoking access tokens will disconnect all social channels and halt active automations immediately.
          </p>
          <div className="flex gap-3">
            <Button variant="danger" size="sm" onClick={() => alert('Tokens revoked')}>
              Revoke All Meta Tokens
            </Button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
