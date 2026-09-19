'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2, ArrowRight, Check } from 'lucide-react';
import { MOCK_PLANS } from '@/lib/mock-data';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-[#F6F7F9] text-gray-900 selection:bg-[#1D3B2A] selection:text-white font-sans antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center text-white shadow-xs">
              <Send className="w-4 h-4 fill-white -rotate-12 translate-x-0.5 -translate-y-0.5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-gray-900 block leading-tight">PostPilot</span>
              <span className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase block">Meta Social Automation</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <button className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition cursor-pointer">
                Log In
              </button>
            </Link>
            <Link href="/register">
              <button className="px-4 py-2 rounded-xl text-xs font-bold bg-black text-white hover:bg-gray-800 transition shadow-xs cursor-pointer">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Pricing Hero & Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#1E7E34] bg-[#EAF5EE] px-3 py-1 rounded-full inline-block mb-3">
          Predictable Pricing
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Flexible Plans Built for Every Scale
        </h1>
        <p className="text-gray-500 mt-4 text-base max-w-2xl mx-auto">
          Automate Instagram DMs, Facebook comments, WhatsApp Cloud API messages, and Threads engagement with zero hidden fees.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mt-10 mb-14">
          <span className={!isAnnual ? 'text-gray-900 font-bold text-xs' : 'text-gray-500 text-xs'}>Monthly</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-12 h-6 rounded-full bg-gray-200 p-1 flex items-center transition cursor-pointer"
          >
            <div className={`w-4 h-4 rounded-full bg-black transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <span className={isAnnual ? 'text-gray-900 font-bold text-xs' : 'text-gray-500 text-xs'}>
            Annual Billing <span className="text-[#16A34A] font-bold text-xs ml-1">(20% Discount)</span>
          </span>
        </div>

        {/* 4 Plans Grid */}
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
    </div>
  );
}
