'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, Key, Activity } from 'lucide-react';

export default function SecurityPage() {
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
              <span className="text-xs font-bold text-[#1E7E34] uppercase tracking-wider">Enterprise Architecture</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Security & Encryption Infrastructure</h1>
            <p className="text-xs text-gray-400">Zero-Trust Architecture • AES-256 Token Encryption • HMAC SHA-256 Webhook Verification</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl bg-[#FAFAFA] border border-gray-200/90 space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Encrypted Credential Storage</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Meta OAuth access tokens are encrypted at rest using AES-256-GCM. Decryption keys are isolated from browser contexts.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#FAFAFA] border border-gray-200/90 space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">HMAC Signature Validation</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Incoming webhooks from Meta Graph API validate the <code className="text-emerald-700 font-mono text-[11px] bg-emerald-100/60 px-1 py-0.5 rounded">X-Hub-Signature-256</code> header prior to queue processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
