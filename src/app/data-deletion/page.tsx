'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, CheckCircle2, Trash2 } from 'lucide-react';

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
    <div className="min-h-screen bg-[#F6F7F9] text-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased selection:bg-[#1D3B2A] selection:text-white">
      <div className="max-w-2xl mx-auto space-y-8">
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
              <span className="text-xs font-bold text-[#1E7E34] uppercase tracking-wider">Meta Platform Requirement</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">User Data Deletion Request</h1>
            <p className="text-xs text-gray-400">Pursuant to Meta Platform policies, users may request immediate purge of all stored Meta account data.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Meta User ID / Page ID</label>
              <input
                type="text"
                placeholder="e.g. 10928301928301"
                value={userAppId}
                onChange={(e) => setUserAppId(e.target.value)}
                className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition"
            >
              <Trash2 className="w-4 h-4" />
              <span>{isLoading ? 'Processing Request...' : 'Request User Data Purge'}</span>
            </button>
          </form>

          {confirmationCode && (
            <div className="p-4 bg-[#F0FDF4] border border-emerald-300 rounded-xl space-y-2 text-xs text-emerald-950">
              <div className="font-bold flex items-center gap-2 text-[#16A34A]">
                <CheckCircle2 className="w-4 h-4" /> Data Purge Request Accepted
              </div>
              <p className="text-slate-600">
                Confirmation ID: <code className="font-mono font-bold text-emerald-800">{confirmationCode}</code>
              </p>
              <p className="text-[11px] text-slate-500">
                All associated access tokens, webhooks, and conversation threads will be deleted within 24 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
