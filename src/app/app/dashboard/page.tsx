'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Bot, 
  MessageSquare, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  TrendingUp, 
  Clock, 
  Play, 
  Activity, 
  Layers,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/icons/SocialIcons';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { channelService } from '@/lib/services/channelService';
import { automationService } from '@/lib/services/automationService';
import { inboxService } from '@/lib/services/inboxService';
import { analyticsService } from '@/lib/services/analyticsService';
import { ConnectedAsset, AutomationRule, Conversation, ExecutionLog, AnalyticsOverview } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function DashboardPage() {
  const [assets, setAssets] = useState<ConnectedAsset[]>([]);
  const [automations, setAutomations] = useState<AutomationRule[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [logs, setLogs] = useState<ExecutionLog[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsOverview | null>(null);

  useEffect(() => {
    channelService.getConnectedAssets('ws-acme').then(setAssets);
    automationService.getAutomations('ws-acme').then(setAutomations);
    inboxService.getConversations('ws-acme').then(setConversations);
    automationService.getExecutionLogs('ws-acme').then(setLogs);
    analyticsService.getOverview().then(setAnalytics);
  }, []);

  return (
    <AppShell title="Dashboard" description="Meta Communication & Automation Overview">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 rounded-2xl border border-indigo-500/20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="info">Workspace Active: Acme Brand Studio</Badge>
              <span className="text-xs text-slate-400 font-mono">ID: ws-acme</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">System Operational Overview</h2>
            <p className="text-xs text-slate-400 mt-1">4 Channels Connected • {automations.length} Active Automations • Real-Time Webhooks Active</p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/app/automations/builder">
              <Button variant="primary" size="md" leftIcon={<Bot className="w-4 h-4" />}>
                Build New Workflow
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {assets.map((asset) => (
            <Card key={asset.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${
                  asset.channel === 'instagram' ? 'bg-pink-600' :
                  asset.channel === 'facebook' ? 'bg-blue-600' :
                  asset.channel === 'whatsapp' ? 'bg-emerald-600' : 'bg-slate-800'
                }`}>
                  {asset.channel === 'instagram' && <InstagramIcon className="w-5 h-5" />}
                  {asset.channel === 'facebook' && <FacebookIcon className="w-5 h-5" />}
                  {asset.channel === 'whatsapp' && <MessageSquare className="w-5 h-5" />}
                  {asset.channel === 'threads' && <span className="font-bold">@</span>}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-100 truncate">{asset.name}</h4>
                  <p className="text-[10px] text-slate-400">{asset.handleOrNumber}</p>
                </div>
              </div>

              <Badge variant={
                asset.status === 'connected' ? 'success' :
                asset.status === 'reauth_required' ? 'warning' : 'error'
              }>
                {asset.status === 'connected' ? '● Live' : '⚠ Action'}
              </Badge>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Messages Processed</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-white">{analytics?.totalMessagesProcessed.toLocaleString()}</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +18.4%
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Total Meta webhook events ingested</p>
          </Card>

          <Card className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Automations Triggered</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-white">{analytics?.automationsTriggered.toLocaleString()}</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +22.1%
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Automated responses dispatched</p>
          </Card>

          <Card className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Execution Success Rate</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-white">98.8%</span>
              <Badge variant="success">Optimal</Badge>
            </div>
            <p className="text-[11px] text-slate-500">35,980 passed / 430 failed</p>
          </Card>

          <Card className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Hours Saved This Month</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-indigo-400">{analytics?.hoursSaved} hrs</span>
              <Clock className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-[11px] text-slate-500">Based on 1.2s avg automated response</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Top Active Automations</h3>
              </div>
              <Link href="/app/automations" className="text-xs text-indigo-400 hover:underline font-semibold flex items-center gap-1">
                View All ({automations.length}) <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {automations.slice(0, 3).map((rule) => (
                <div key={rule.id} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-100">{rule.name}</span>
                      <Badge variant={rule.channel}>{rule.channel}</Badge>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{rule.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-indigo-300 block">{rule.executionCount.toLocaleString()} runs</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">{rule.successRate}% success</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Live Execution Audit Stream</h3>
              </div>
              <Badge variant="success">Real-Time</Badge>
            </div>

            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200">{log.automationName}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{formatDate(log.executedAt)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Target: <strong className="text-slate-300">{log.customerName}</strong> ({log.customerHandle})</span>
                    <Badge variant={log.status === 'success' ? 'success' : 'error'}>
                      {log.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
