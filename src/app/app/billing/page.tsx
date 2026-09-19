'use client';

import React from 'react';
import { CreditCard, CheckCircle2, Zap, ArrowUpRight } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function BillingPage() {
  return (
    <AppShell title="Billing & Usage">
      <div className="space-y-6">
        {/* Current Plan Overview Card */}
        <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#EAE5D8] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold bg-[#EAF5EE] text-[#1E7E34] px-2 py-0.5 rounded-full uppercase">Current Subscription</span>
              <span className="text-xs text-gray-400 font-mono">Renewal Date: Oct 15, 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Pro Pilot Tier — $49/mo</h2>
            <p className="text-xs text-gray-600">Active monthly billing for workspace Acme Brand Studio.</p>
          </div>

          <Button variant="primary" size="md" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
            Upgrade to Business Tier
          </Button>
        </div>

        {/* Feature Usage Quota Meters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-3">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-gray-700">Connected Meta Assets</span>
              <span className="text-gray-900 font-bold">4 / 5 Assets</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full bg-[#18181B] rounded-full" style={{ width: '80%' }} />
            </div>
            <p className="text-[11px] text-gray-400">1 asset slot remaining on Pro tier.</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-3">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-gray-700">Active Automation Rules</span>
              <span className="text-gray-900 font-bold">8 / 20 Rules</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full bg-[#18181B] rounded-full" style={{ width: '40%' }} />
            </div>
            <p className="text-[11px] text-gray-400">12 automation slots remaining.</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-3">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-gray-700">Monthly Message Executions</span>
              <span className="text-[#16A34A] font-bold">36,410 / 50,000</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full bg-[#16A34A] rounded-full" style={{ width: '72%' }} />
            </div>
            <p className="text-[11px] text-gray-400">Resets in 18 days.</p>
          </div>
        </div>

        {/* Invoice History */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-gray-900">Billing Invoice History</h3>
          <div className="space-y-2 text-xs">
            <div className="p-3.5 bg-[#F8F9FA] rounded-xl border border-gray-200/80 flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-900">Invoice #INV-2026-08</span>
                <span className="text-gray-400 block text-[10px]">Billed Aug 01, 2026</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-gray-900">$49.00 USD</span>
                <Badge variant="success">PAID</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
