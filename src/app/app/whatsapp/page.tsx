'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  Zap, 
  Send, 
  CheckCircle2, 
  Users, 
  ArrowUp, 
  Plus, 
  Radio, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  AlertCircle,
  FileText,
  Activity,
  GitBranch,
  PhoneCall
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { whatsappService } from '@/lib/services/whatsappService';
import { automationService } from '@/lib/services/automationService';
import { WhatsAppMetrics, WhatsAppActivityItem, WhatsAppBusinessSettings } from '@/lib/types/whatsapp';
import { AutomationRule } from '@/lib/types';

export default function WhatsAppOverviewPage() {
  const [metrics, setMetrics] = useState<WhatsAppMetrics | null>(null);
  const [activity, setActivity] = useState<WhatsAppActivityItem[]>([]);
  const [settings, setSettings] = useState<WhatsAppBusinessSettings | null>(null);
  const [automations, setAutomations] = useState<AutomationRule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      whatsappService.getMetrics('ws-acme'),
      whatsappService.getRecentActivity('ws-acme'),
      whatsappService.getSettings('ws-acme'),
      automationService.getAutomations('ws-acme')
    ]).then(([metricsData, activityData, settingsData, automationsData]) => {
      setMetrics(metricsData);
      setActivity(activityData);
      setSettings(settingsData);
      setAutomations(automationsData.filter(a => a.channel === 'whatsapp'));
      setIsLoading(false);
    });
  }, []);

  return (
    <AppShell title="WhatsApp Overview">
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Top Control Center Header Banner */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
              <MessageSquare className="w-6 h-6 fill-white text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900 leading-tight">
                  {settings?.verifiedName || 'Acme Support WhatsApp'}
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1E7E34] bg-[#EAF5EE] border border-[#D0EADB] px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                  Official Cloud API Connected
                </span>
                {metrics?.isDemoData && (
                  <span className="text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                    Demo Telemetry Data
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-1 font-mono">
                <span>{settings?.displayPhoneNumber || '+1 (800) 555-0199'}</span>
                <span>•</span>
                <span>WABA: {settings?.wabaId || 'waba-89210492810'}</span>
                <span>•</span>
                <span className="text-emerald-700 font-sans font-semibold">Tier: {settings?.messagingLimitTier || '100K/day'}</span>
              </div>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link href="/app/whatsapp/templates/new">
              <button className="px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 text-xs font-bold transition shadow-2xs flex items-center gap-1.5 cursor-pointer">
                <FileText className="w-3.5 h-3.5 text-gray-500" />
                <span>New Template</span>
              </button>
            </Link>
            <Link href="/app/whatsapp/campaigns">
              <button className="px-3.5 py-2 rounded-xl border border-emerald-200 bg-emerald-50 text-[#15803D] hover:bg-emerald-100 text-xs font-bold transition shadow-2xs flex items-center gap-1.5 cursor-pointer">
                <Send className="w-3.5 h-3.5" />
                <span>Create Campaign</span>
              </button>
            </Link>
            <Link href="/app/whatsapp/automations/new">
              <button className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer">
                <Plus className="w-3.5 h-3.5" />
                <span>Create Automation</span>
              </button>
            </Link>
          </div>
        </div>

        {/* 6 KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
          {/* Card 1: Messages Today */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Messages Today</span>
              <div className="w-7 h-7 rounded-lg bg-[#EAF5EE] text-[#1E7E34] flex items-center justify-center">
                <Send className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-xl font-bold text-gray-900">{metrics?.messagesToday.toLocaleString() || '12,482'}</div>
              <span className="text-[11px] text-[#16A34A] font-semibold flex items-center gap-0.5 mt-0.5">
                <ArrowUp className="w-3 h-3" /> +14.2% vs yesterday
              </span>
            </div>
          </div>

          {/* Card 2: Automation Runs */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Automation Runs</span>
              <div className="w-7 h-7 rounded-lg bg-[#EAF5EE] text-[#1E7E34] flex items-center justify-center">
                <Zap className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-xl font-bold text-gray-900">{metrics?.automationRuns.toLocaleString() || '4,820'}</div>
              <span className="text-[11px] text-[#16A34A] font-semibold flex items-center gap-0.5 mt-0.5">
                <ArrowUp className="w-3 h-3" /> +22.4% triggered
              </span>
            </div>
          </div>

          {/* Card 3: Delivery Rate */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Delivery Rate</span>
              <div className="w-7 h-7 rounded-lg bg-[#EAF5EE] text-[#1E7E34] flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-xl font-bold text-gray-900">{metrics?.deliveryRate || 98.7}%</div>
              <span className="text-[10px] text-gray-400 block mt-0.5">
                {metrics?.messagesDelivered.toLocaleString() || '12,320'} delivered
              </span>
            </div>
          </div>

          {/* Card 4: Messages Read */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Read Rate</span>
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <Activity className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-xl font-bold text-gray-900">{metrics?.readRate || 87.2}%</div>
              <span className="text-[10px] text-gray-400 block mt-0.5">
                {metrics?.messagesRead.toLocaleString() || '10,890'} read
              </span>
            </div>
          </div>

          {/* Card 5: Customer Replies */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Customer Replies</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-xl font-bold text-gray-900">{metrics?.customerReplies.toLocaleString() || '1,248'}</div>
              <span className="text-[10px] text-gray-400 block mt-0.5">
                10.0% engagement rate
              </span>
            </div>
          </div>

          {/* Card 6: Human Handoffs */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Human Handoffs</span>
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
                <PhoneCall className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-xl font-bold text-gray-900">{metrics?.humanHandoffs || 84}</div>
              <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                98.3% bot resolved
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Active Automations + Recent WhatsApp Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Active WhatsApp Automations (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Active WhatsApp Automations</h3>
                <p className="text-xs text-gray-500">Live trigger rules listening on WhatsApp Cloud API webhooks</p>
              </div>
              <Link href="/app/whatsapp/automations" className="text-xs font-bold text-[#15803D] hover:underline flex items-center gap-1">
                <span>View All ({automations.length > 0 ? automations.length : 3})</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {/* Fallback & live items */}
              {[
                {
                  id: 'wa-auto-1',
                  name: 'Order Status & Tracking Delivery',
                  trigger: 'Incoming Message: "ORDER" or #ID',
                  runs: 3120,
                  successRate: 97.8,
                  status: 'active'
                },
                {
                  id: 'wa-auto-2',
                  name: 'Welcome Flow & Discount Code',
                  trigger: 'New Contact / First Message',
                  runs: 1840,
                  successRate: 99.1,
                  status: 'active'
                },
                {
                  id: 'wa-auto-3',
                  name: 'Lead Qualification & Appointment Booking',
                  trigger: 'Keyword: "DEMO" / "PRICING"',
                  runs: 920,
                  successRate: 96.4,
                  status: 'active'
                }
              ].map((item) => (
                <div 
                  key={item.id}
                  className="p-3.5 rounded-xl border border-gray-200/90 hover:border-gray-300 hover:bg-[#FAFAFA] transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#EAF5EE] text-[#1E7E34] flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="w-4 h-4 fill-[#1E7E34]" />
                    </div>
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-gray-900 truncate">{item.name}</h4>
                      <p className="text-[11px] text-gray-400 font-mono mt-0.5">{item.trigger}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-xs font-bold text-gray-900 block">{item.runs.toLocaleString()} runs</span>
                      <span className="text-[10px] text-emerald-700 font-semibold">{item.successRate}% success</span>
                    </div>
                    <Link href={`/app/whatsapp/automations/${item.id}`}>
                      <button className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-bold transition cursor-pointer">
                        Edit
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Recent WhatsApp Activity Stream (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Recent WhatsApp Activity</h3>
                <p className="text-xs text-gray-500">Live webhook dispatches and replies</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
            </div>

            <div className="space-y-3">
              {activity.map((act) => (
                <div key={act.id} className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200/80 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-gray-900">{act.customerName}</span>
                      <span className="text-[10px] text-gray-400 font-mono">({act.customerPhone})</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">{act.timestamp}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-indigo-700 font-semibold">{act.automationName}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.2 rounded-full uppercase ${
                      act.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                      act.status === 'read' ? 'bg-sky-100 text-sky-800' :
                      act.status === 'handoff' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {act.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-600 leading-snug">{act.actionTaken}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WhatsApp Quick Features Links Hub */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/app/whatsapp/templates" className="p-4 rounded-2xl bg-white border border-gray-200/80 hover:border-gray-300 hover:shadow-xs transition group">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-2.5">
              <FileText className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#15803D] transition">Template Management</h4>
            <p className="text-[11px] text-gray-500 mt-0.5">Meta HSM pre-approved templates with dynamic variables.</p>
          </Link>

          <Link href="/app/whatsapp/campaigns" className="p-4 rounded-2xl bg-white border border-gray-200/80 hover:border-gray-300 hover:shadow-xs transition group">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2.5">
              <Send className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#15803D] transition">Broadcast Campaigns</h4>
            <p className="text-[11px] text-gray-500 mt-0.5">Segmented broadcasts to tagged contact audiences.</p>
          </Link>

          <Link href="/app/whatsapp/flows" className="p-4 rounded-2xl bg-white border border-gray-200/80 hover:border-gray-300 hover:shadow-xs transition group">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center mb-2.5">
              <GitBranch className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#15803D] transition">Interactive Flows</h4>
            <p className="text-[11px] text-gray-500 mt-0.5">Structured forms, appointments & product inquiries.</p>
          </Link>

          <Link href="/app/whatsapp/settings" className="p-4 rounded-2xl bg-white border border-gray-200/80 hover:border-gray-300 hover:shadow-xs transition group">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-2.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#15803D] transition">WABA & Business Hours</h4>
            <p className="text-[11px] text-gray-500 mt-0.5">Working schedules, offline auto-replies, and fallbacks.</p>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
