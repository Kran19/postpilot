'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Bot, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Activity, 
  Users, 
  ChevronRight,
  Send,
  Lock,
  Workflow,
  Check,
  Star,
  Globe,
  TrendingUp,
  Cpu,
  BarChart3,
  Clock,
  Sparkle
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/icons/SocialIcons';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { MOCK_PLANS } from '@/lib/mock-data';

export default function LandingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-[#F6F7F9] text-gray-900 selection:bg-[#1D3B2A] selection:text-white font-sans antialiased">
      {/* ============================================================ */}
      {/* Top Navbar */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-gray-200/80 transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition">
              <Send className="w-4 h-4 fill-white -rotate-12 translate-x-0.5 -translate-y-0.5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-gray-900 block leading-tight">PostPilot</span>
              <span className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase block">Meta Social Automation</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-gray-600">
            <a href="#features" className="hover:text-gray-900 transition">Features</a>
            <a href="#channels" className="hover:text-gray-900 transition">Channels</a>
            <a href="#how-it-works" className="hover:text-gray-900 transition">How It Works</a>
            <a href="#pricing" className="hover:text-gray-900 transition">Pricing</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <button className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 transition cursor-pointer">
                Log In
              </button>
            </Link>
            <Link href="/register">
              <button className="px-4 py-2 rounded-xl text-xs font-bold bg-black text-white hover:bg-gray-800 transition shadow-xs flex items-center gap-1.5 cursor-pointer">
                <span>Get Started Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* Hero Section */}
      {/* ============================================================ */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-24 overflow-hidden">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-emerald-500/8 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-40 right-10 w-[400px] h-[300px] bg-teal-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Top Feature Tag Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5EE] border border-[#D0EADB] text-[#1E7E34] text-xs font-bold mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#1E7E34]" />
            <span>Official Meta Graph Automation Engine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 max-w-4xl mx-auto leading-[1.12]">
            Turn Every Comment & DM into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D3B2A] via-[#16A34A] to-[#0D9488]">Paying Customer</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal">
            PostPilot unifies Instagram, Facebook, WhatsApp, and Threads into a powerful visual SaaS engine. Automate instant keyword replies, lead capture, and live sales 24/7.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link href="/register">
              <button className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-black text-white hover:bg-gray-800 text-sm font-bold transition shadow-sm flex items-center justify-center gap-2 cursor-pointer">
                <span>Start 14-Day Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/app/dashboard">
              <button className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-gray-300/80 text-gray-800 hover:bg-gray-50 text-sm font-bold transition shadow-2xs flex items-center justify-center gap-2 cursor-pointer">
                <Bot className="w-4 h-4 text-emerald-600" />
                <span>Explore Interactive Demo</span>
              </button>
            </Link>
          </div>

          {/* Trust Value Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Meta App Review Compliant</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> 99.9% Webhook SLA</span>
          </div>

          {/* ============================================================ */}
          {/* Interactive Live Engine Simulation Mockup */}
          {/* ============================================================ */}
          <div className="mt-14 relative max-w-5xl mx-auto rounded-2xl bg-white border border-gray-200/90 p-4 sm:p-6 shadow-xl shadow-gray-200/50 overflow-hidden text-left">
            {/* Header Chrome */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs font-mono text-gray-400">postpilot.app/live-engine-preview</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1E7E34] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                Meta Webhooks Live
              </span>
            </div>

            {/* 3 Step Simulation Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {/* Box 1: Customer Trigger */}
              <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span className="flex items-center gap-1.5 text-pink-600 font-bold">
                    <InstagramIcon className="w-3.5 h-3.5" /> Instagram Comment
                  </span>
                  <span className="text-[10px] text-gray-400">10:42:01</span>
                </div>
                <div className="bg-white p-3 rounded-lg text-xs text-gray-800 font-mono border border-slate-200/80 shadow-2xs">
                  &quot;@acmestudio love this! Can you send the pricing link? PRICE please!&quot;
                </div>
                <span className="text-[10px] text-gray-400 block font-medium">Customer: @sarah_designs (12.4k followers)</span>
              </div>

              {/* Box 2: PostPilot Rule Match */}
              <div className="bg-gradient-to-br from-[#F0FDF4] to-[#ECFDF5] p-4 rounded-xl border border-emerald-300 space-y-2.5 relative">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                    PostPilot Automation Engine
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-mono">12ms</span>
                </div>
                <div className="space-y-1 text-[11px] text-emerald-900 font-medium">
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    <span>Rule: <strong>IG_PROMO_KEYWORD</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    <span>Keyword matched: &quot;PRICE&quot;</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    <span>Action: Instant DM + Lead Tag</span>
                  </div>
                </div>
              </div>

              {/* Box 3: Automated DM Dispatched */}
              <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <Send className="w-3.5 h-3.5" /> Instant DM Dispatched
                  </span>
                  <span className="text-[10px] text-gray-400">10:42:02</span>
                </div>
                <div className="bg-[#1D3B2A] text-white p-3 rounded-lg text-xs leading-relaxed shadow-xs">
                  &quot;Hi Sarah! Here is the exclusive link to our Pro plan ($49/mo): postpilot.app/pricing 🚀&quot;
                </div>
                <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Delivered via Meta Graph (&lt;120ms)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Meta Channel Integration Hub */}
      {/* ============================================================ */}
      <section id="channels" className="py-20 bg-white border-y border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1E7E34] bg-[#EAF5EE] px-3 py-1 rounded-full inline-block mb-3">
              Official Meta Graph Hub
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              One Unified Engine for All Meta Channels
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              Connect official business pages and WhatsApp numbers with granular permissions and automatic token refresh.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Instagram */}
            <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-gray-200/90 hover:border-gray-300 hover:shadow-xs transition space-y-3.5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 flex items-center justify-center text-white shadow-xs">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Instagram Automation</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Auto DMs for feed comments, story mention reactions, keyword triggers, and follower lead tagging.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                <span className="text-[10px] font-semibold bg-pink-50 text-pink-700 border border-pink-200 px-2 py-0.5 rounded-full">
                  instagram_manage_messages
                </span>
                <span className="text-[10px] font-semibold bg-pink-50 text-pink-700 border border-pink-200 px-2 py-0.5 rounded-full">
                  instagram_manage_comments
                </span>
              </div>
            </div>

            {/* Facebook */}
            <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-gray-200/90 hover:border-gray-300 hover:shadow-xs transition space-y-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#1877F2] flex items-center justify-center text-white shadow-xs">
                <FacebookIcon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Facebook Page Manager</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Page inbox auto-responses, post comment private replies, lead ad sync, and FAQ bot routing.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
                  pages_messaging
                </span>
                <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
                  pages_read_engagement
                </span>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-gray-200/90 hover:border-gray-300 hover:shadow-xs transition space-y-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-xs">
                <MessageSquare className="w-5 h-5 fill-white text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900">WhatsApp Cloud API</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Official Cloud API integration, verified WABA templates, broadcast dispatches, and order tracking.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                  whatsapp_business_messaging
                </span>
              </div>
            </div>

            {/* Threads */}
            <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-gray-200/90 hover:border-gray-300 hover:shadow-xs transition space-y-3.5">
              <div className="w-11 h-11 rounded-xl bg-black flex items-center justify-center text-white shadow-xs">
                <span className="font-bold text-sm">@</span>
              </div>
              <h3 className="text-base font-bold text-gray-900">Threads Publisher</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Official Threads publishing API, reply tracking, keyword sentiment monitoring, and audience growth.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                <span className="text-[10px] font-semibold bg-gray-100 text-gray-800 border border-gray-300 px-2 py-0.5 rounded-full">
                  threads_content_publish
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Features Overview */}
      {/* ============================================================ */}
      <section id="features" className="py-24 bg-[#F6F7F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Built for Scale, Revenue & Conversion
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF5EE] text-[#1E7E34] flex items-center justify-center">
                <Workflow className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Visual Rule Builder</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Build automations with ease: Trigger $\rightarrow$ Condition $\rightarrow$ Action. Supports keyword matching, delay intervals, and team handoffs.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF5EE] text-[#1E7E34] flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Unified Live Inbox</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Centralize customer threads from all Meta channels in one high-contrast, color-coded team workspace with quick reply shortcuts.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF5EE] text-[#1E7E34] flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Real-Time Trace Logs</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Track every webhook payload: signature verification, trigger evaluation, condition matching, and Meta API latency logs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Pricing Preview */}
      {/* ============================================================ */}
      <section id="pricing" className="py-20 bg-white border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1E7E34] bg-[#EAF5EE] px-3 py-1 rounded-full inline-block mb-3">
            Simple Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Transparent Plans for Every Brand</h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto mb-10">Start free with no credit card required. Upgrade as your conversation volumes expand.</p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className={!isAnnual ? 'text-gray-900 font-bold text-xs' : 'text-gray-500 text-xs'}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-12 h-6 rounded-full bg-gray-200 p-1 flex items-center transition cursor-pointer"
            >
              <div className={`w-4 h-4 rounded-full bg-black transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={isAnnual ? 'text-gray-900 font-bold text-xs' : 'text-gray-500 text-xs'}>
              Annual Billing <span className="text-[11px] text-[#16A34A] font-bold ml-1">(Save 20%)</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            {MOCK_PLANS.map((plan) => (
              <div 
                key={plan.id}
                className={`p-6 rounded-2xl border transition flex flex-col justify-between ${
                  plan.isPopular 
                    ? 'border-gray-900 bg-white shadow-lg ring-1 ring-gray-900 relative' 
                    : 'border-gray-200/90 bg-[#FAFAFA]'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] uppercase font-bold tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className="text-base font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 min-h-[32px]">{plan.description}</p>
                  
                  <div className="my-5">
                    <span className="text-3xl font-extrabold text-gray-900">${isAnnual ? plan.priceYearly : plan.priceMonthly}</span>
                    <span className="text-xs text-gray-400"> / month</span>
                  </div>

                  <Link href="/register">
                    <button className={`w-full py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      plan.isPopular 
                        ? 'bg-black text-white hover:bg-gray-800 shadow-xs' 
                        : 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-100'
                    }`}>
                      Get Started with {plan.name}
                    </button>
                  </Link>

                  <ul className="mt-6 space-y-2.5 text-xs text-gray-600">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Footer */}
      {/* ============================================================ */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center text-white">
              <Send className="w-3.5 h-3.5 fill-white -rotate-12" />
            </div>
            <div>
              <span className="text-sm font-bold text-gray-900 block leading-tight">PostPilot</span>
              <span className="text-[11px] text-gray-400">© 2026 PostPilot Inc. All rights reserved.</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 font-medium">
            <Link href="/privacy" className="hover:text-gray-900 transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-900 transition">Terms of Service</Link>
            <Link href="/data-deletion" className="hover:text-gray-900 transition">Data Deletion</Link>
            <Link href="/security" className="hover:text-gray-900 transition">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
