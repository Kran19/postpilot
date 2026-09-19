'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, Mail, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] flex items-center justify-center p-4 relative overflow-hidden font-sans antialiased selection:bg-[#1D3B2A] selection:text-white">
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition">
              <Send className="w-4 h-4 fill-white -rotate-12 translate-x-0.5 -translate-y-0.5" />
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">PostPilot</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-xs text-gray-500 mt-1">Enter your work email to receive reset instructions</p>
        </div>

        <div className="bg-white p-7 sm:p-8 rounded-2xl border border-gray-200/90 shadow-lg shadow-gray-200/50">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Work Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black hover:bg-gray-800 text-white font-bold text-xs py-3 rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <span>Sending instructions...</span>
                ) : (
                  <>
                    <span>Send Password Reset Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4 py-3">
              <CheckCircle2 className="w-12 h-12 text-[#16A34A] mx-auto" />
              <h3 className="text-base font-bold text-gray-900">Reset Link Dispatched</h3>
              <p className="text-xs text-gray-500">
                We have sent reset instructions to <strong className="text-gray-800">{email}</strong>. Check your inbox to complete reset.
              </p>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <Link href="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to sign in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
