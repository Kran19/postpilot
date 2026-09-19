'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#F6F7F9] text-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased selection:bg-[#1D3B2A] selection:text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/">
          <button className="px-3.5 py-1.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </Link>

        <div className="bg-white p-8 rounded-2xl border border-gray-200/90 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-6 space-y-2">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Terms of Service</h1>
            <p className="text-xs text-gray-400">Effective Date: January 1, 2026</p>
          </div>

          <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">1. Multi-Tenant SaaS Agreement</h2>
              <p>
                By accessing PostPilot, you agree to comply with Meta Platform Terms, Developer Policies, and Commercial SaaS Terms of Service.
              </p>
            </section>
            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">2. Acceptable Messaging Use</h2>
              <p>
                PostPilot strictly prohibits spam, unauthorized broadcasting, or violation of Meta 24-hour customer messaging policy rules.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
