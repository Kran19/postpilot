'use client';

import React from 'react';
import Link from 'next/link';
import { Send, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#16A34A]" />
              <span className="text-xs font-bold text-[#1E7E34] uppercase tracking-wider">Meta App Review Compliance</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Privacy Policy</h1>
            <p className="text-xs text-gray-400">Effective Date: January 1, 2026 • Version 1.4</p>
          </div>

          <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">1. Data Ingestion & Meta API Scopes</h2>
              <p>
                Empeor Smart Solutions accesses user data strictly via Meta Graph API and WhatsApp Business Platform API upon explicit user OAuth consent. We request only required permissions (<code className="text-indigo-600 font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">instagram_manage_messages</code>, <code className="text-indigo-600 font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">pages_messaging</code>, <code className="text-indigo-600 font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">whatsapp_business_messaging</code>).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">2. Token Encryption & Access Credentials</h2>
              <p>
                All Meta Access Tokens and Refresh Tokens are encrypted at rest using AES-256-GCM. Tokens are never exposed to the client browser and are processed solely in isolated server environments.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900">3. User Data Retention & Deletion</h2>
              <p>
                Users may request immediate deletion of their stored Meta connection metadata and conversation logs via our <Link href="/data-deletion" className="text-[#1E7E34] font-semibold hover:underline">Data Deletion Endpoint</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
