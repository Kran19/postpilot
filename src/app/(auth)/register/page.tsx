'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Send, Mail, Lock, User, Building, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [workspaceName, setWorkspaceName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/onboarding');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] flex items-center justify-center p-4 relative overflow-hidden font-sans antialiased selection:bg-[#1D3B2A] selection:text-white">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/8 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition">
              <Send className="w-4 h-4 fill-white -rotate-12 translate-x-0.5 -translate-y-0.5" />
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">PostPilot</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create Your Workspace</h1>
          <p className="text-xs text-gray-500 mt-1">14-day free trial • No credit card required</p>
        </div>

        <div className="bg-white p-7 sm:p-8 rounded-2xl border border-gray-200/90 shadow-lg shadow-gray-200/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Alex Morgan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Workspace / Brand Name</label>
              <div className="relative">
                <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Acme Brand Studio"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Work Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="alex@acmestudio.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                <span>Creating workspace...</span>
              ) : (
                <>
                  <span>Continue to Channel Setup</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              Already have an account?{' '}
              <Link href="/login" className="text-[#1E7E34] font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
