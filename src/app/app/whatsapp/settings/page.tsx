'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Sliders, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Save, 
  Globe, 
  Phone, 
  Building, 
  Lock, 
  AlertCircle,
  Copy,
  Check,
  Radio
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { whatsappService } from '@/lib/services/whatsappService';
import { WhatsAppBusinessSettings } from '@/lib/types/whatsapp';

export default function WhatsAppSettingsPage() {
  const [settings, setSettings] = useState<WhatsAppBusinessSettings | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    whatsappService.getSettings('ws-acme').then(setSettings);
  }, []);

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText('https://api.postpilot.app/api/v1/webhooks/whatsapp');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    whatsappService.updateSettings('ws-acme', settings).then(() => {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    });
  };

  if (!settings) return null;

  return (
    <AppShell title="WhatsApp Settings">
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900">WhatsApp Business Profile & WABA Settings</h2>
              <span className="text-xs font-bold text-[#15803D] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full border border-[#D0EADB]">
                Connected
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Manage Meta WABA identifiers, business hours, offline auto-responders, and webhook subscriptions.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>

        {isSaved && (
          <div className="p-4 bg-[#EAF5EE] border border-[#D0EADB] text-[#1E7E34] rounded-2xl flex items-center gap-2 text-xs font-bold animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
            <span>WhatsApp settings updated and synced with Meta Cloud API successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Meta WABA Identifiers */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">1. Meta Business Account & Phone Identifiers</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">WhatsApp Business Account ID (WABA ID)</label>
                <input
                  type="text"
                  value={settings.wabaId}
                  disabled
                  className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 text-gray-500 font-mono cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Phone Number ID</label>
                <input
                  type="text"
                  value={settings.phoneNumberId}
                  disabled
                  className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 text-gray-500 font-mono cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Verified Display Name</label>
                <input
                  type="text"
                  value={settings.verifiedName}
                  onChange={(e) => setSettings({ ...settings, verifiedName: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3 py-2 text-gray-900"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Display Phone Number (E.164)</label>
                <input
                  type="text"
                  value={settings.displayPhoneNumber}
                  onChange={(e) => setSettings({ ...settings, displayPhoneNumber: e.target.value })}
                  className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3 py-2 text-gray-900 font-mono"
                />
              </div>
            </div>

            <div className="p-3.5 bg-[#FAFDFB] border border-[#D0EADB] rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#1E7E34]">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-bold">Quality Rating: <strong>GREEN (High Tier)</strong></span>
              </div>
              <span className="text-[11px] font-mono text-emerald-800">Limit: {settings.messagingLimitTier}</span>
            </div>
          </div>

          {/* Section 2: Webhooks & Latency SLA */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">2. Webhook & Integration Health</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Inbound Webhook Callback URL</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value="https://api.postpilot.app/api/v1/webhooks/whatsapp"
                    readOnly
                    className="flex-1 bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 text-gray-700 font-mono text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleCopyWebhook}
                    className="px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <span className="text-[10px] text-gray-500 font-bold block uppercase">Webhook Uptime SLA</span>
                  <span className="text-base font-bold text-emerald-700 mt-0.5 block">{settings.webhookSla}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <span className="text-[10px] text-gray-500 font-bold block uppercase">Webhook Average Latency</span>
                  <span className="text-base font-bold text-indigo-700 mt-0.5 block">{settings.webhookLatencyMs}ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Business Hours & Offline Rules */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">3. Business Working Hours & Auto-Responder</h3>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.businessHours.enabled}
                  onChange={(e) => setSettings({
                    ...settings,
                    businessHours: { ...settings.businessHours, enabled: e.target.checked }
                  })}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>Enable Business Hours</span>
              </label>
            </div>

            {settings.businessHours.enabled && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Timezone</label>
                  <input
                    type="text"
                    value={settings.businessHours.timezone}
                    onChange={(e) => setSettings({
                      ...settings,
                      businessHours: { ...settings.businessHours, timezone: e.target.value }
                    })}
                    className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3 py-2 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Offline Automated Response Message</label>
                  <textarea
                    rows={3}
                    value={settings.businessHours.offlineMessage}
                    onChange={(e) => setSettings({
                      ...settings,
                      businessHours: { ...settings.businessHours, offlineMessage: e.target.value }
                    })}
                    className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl p-3 text-gray-900 leading-relaxed"
                  />
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </AppShell>
  );
}
