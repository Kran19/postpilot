'use client';

import React, { useEffect, useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Bot, 
  MessageSquare, 
  Layers,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/icons/SocialIcons';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { analyticsService } from '@/lib/services/analyticsService';
import { AnalyticsOverview } from '@/lib/types';

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsOverview | null>(null);

  useEffect(() => {
    analyticsService.getOverview().then(setData);
  }, []);

  if (!data) return null;

  return (
    <AppShell title="Analytics" description="Performance Insights & Business Value Reporting">
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Messages Processed</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-white">{data.totalMessagesProcessed.toLocaleString()}</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +{data.messagesProcessedChangePct}%
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Across all 4 connected Meta channels</p>
          </Card>

          <Card className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Automations Triggered</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-white">{data.automationsTriggered.toLocaleString()}</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +{data.automationsTriggeredChangePct}%
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Automated responses dispatched</p>
          </Card>

          <Card className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Response Speed</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-indigo-400">{data.averageResponseTimeSeconds}s</span>
              <Badge variant="success">Instant</Badge>
            </div>
            <p className="text-[11px] text-slate-500">Vs 4.5 hours human agent average</p>
          </Card>

          <Card className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Hours Saved</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-emerald-400">{data.hoursSaved} hrs</span>
              <Clock className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-[11px] text-slate-500">Equivalent to 2 full-time support agents</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Channel Volume Distribution</h3>
              <Badge variant="info">4 Channels</Badge>
            </div>

            <div className="space-y-4">
              {data.channelBreakdown.map((item) => (
                <div key={item.channel} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="capitalize font-bold text-slate-200">{item.channel}</span>
                    <span className="text-slate-400">{item.count.toLocaleString()} ({item.pct}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                    <div
                      className={`h-full rounded-full ${
                        item.channel === 'instagram' ? 'bg-pink-500' :
                        item.channel === 'facebook' ? 'bg-blue-600' :
                        item.channel === 'whatsapp' ? 'bg-emerald-500' : 'bg-slate-400'
                      }`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">7-Day Activity Trend</h3>
              <div className="flex items-center gap-4 text-xs font-medium">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Processed</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Automated</span>
              </div>
            </div>

            <div className="h-48 flex items-end justify-between gap-4 pt-6">
              {data.dailyTrend.map((day) => (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1.5 h-full">
                    <div
                      className="w-1/2 bg-indigo-600/80 group-hover:bg-indigo-500 rounded-t-md transition-all duration-200"
                      style={{ height: `${(day.processed / 9000) * 100}%` }}
                    />
                    <div
                      className="w-1/2 bg-emerald-500/80 group-hover:bg-emerald-400 rounded-t-md transition-all duration-200"
                      style={{ height: `${(day.automated / 9000) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{day.date}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
