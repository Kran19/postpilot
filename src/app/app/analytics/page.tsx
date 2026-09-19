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
    <AppShell title="Analytics">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Performance & Value Analytics</h2>
          <p className="text-xs text-gray-500 mt-0.5">Real-time throughput, automated response velocity, and hours saved.</p>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Messages Processed</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-gray-900">{data.totalMessagesProcessed.toLocaleString()}</span>
              <span className="text-xs font-bold text-[#16A34A] flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +{data.messagesProcessedChangePct}%
              </span>
            </div>
            <p className="text-[11px] text-gray-400">Across all 4 connected Meta channels</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Automations Triggered</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-gray-900">{data.automationsTriggered.toLocaleString()}</span>
              <span className="text-xs font-bold text-[#16A34A] flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +{data.automationsTriggeredChangePct}%
              </span>
            </div>
            <p className="text-[11px] text-gray-400">Automated responses dispatched</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg Response Speed</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-[#1D3B2A]">{data.averageResponseTimeSeconds}s</span>
              <span className="text-[10px] font-semibold bg-[#EAF5EE] text-[#1E7E34] px-2 py-0.5 rounded-full">Instant</span>
            </div>
            <p className="text-[11px] text-gray-400">Vs 4.5 hours human agent average</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Hours Saved</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-[#16A34A]">{data.hoursSaved} hrs</span>
              <Clock className="w-4 h-4 text-[#16A34A]" />
            </div>
            <p className="text-[11px] text-gray-400">Equivalent to 2 full-time support agents</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Channel Volume Distribution */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-gray-900">Channel Volume Distribution</h3>
              <span className="text-[10px] bg-gray-100 text-gray-700 font-semibold px-2 py-0.5 rounded-full">4 Channels</span>
            </div>

            <div className="space-y-4">
              {data.channelBreakdown.map((item) => (
                <div key={item.channel} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="capitalize font-bold text-gray-800">{item.channel}</span>
                    <span className="text-gray-400">{item.count.toLocaleString()} ({item.pct}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.channel === 'instagram' ? 'bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600' :
                        item.channel === 'facebook' ? 'bg-[#1877F2]' :
                        item.channel === 'whatsapp' ? 'bg-[#25D366]' : 'bg-black'
                      }`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7-Day Activity Trend */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-gray-900">7-Day Activity Trend</h3>
              <div className="flex items-center gap-4 text-xs font-medium text-gray-600">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#18181B]" /> Processed</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" /> Automated</span>
              </div>
            </div>

            <div className="h-48 flex items-end justify-between gap-4 pt-4 pl-2">
              {data.dailyTrend.map((day) => (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1.5 h-full">
                    <div
                      className="w-1/2 bg-gray-900 group-hover:bg-black rounded-t-md transition-all duration-200"
                      style={{ height: `${(day.processed / 9000) * 100}%` }}
                    />
                    <div
                      className="w-1/2 bg-[#16A34A] group-hover:bg-[#15803D] rounded-t-md transition-all duration-200"
                      style={{ height: `${(day.automated / 9000) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">{day.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
