'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  BarChart2, 
  Send, 
  CheckCircle2, 
  Activity, 
  MessageSquare, 
  PhoneCall, 
  ArrowUp, 
  ChevronDown, 
  Calendar, 
  Zap, 
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { whatsappService } from '@/lib/services/whatsappService';
import { WhatsAppMetrics } from '@/lib/types/whatsapp';

export default function WhatsAppAnalyticsPage() {
  const [metrics, setMetrics] = useState<WhatsAppMetrics | null>(null);
  const [timeRange, setTimeRange] = useState('Last 7 days');

  useEffect(() => {
    whatsappService.getMetrics('ws-acme').then(setMetrics);
  }, []);

  return (
    <AppShell title="WhatsApp Analytics">
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Top Header & Range Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900">WhatsApp Deep Analytics & SLAs</h2>
              {metrics?.isDemoData && (
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.2 rounded-full">
                  Demo Telemetry Mode
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Comprehensive telemetry for Meta Cloud API throughput, delivery SLAs, and bot deflection rates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {(['Today', 'Last 7 days', 'Last 30 days', 'Last 90 days'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  timeRange === range
                    ? 'bg-black text-white shadow-2xs font-bold'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Large Summary KPI Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-semibold">Total Dispatched Messages</span>
              <div className="w-8 h-8 rounded-xl bg-[#EAF5EE] text-[#1E7E34] flex items-center justify-center">
                <Send className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{metrics?.messagesToday.toLocaleString() || '12,482'}</div>
              <span className="text-xs font-semibold text-[#16A34A] flex items-center gap-0.5 mt-0.5">
                <ArrowUp className="w-3.5 h-3.5" /> +14.8% volume growth
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-semibold">Delivery Success SLA</span>
              <div className="w-8 h-8 rounded-xl bg-[#EAF5EE] text-[#1E7E34] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{metrics?.deliveryRate || 98.7}%</div>
              <span className="text-[11px] text-gray-400 block mt-0.5">
                {metrics?.messagesDelivered.toLocaleString() || '12,320'} confirmed delivered
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-semibold">Read Receipt Rate</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{metrics?.readRate || 87.2}%</div>
              <span className="text-[11px] text-gray-400 block mt-0.5">
                {metrics?.messagesRead.toLocaleString() || '10,890'} read receipts
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-semibold">Bot Resolution Rate</span>
              <div className="w-8 h-8 rounded-xl bg-[#EAF5EE] text-[#1E7E34] flex items-center justify-center">
                <Zap className="w-4 h-4 fill-[#1E7E34]" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">98.3%</div>
              <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
                Only {metrics?.humanHandoffs || 84} human handoffs
              </span>
            </div>
          </div>
        </div>

        {/* 7-Day Message Volume Bar Chart Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900">7-Day WhatsApp Volume & Delivery Trends</h3>
              <p className="text-xs text-gray-500">Inbound trigger webhooks vs Outbound HSM template deliveries</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#25D366]" />
                <span className="text-gray-600 font-medium">Delivered Messages</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#8EAEA0]" />
                <span className="text-gray-600 font-medium">Inbound Triggers</span>
              </div>
            </div>
          </div>

          {/* Grouped Bar Graph */}
          <div className="pt-4">
            <div className="flex h-44 items-end gap-4 pl-8 relative border-b border-gray-100 pb-2">
              {/* Y Axis */}
              <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-gray-400 font-mono select-none">
                <span>15K</span>
                <span>10K</span>
                <span>5K</span>
                <span>0</span>
              </div>

              {[
                { day: 'Sep 13', inVal: 'h-16', outVal: 'h-28' },
                { day: 'Sep 14', inVal: 'h-20', outVal: 'h-32' },
                { day: 'Sep 15', inVal: 'h-22', outVal: 'h-36' },
                { day: 'Sep 16', inVal: 'h-18', outVal: 'h-30' },
                { day: 'Sep 17', inVal: 'h-24', outVal: 'h-38' },
                { day: 'Sep 18', inVal: 'h-26', outVal: 'h-40' },
                { day: 'Sep 19', inVal: 'h-28', outVal: 'h-44' },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="flex items-end gap-1.5 h-36">
                    <div className={`w-3.5 bg-[#8EAEA0] rounded-xs ${bar.inVal}`} />
                    <div className={`w-3.5 bg-[#25D366] rounded-xs ${bar.outVal}`} />
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Tables: Top Automations & Top Templates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Top Automations */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Top Performing Automations</h4>
              <span className="text-xs font-bold text-[#15803D]">Success Rate</span>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { name: 'Order Status & Tracking Delivery', runs: '3,120 runs', rate: '97.8%' },
                { name: 'Welcome Discount Offer Flow', runs: '1,840 runs', rate: '99.1%' },
                { name: 'Lead Qualification & Booking', runs: '920 runs', rate: '96.4%' },
                { name: 'Abandoned Cart Recovery', runs: '450 runs', rate: '94.2%' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                  <div>
                    <span className="font-bold text-gray-900 block">{item.name}</span>
                    <span className="text-[10px] text-gray-400">{item.runs}</span>
                  </div>
                  <span className="font-bold text-[#16A34A]">{item.rate}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Templates */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Top Pre-Approved Templates</h4>
              <span className="text-xs font-bold text-indigo-700">Open Rate</span>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { name: 'order_status_update', cat: 'UTILITY', opens: '94.2% read', total: '3,120 sent' },
                { name: 'welcome_discount_offer', cat: 'MARKETING', opens: '82.6% read', total: '1,840 sent' },
                { name: 'account_verification_otp', cat: 'AUTHENTICATION', opens: '98.9% read', total: '920 sent' },
              ].map((t, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                  <div>
                    <span className="font-mono font-bold text-gray-900 block">{t.name}</span>
                    <span className="text-[10px] text-gray-400">{t.cat} • {t.total}</span>
                  </div>
                  <span className="font-bold text-indigo-700">{t.opens}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
