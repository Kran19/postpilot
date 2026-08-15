'use client';

import React from 'react';
import { CreditCard, CheckCircle2, Zap, ArrowUpRight } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function BillingPage() {
  return (
    <AppShell title="Billing & Quotas" description="Subscription Tier, Usage Limits & Invoices">
      <div className="space-y-8">
        {/* Current Plan Overview Card */}
        <Card className="p-6 border-indigo-500/50 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="info">Current Subscription</Badge>
              <span className="text-xs text-slate-400 font-mono">Renewal Date: Oct 15, 2026</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">Pro Pilot Tier — $49/mo</h2>
            <p className="text-xs text-slate-300">Active monthly billing for workspace Acme Brand Studio.</p>
          </div>

          <Button variant="primary" size="lg" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
            Upgrade to Business Tier
          </Button>
        </Card>

        {/* Feature Usage Quota Meters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="space-y-3">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Connected Meta Assets</span>
              <span className="text-indigo-400">4 / 5 Assets</span>
            </div>
            <div className="h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '80%' }} />
            </div>
            <p className="text-[11px] text-slate-500">1 asset slot remaining on Pro tier.</p>
          </Card>

          <Card className="space-y-3">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Active Automation Rules</span>
              <span className="text-indigo-400">8 / 20 Rules</span>
            </div>
            <div className="h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '40%' }} />
            </div>
            <p className="text-[11px] text-slate-500">12 automation slots remaining.</p>
          </Card>

          <Card className="space-y-3">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Monthly Message Executions</span>
              <span className="text-emerald-400">36,410 / 50,000</span>
            </div>
            <div className="h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '72%' }} />
            </div>
            <p className="text-[11px] text-slate-500">Resets in 18 days.</p>
          </Card>
        </div>

        {/* Invoice History */}
        <Card className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Billing Invoice History</h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-200">Invoice #INV-2026-08</span>
                <span className="text-slate-500 block text-[10px]">Billed Aug 01, 2026</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-slate-100">$49.00 USD</span>
                <Badge variant="success">PAID</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
