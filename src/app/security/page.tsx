'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, Key, Activity } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function SecurityPage() {
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
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">Enterprise SaaS Architecture</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Security & Encryption Infrastructure</h1>
          <p className="text-xs text-slate-400">Zero-Trust Architecture • AES-256 Token Encryption • HMAC SHA-256 Webhook Verification</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Encrypted Credential Storage</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Meta OAuth access tokens are encrypted at rest using AES-256-GCM. Decryption keys are rotated periodically via KMS and isolated from browser contexts.
            </p>
          </Card>

          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">HMAC Signature Validation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Incoming webhooks from Meta Graph API validate the <code className="text-emerald-300 font-mono">X-Hub-Signature-256</code> header prior to queue processing.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
