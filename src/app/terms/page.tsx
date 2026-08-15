'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Home
          </Button>
        </Link>

        <div className="border-b border-slate-800 pb-6 space-y-2">
          <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
          <p className="text-xs text-slate-400">Effective Date: January 1, 2026</p>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Multi-Tenant SaaS Agreement</h2>
            <p>
              By accessing POSTPILOT, you agree to comply with Meta Platform Terms and Commercial SaaS Terms of Service.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Acceptable Messaging Use</h2>
            <p>
              POSTPILOT prohibits spam, unauthorized broadcasting, or violation of Meta 24-hour messaging policy rules.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
