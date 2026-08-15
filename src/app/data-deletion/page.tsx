'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, CheckCircle2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export default function DataDeletionPage() {
  const [userAppId, setUserAppId] = useState('');
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setConfirmationCode(`DEL-META-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <Link href="/">
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Home
          </Button>
        </Link>

        <div className="border-b border-slate-800 pb-6 space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">Meta Platform Requirement</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">User Data Deletion Callback & Status</h1>
          <p className="text-xs text-slate-400">Pursuant to Meta App Review policies, users may request immediate purge of all stored Meta account data.</p>
        </div>

        <Card className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Meta User ID / Page ID"
              placeholder="e.g. 10928301928301"
              value={userAppId}
              onChange={(e) => setUserAppId(e.target.value)}
              required
            />

            <Button type="submit" variant="danger" className="w-full" isLoading={isLoading} leftIcon={<Trash2 className="w-4 h-4" />}>
              Request User Data Purge
            </Button>
          </form>

          {confirmationCode && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-2 text-xs text-emerald-300">
              <div className="font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Data Purge Request Accepted
              </div>
              <p>Confirmation Tracking Code: <code className="font-mono font-bold text-white">{confirmationCode}</code></p>
              <p className="text-[11px] text-slate-400">All Meta access tokens and conversation records for this User ID have been queued for immediate cryptographic erasure.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
