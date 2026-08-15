'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Home
          </Button>
        </Link>

        <div className="border-b border-slate-800 pb-6 space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">Meta App Review Compliance</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-xs text-slate-400">Effective Date: January 1, 2026 • Version 1.4</p>
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Data Ingestion & Meta API Scopes</h2>
            <p>
              POSTPILOT accesses user data strictly via Meta Graph API and WhatsApp Business Platform API upon explicit user OAuth consent. We request only required permissions (<code className="text-indigo-300 font-mono text-xs">instagram_manage_messages</code>, <code className="text-indigo-300 font-mono text-xs">pages_messaging</code>, <code className="text-indigo-300 font-mono text-xs">whatsapp_business_messaging</code>).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Token Encryption & Access Credentials</h2>
            <p>
              All Meta Access Tokens and Refresh Tokens are encrypted at rest using AES-256-GCM. Tokens are never exposed to the client browser and are processed solely in isolated server environments.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. User Data Retention & Deletion</h2>
            <p>
              Users may request immediate deletion of their stored Meta connection metadata and conversation logs via our <Link href="/data-deletion" className="text-indigo-400 hover:underline">Data Deletion Endpoint</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
