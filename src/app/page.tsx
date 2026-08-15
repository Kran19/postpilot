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
  Workflow
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/icons/SocialIcons';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { MOCK_PLANS } from '@/lib/mock-data';

export default function LandingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white">POSTPILOT</span>
              <span className="text-[10px] font-semibold tracking-widest text-indigo-400 block -mt-1 uppercase">Social SaaS</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-slate-100 transition">Features</a>
            <a href="#channels" className="hover:text-slate-100 transition">Channels</a>
            <a href="#how-it-works" className="hover:text-slate-100 transition">How it Works</a>
            <Link href="/pricing" className="hover:text-slate-100 transition">Pricing</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log In</Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-8 animate-float">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Commercial Meta Social Automation Engine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Automate Every Conversation Across <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Instagram, Facebook & WhatsApp</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
            POSTPILOT abstracts complex Meta Graph APIs into a sleek visual SaaS engine. Turn social comments and DMs into high-converting sales conversations 24/7.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Start 14-Day Free Trial
              </Button>
            </Link>
            <Link href="/app/dashboard">
              <Button variant="secondary" size="lg" leftIcon={<Bot className="w-5 h-5 text-indigo-400" />}>
                Explore Interactive Demo
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Meta App Review Compliant</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> AES-256 Token Security</span>
          </div>

          {/* Product Visualizer Mock */}
          <div className="mt-16 relative max-w-5xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 p-4 sm:p-6 shadow-2xl shadow-indigo-950/40 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs font-medium text-slate-400 font-mono">postpilot.app/live-engine-simulation</span>
              </div>
              <Badge variant="success">● Engine Live</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium text-pink-400"><InstagramIcon className="w-3.5 h-3.5" /> Instagram DM</span>
                  <span>10:42:01</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg text-xs text-slate-200 font-mono">
                  &quot;@acmestudio how much is your pro plan? PRICE please!&quot;
                </div>
                <p className="text-[11px] text-slate-500">From customer @sarah_design</p>
              </div>

              <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-500/30 text-left space-y-3 relative">
                <div className="flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-indigo-400 animate-spin" />
                  <span className="text-xs font-semibold text-indigo-300">POSTPILOT Engine</span>
                </div>
                <div className="space-y-1.5 text-[11px] text-slate-300 font-mono">
                  <div className="flex items-center gap-1 text-emerald-400">✓ Signature Validated</div>
                  <div className="flex items-center gap-1 text-emerald-400">✓ Rule Matched: IG_PRICE_REPLY</div>
                  <div className="flex items-center gap-1 text-emerald-400">✓ Condition: Keyword &quot;PRICE&quot;</div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 text-left space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium text-emerald-400"><Send className="w-3.5 h-3.5" /> Direct Message Sent</span>
                  <span>10:42:02</span>
                </div>
                <div className="bg-indigo-900/40 border border-indigo-500/30 p-3 rounded-lg text-xs text-slate-100">
                  &quot;Hi Sarah! Our Pro plan starts at $49/mo. Check full pricing: postpilot.app/pricing&quot;
                </div>
                <span className="text-[10px] text-emerald-400 font-medium">✓ Delivery Acknowledged (&lt;200ms)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meta Channels Grid */}
      <section id="channels" className="py-20 bg-slate-900/50 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">Meta Channel Integration Hub</h2>
            <p className="text-3xl font-extrabold text-white sm:text-4xl">Unified Connectivity Across Meta Ecosystem</p>
            <p className="mt-4 text-slate-400 text-base">Connect official Page & Business APIs with granular permissions and automated health monitoring.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card hoverEffect className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                <InstagramIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Instagram Automation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Auto DMs for post comments, direct message keyword triggers, story mention replies, and customer lead tagging.</p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                <Badge variant="instagram">instagram_manage_messages</Badge>
                <Badge variant="instagram">instagram_manage_comments</Badge>
              </div>
            </Card>

            <Card hoverEffect className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                <FacebookIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Facebook Page Manager</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Page inbox messaging automation, post comment private messaging, lead ad integration, and automated FAQ responses.</p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                <Badge variant="facebook">pages_messaging</Badge>
                <Badge variant="facebook">pages_read_engagement</Badge>
              </div>
            </Card>

            <Card hoverEffect className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/30">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">WhatsApp Cloud API</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Official WhatsApp Business WABA account integration, HSM pre-approved message templates, order status dispatchers.</p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                <Badge variant="whatsapp">whatsapp_business_messaging</Badge>
              </div>
            </Card>

            <Card hoverEffect className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-white border border-slate-700 shadow-lg">
                <span className="font-extrabold text-xl">@</span>
              </div>
              <h3 className="text-lg font-bold text-white">Threads Publisher & Hub</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Threads official publishing API, reply tracking, brand mention lead detection, and engagement monitoring.</p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                <Badge variant="threads">threads_content_publish</Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">Enterprise Capabilities</h2>
            <p className="text-3xl font-extrabold text-white sm:text-4xl">Engineered for Revenue & Scale</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Visual Workflow Builder</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Build rules visually: Trigger $\rightarrow$ Condition $\rightarrow$ Action. Supports keyword matching, delay timers, agent assignment, and webhooks.</p>
            </div>

            <div className="space-y-3 p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Unified Multi-Channel Inbox</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Centralize all customer conversations from Instagram, Facebook, and WhatsApp into one collaborative team inbox.</p>
            </div>

            <div className="space-y-3 p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Real-Time Execution Logs</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Trace every automation step: Webhook payload validation, trigger matching, condition evaluation, and Meta API acknowledgments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-slate-900/40 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Transparent Pricing for Growing Brands</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-10">Start on the free tier and scale seamlessly as your conversation volumes expand.</p>

          <div className="flex items-center justify-center gap-3 mb-12">
            <span className={!isAnnual ? 'text-white font-medium text-sm' : 'text-slate-400 text-sm'}>Monthly Billing</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-12 h-6 rounded-full bg-slate-800 border border-slate-700 p-1 flex items-center transition"
            >
              <div className={`w-4 h-4 rounded-full bg-indigo-500 transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={isAnnual ? 'text-white font-medium text-sm' : 'text-slate-400 text-sm'}>
              Annual Billing <span className="text-xs text-indigo-400 font-bold ml-1">(Save 20%)</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
            {MOCK_PLANS.map((plan) => (
              <Card 
                key={plan.id}
                className={plan.isPopular ? 'border-indigo-500/80 bg-slate-900 relative shadow-xl shadow-indigo-500/10' : ''}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-0.5 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-base font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{plan.description}</p>
                <div className="my-5">
                  <span className="text-3xl font-extrabold text-white">${isAnnual ? plan.priceYearly : plan.priceMonthly}</span>
                  <span className="text-xs text-slate-400"> / month</span>
                </div>
                <Link href="/register">
                  <Button variant={plan.isPopular ? 'primary' : 'outline'} className="w-full text-xs">
                    Choose {plan.name}
                  </Button>
                </Link>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white">POSTPILOT</span>
            <span className="text-xs text-slate-400">© 2026 POSTPILOT Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/privacy" className="hover:text-slate-200">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-200">Terms of Service</Link>
            <Link href="/data-deletion" className="hover:text-slate-200">Meta Data Deletion</Link>
            <Link href="/security" className="hover:text-slate-200">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
