'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  Zap, 
  CheckCircle2, 
  Clock, 
  ArrowUp, 
  ChevronRight, 
  ChevronDown,
  ArrowRight,
  Headphones,
  Plus,
  Radio,
  FileText,
  Users,
  Activity,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/icons/SocialIcons';
import { AppShell } from '@/components/layout/AppShell';

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('Last 7 days');

  return (
    <AppShell title="Dashboard">
      <div className="space-y-5">
        {/* Top Welcome Hero Banner (Clean, no image) */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-7 shadow-xs relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 min-h-[140px]">
          <div className="z-10 max-w-lg">
            <span className="text-xs text-gray-400 font-medium block mb-1">Welcome back,</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Good morning, Alex.</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5 font-normal">
              Your conversations are working for you across all connected Meta channels.
            </p>
          </div>

          {/* Right Hero Clean Typographic Tags */}
          <div className="flex items-center gap-6 z-10">
            <div className="flex flex-col justify-center space-y-1.5 text-right select-none">
              <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">PEOPLE</span>
              <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">CONVERSATIONS</span>
              <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">BUSINESS</span>
              <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">GROWTH</span>
            </div>
          </div>
        </div>

        {/* 4 Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Messages Processed */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-xl bg-[#EDF7EE] text-[#1E7E34] flex items-center justify-center">
                <MessageSquare className="w-4 h-4 fill-[#1E7E34]/20" />
              </div>
            </div>

            <div className="mt-4">
              <span className="text-xs text-gray-500 font-medium block">Messages Processed</span>
              <div className="text-2xl font-bold text-gray-900 mt-0.5">48,920</div>
            </div>

            <div className="flex items-end justify-between mt-3 pt-1">
              <span className="text-xs font-semibold text-[#16A34A] flex items-center gap-0.5">
                <ArrowUp className="w-3.5 h-3.5" /> 18.4%
              </span>
              {/* Mini Sparkline Bar Graphic */}
              <div className="flex items-end gap-1 h-6">
                <div className="w-1 bg-[#D4E8DA] rounded-xs h-2.5" />
                <div className="w-1 bg-[#D4E8DA] rounded-xs h-4" />
                <div className="w-1 bg-[#D4E8DA] rounded-xs h-3" />
                <div className="w-1 bg-[#B7DAC0] rounded-xs h-5" />
                <div className="w-1 bg-[#9BCDA9] rounded-xs h-4.5" />
                <div className="w-1 bg-[#16A34A] rounded-xs h-6" />
              </div>
            </div>
          </div>

          {/* Card 2: Automations Triggered */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-xl bg-[#EDF7EE] text-[#1E7E34] flex items-center justify-center">
                <Zap className="w-4 h-4 fill-[#1E7E34]" />
              </div>
            </div>

            <div className="mt-4">
              <span className="text-xs text-gray-500 font-medium block">Automations Triggered</span>
              <div className="text-2xl font-bold text-gray-900 mt-0.5">36,410</div>
            </div>

            <div className="flex items-end justify-between mt-3 pt-1">
              <span className="text-xs font-semibold text-[#16A34A] flex items-center gap-0.5">
                <ArrowUp className="w-3.5 h-3.5" /> 22.1%
              </span>
              <div className="flex items-end gap-1 h-6">
                <div className="w-1 bg-[#D4E8DA] rounded-xs h-2" />
                <div className="w-1 bg-[#D4E8DA] rounded-xs h-3" />
                <div className="w-1 bg-[#B7DAC0] rounded-xs h-4.5" />
                <div className="w-1 bg-[#B7DAC0] rounded-xs h-3.5" />
                <div className="w-1 bg-[#9BCDA9] rounded-xs h-5" />
                <div className="w-1 bg-[#16A34A] rounded-xs h-6" />
              </div>
            </div>
          </div>

          {/* Card 3: Execution Success Rate */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-xl bg-[#EDF7EE] text-[#1E7E34] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-4">
              <span className="text-xs text-gray-500 font-medium block">Execution Success Rate</span>
              <div className="text-2xl font-bold text-gray-900 mt-0.5">98.8%</div>
            </div>

            <div className="flex items-end justify-between mt-3 pt-1">
              <span className="text-[11px] text-gray-400 font-normal">
                35,980 passed / 430 failed
              </span>
              <div className="flex items-end gap-1 h-6">
                <div className="w-1 bg-[#D4E8DA] rounded-xs h-3.5" />
                <div className="w-1 bg-[#D4E8DA] rounded-xs h-4" />
                <div className="w-1 bg-[#B7DAC0] rounded-xs h-5" />
                <div className="w-1 bg-[#9BCDA9] rounded-xs h-4.5" />
                <div className="w-1 bg-[#9BCDA9] rounded-xs h-5.5" />
                <div className="w-1 bg-[#16A34A] rounded-xs h-6" />
              </div>
            </div>
          </div>

          {/* Card 4: Hours Saved */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-xl bg-[#FEF6EE] text-[#B45309] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-4">
              <span className="text-xs text-gray-500 font-medium block">Hours Saved</span>
              <div className="text-2xl font-bold text-gray-900 mt-0.5">324 hrs</div>
            </div>

            <div className="flex items-end justify-between mt-3 pt-1">
              <span className="text-xs font-semibold text-[#16A34A] flex items-center gap-0.5">
                <ArrowUp className="w-3.5 h-3.5" /> 28%
              </span>
              <div className="flex items-end gap-1 h-6">
                <div className="w-1 bg-[#D4E8DA] rounded-xs h-2.5" />
                <div className="w-1 bg-[#D4E8DA] rounded-xs h-3.5" />
                <div className="w-1 bg-[#B7DAC0] rounded-xs h-4" />
                <div className="w-1 bg-[#B7DAC0] rounded-xs h-5" />
                <div className="w-1 bg-[#9BCDA9] rounded-xs h-4.5" />
                <div className="w-1 bg-[#16A34A] rounded-xs h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row (3 Panels) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Panel 1: Channel Status (Span 4) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900">Channel Status</h3>
                <Link href="/app/channels" className="text-xs text-gray-400 hover:text-gray-700 font-medium flex items-center gap-1 transition">
                  Manage <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-3.5">
                {/* Instagram */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <InstagramIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 leading-tight">Instagram</h4>
                      <p className="text-[11px] text-gray-400">@acmestudio</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-[#1E7E34] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full">
                      Connected
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                  </div>
                </div>

                {/* Facebook */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <FacebookIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 leading-tight">Facebook</h4>
                      <p className="text-[11px] text-gray-400">fb.com/acmebrandglobal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-[#1E7E34] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full">
                      Connected
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <MessageSquare className="w-4 h-4 fill-white text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 leading-tight">WhatsApp</h4>
                      <p className="text-[11px] text-gray-400">+1 (800) 555-0199</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-[#1E7E34] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full">
                      Connected
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                  </div>
                </div>

                {/* Threads */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <span className="font-bold text-xs">@</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 leading-tight">Threads</h4>
                      <p className="text-[11px] text-gray-400">@acmestudio.threads</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-[#1E7E34] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full">
                      Connected
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2: Conversation Activity (Span 5) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900">Conversation Activity</h3>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-600 cursor-pointer hover:bg-gray-100 transition">
                  <span>{timeRange}</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
              </div>

              {/* Grouped Bar Chart */}
              <div className="mt-2 pt-2">
                <div className="flex h-36 items-end gap-3 sm:gap-4 pl-6 relative">
                  {/* Y Axis Grid Lines */}
                  <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-gray-400 font-mono select-none">
                    <span>6K</span>
                    <span>4K</span>
                    <span>2K</span>
                    <span>0</span>
                  </div>

                  {/* Day 1: Aug 7 */}
                  <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div className="flex items-end gap-1 h-24">
                      <div className="w-2 sm:w-2.5 bg-[#8EAEA0] rounded-xs h-10" />
                      <div className="w-2 sm:w-2.5 bg-[#649381] rounded-xs h-20" />
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">Aug 7</span>
                  </div>

                  {/* Day 2: Aug 8 */}
                  <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div className="flex items-end gap-1 h-24">
                      <div className="w-2 sm:w-2.5 bg-[#8EAEA0] rounded-xs h-16" />
                      <div className="w-2 sm:w-2.5 bg-[#649381] rounded-xs h-24" />
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">Aug 8</span>
                  </div>

                  {/* Day 3: Aug 9 */}
                  <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div className="flex items-end gap-1 h-24">
                      <div className="w-2 sm:w-2.5 bg-[#8EAEA0] rounded-xs h-14" />
                      <div className="w-2 sm:w-2.5 bg-[#649381] rounded-xs h-22" />
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">Aug 9</span>
                  </div>

                  {/* Day 4: Aug 10 */}
                  <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div className="flex items-end gap-1 h-24">
                      <div className="w-2 sm:w-2.5 bg-[#8EAEA0] rounded-xs h-12" />
                      <div className="w-2 sm:w-2.5 bg-[#649381] rounded-xs h-18" />
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">Aug 10</span>
                  </div>

                  {/* Day 5: Aug 11 */}
                  <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div className="flex items-end gap-1 h-24">
                      <div className="w-2 sm:w-2.5 bg-[#8EAEA0] rounded-xs h-14" />
                      <div className="w-2 sm:w-2.5 bg-[#649381] rounded-xs h-20" />
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">Aug 11</span>
                  </div>

                  {/* Day 6: Aug 12 */}
                  <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div className="flex items-end gap-1 h-24">
                      <div className="w-2 sm:w-2.5 bg-[#8EAEA0] rounded-xs h-16" />
                      <div className="w-2 sm:w-2.5 bg-[#649381] rounded-xs h-22" />
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">Aug 12</span>
                  </div>

                  {/* Day 7: Aug 13 */}
                  <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div className="flex items-end gap-1 h-24">
                      <div className="w-2 sm:w-2.5 bg-[#8EAEA0] rounded-xs h-20" />
                      <div className="w-2 sm:w-2.5 bg-[#649381] rounded-xs h-28" />
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">Aug 13</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend along bottom */}
            <div className="flex items-center justify-center gap-4 pt-3 border-t border-gray-100 text-[11px] text-gray-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E1306C]" />
                <span>Instagram</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1877F2]" />
                <span>Facebook</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                <span>WhatsApp</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-black" />
                <span>Threads</span>
              </div>
            </div>
          </div>

          {/* Panel 3: Feature Promo Banner (Clean gradient, no image) */}
          <div className="lg:col-span-3 bg-gradient-to-br from-[#1C2E24] via-[#15261D] to-[#0D1812] rounded-2xl p-6 text-white relative overflow-hidden shadow-xs flex flex-col justify-between min-h-[220px]">
            {/* Subtle Abstract Glow Accents */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <span className="border border-white/20 text-white text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-full inline-block">
                NEW
              </span>
              <h3 className="text-xl font-bold text-white leading-snug mt-3.5">
                Turn comments into customers
              </h3>
              <p className="text-xs text-emerald-100/75 mt-1.5 leading-relaxed max-w-[210px]">
                Automate, engage and grow across all Meta channels.
              </p>
            </div>

            <div className="relative z-10 pt-4 flex items-center justify-between">
              <Link
                href="/app/automations/builder"
                className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-md hover:scale-105 transition cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-[10px] text-emerald-300/80 font-medium">Explore Builder →</span>
            </div>
          </div>
        </div>

        {/* Bottom Row (3 Panels) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Panel 1: Top Active Automations (Span 5) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900">Top Active Automations</h3>
              <Link href="/app/automations" className="text-xs text-gray-400 hover:text-gray-700 font-medium flex items-center gap-1 transition">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 text-[10px] font-bold text-gray-400 uppercase tracking-wider pb-2 border-b border-gray-100">
              <span className="col-span-6">NAME</span>
              <span className="col-span-2 text-center">CHANNEL</span>
              <span className="col-span-2 text-right">RUNS</span>
              <span className="col-span-2 text-right">SUCCESS RATE</span>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-50 text-xs">
              {/* Row 1 */}
              <div className="grid grid-cols-12 items-center py-3">
                <span className="col-span-6 font-medium text-gray-900 truncate pr-2">Instagram Price Inquiry Auto Reply</span>
                <div className="col-span-2 flex justify-center">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 text-white flex items-center justify-center">
                    <InstagramIcon className="w-3 h-3" />
                  </div>
                </div>
                <span className="col-span-2 text-right font-medium text-gray-700">1,420</span>
                <span className="col-span-2 text-right font-semibold text-[#16A34A]">99.2%</span>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-12 items-center py-3">
                <span className="col-span-6 font-medium text-gray-900 truncate pr-2">Facebook Comment Private Reply</span>
                <div className="col-span-2 flex justify-center">
                  <div className="w-5 h-5 rounded-md bg-[#1877F2] text-white flex items-center justify-center">
                    <FacebookIcon className="w-3 h-3" />
                  </div>
                </div>
                <span className="col-span-2 text-right font-medium text-gray-700">890</span>
                <span className="col-span-2 text-right font-semibold text-[#16A34A]">98.5%</span>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-12 items-center py-3">
                <span className="col-span-6 font-medium text-gray-900 truncate pr-2">WhatsApp Order Status Dispatcher</span>
                <div className="col-span-2 flex justify-center">
                  <div className="w-5 h-5 rounded-md bg-[#25D366] text-white flex items-center justify-center">
                    <MessageSquare className="w-3 h-3 fill-white text-white" />
                  </div>
                </div>
                <span className="col-span-2 text-right font-medium text-gray-700">3,120</span>
                <span className="col-span-2 text-right font-semibold text-[#16A34A]">97.8%</span>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-12 items-center py-3">
                <span className="col-span-6 font-medium text-gray-900 truncate pr-2">New Contact Welcome Flow</span>
                <div className="col-span-2 flex justify-center">
                  <div className="w-5 h-5 rounded-md bg-black text-white flex items-center justify-center text-[10px] font-bold">
                    @
                  </div>
                </div>
                <span className="col-span-2 text-right font-medium text-gray-700">640</span>
                <span className="col-span-2 text-right font-semibold text-[#16A34A]">96.4%</span>
              </div>
            </div>
          </div>

          {/* Panel 2: Recent Activity (Span 4) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900">Recent Activity</h3>
              <Link href="/app/analytics" className="text-xs text-gray-400 hover:text-gray-700 font-medium flex items-center gap-1 transition">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3.5">
              {/* Item 1 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 truncate pr-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 text-white flex items-center justify-center shrink-0">
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <h5 className="text-xs font-bold text-gray-900 truncate leading-tight">Instagram Price Inquiry Auto Reply</h5>
                    <p className="text-[11px] text-gray-400 truncate">Target: Sarah Jenkins (@sarah_design)</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-gray-400 block font-mono">11:40 PM</span>
                  <span className="text-[9px] font-semibold text-[#1E7E34] bg-[#EAF5EE] px-2 py-0.5 rounded-full inline-block mt-0.5">
                    Success
                  </span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 truncate pr-2">
                  <div className="w-7 h-7 rounded-lg bg-[#1877F2] text-white flex items-center justify-center shrink-0">
                    <FacebookIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <h5 className="text-xs font-bold text-gray-900 truncate leading-tight">Facebook Comment Private Reply</h5>
                    <p className="text-[11px] text-gray-400 truncate">Target: Marcus Vance (Marcus Vance)</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-gray-400 block font-mono">11:15 PM</span>
                  <span className="text-[9px] font-semibold text-[#1E7E34] bg-[#EAF5EE] px-2 py-0.5 rounded-full inline-block mt-0.5">
                    Success
                  </span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 truncate pr-2">
                  <div className="w-7 h-7 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0">
                    <MessageSquare className="w-3.5 h-3.5 fill-white text-white" />
                  </div>
                  <div className="truncate">
                    <h5 className="text-xs font-bold text-gray-900 truncate leading-tight">WhatsApp Order Status Dispatcher</h5>
                    <p className="text-[11px] text-gray-400 truncate">Target: Elena Rostova (+1 555 321-9876)</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-gray-400 block font-mono">10:00 PM</span>
                  <span className="text-[9px] font-semibold text-[#DC2626] bg-[#FDF2F2] px-2 py-0.5 rounded-full inline-block mt-0.5">
                    Failed
                  </span>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 truncate pr-2">
                  <div className="w-7 h-7 rounded-lg bg-[#FEF6EE] text-[#B45309] flex items-center justify-center shrink-0">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <h5 className="text-xs font-bold text-gray-900 truncate leading-tight">New contact added</h5>
                    <p className="text-[11px] text-gray-400 truncate">Rohit Sharma (@rohit.creates)</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-gray-400 block font-mono">09:42 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 3: Quick Actions & Need Help (Span 3) */}
          <div className="lg:col-span-3 space-y-3 flex flex-col justify-between">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs flex-1">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Quick Actions</h3>

              <div className="space-y-1.5">
                <Link
                  href="/app/automations/builder"
                  className="w-full flex items-center justify-between p-2 rounded-xl text-xs text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>Create New Automation</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                </Link>

                <Link
                  href="/app/channels"
                  className="w-full flex items-center justify-between p-2 rounded-xl text-xs text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <Radio className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Connect New Channel</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                </Link>

                <Link
                  href="/app/templates"
                  className="w-full flex items-center justify-between p-2 rounded-xl text-xs text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                    <span>Manage Templates</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                </Link>

                <Link
                  href="/app/team"
                  className="w-full flex items-center justify-between p-2 rounded-xl text-xs text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-3.5 h-3.5 text-sky-500" />
                    <span>Add Team Member</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                </Link>
              </div>
            </div>

            {/* Need Help Card */}
            <div className="bg-[#F7FAF7] border border-[#E2EBE2] rounded-2xl p-4 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#E3EFE3] text-[#205527] flex items-center justify-center shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900">Need Help?</h5>
                  <p className="text-[10px] text-gray-500 leading-tight">Check our documentation or chat with our support team.</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 shrink-0 ml-2" />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
