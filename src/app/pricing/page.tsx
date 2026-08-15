'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { MOCK_PLANS } from '@/lib/mock-data';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white">POSTPILOT</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login"><Button variant="ghost" size="sm">Log In</Button></Link>
            <Link href="/register"><Button variant="primary" size="sm">Get Started</Button></Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Flexible Plans Built for Every Scale</h1>
        <p className="text-slate-400 mt-4 text-base max-w-2xl mx-auto">
          Automate Instagram DMs, Facebook comments, WhatsApp Business API messages, and Threads engagement with zero hidden fees.
        </p>

        <div className="flex items-center justify-center gap-3 mt-10 mb-16">
          <span className={!isAnnual ? 'text-white font-semibold text-sm' : 'text-slate-400 text-sm'}>Monthly Billing</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 rounded-full bg-slate-800 border border-slate-700 p-1 flex items-center transition"
          >
            <div className={`w-5 h-5 rounded-full bg-indigo-500 transition-transform ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
          <span className={isAnnual ? 'text-white font-semibold text-sm' : 'text-slate-400 text-sm'}>
            Annual Billing <span className="text-indigo-400 font-bold text-xs ml-1">(20% Discount)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
          {MOCK_PLANS.map((plan) => (
            <Card key={plan.id} className={plan.isPopular ? 'border-indigo-500 shadow-xl shadow-indigo-500/10' : ''}>
              <h3 className="text-lg font-bold text-white">{plan.name}</h3>
              <p className="text-xs text-slate-400 mt-1 min-h-[36px]">{plan.description}</p>
              <div className="my-6">
                <span className="text-4xl font-extrabold text-white">${isAnnual ? plan.priceYearly : plan.priceMonthly}</span>
                <span className="text-xs text-slate-400"> / mo</span>
              </div>
              <Link href="/register">
                <Button variant={plan.isPopular ? 'primary' : 'outline'} className="w-full">
                  Get Started
                </Button>
              </Link>
              <ul className="mt-8 space-y-3 text-xs text-slate-300">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
