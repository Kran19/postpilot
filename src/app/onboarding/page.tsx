'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Bot, 
  ShieldCheck, 
  Play, 
  Loader2,
  Sparkles,
  ChevronRight,
  Check
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/icons/SocialIcons';

export default function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [workspaceName, setWorkspaceName] = useState('Acme Brand Studio');
  const [selectedChannel, setSelectedChannel] = useState<'instagram' | 'facebook' | 'whatsapp' | 'threads'>('instagram');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [keyword, setKeyword] = useState('PRICE');
  const [replyText, setReplyText] = useState('Hi! Our Pro plan starts at $49/mo. Check details: https://postpilot.app/pricing');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<boolean | null>(null);

  const handleSimulateMetaOAuth = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setIsConnected(true);
    }, 1200);
  };

  const handleRunDryRunTest = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      setTestResult(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] text-gray-900 flex flex-col justify-between p-4 sm:p-8 font-sans antialiased selection:bg-[#1D3B2A] selection:text-white">
      {/* Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center text-white shadow-xs">
            <Send className="w-3.5 h-3.5 fill-white -rotate-12 translate-x-0.5 -translate-y-0.5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">PostPilot</span>
        </Link>
        <div className="text-xs text-gray-500 font-semibold bg-white border border-gray-200 px-3 py-1 rounded-full">
          Step {step} of 5
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto w-full py-6">
        {/* Progress Bar */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-black shadow-2xs' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Workspace */}
        {step === 1 && (
          <div className="bg-white p-7 sm:p-8 rounded-2xl border border-gray-200/90 shadow-lg shadow-gray-200/50 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E7E34] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full inline-block">
                Step 1: Workspace Setup
              </span>
              <h2 className="text-2xl font-bold text-gray-900">Name Your Workspace</h2>
              <p className="text-xs text-gray-500">Your workspace isolates connected channels, team members, automations, and unified inbox logs.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Workspace Name</label>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="e.g. Acme Brand Studio"
                className="w-full bg-[#FAFAFA] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-black hover:bg-gray-800 text-white font-bold text-xs py-3 rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Channel Selection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Channel Selection */}
        {step === 2 && (
          <div className="bg-white p-7 sm:p-8 rounded-2xl border border-gray-200/90 shadow-lg shadow-gray-200/50 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E7E34] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full inline-block">
                Step 2: Channel Selection
              </span>
              <h2 className="text-2xl font-bold text-gray-900">Select Primary Channel</h2>
              <p className="text-xs text-gray-500">Choose the Meta channel you want to automate first. You can add more channels anytime.</p>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <button
                onClick={() => setSelectedChannel('instagram')}
                className={`p-4 rounded-xl border text-left transition flex flex-col justify-between h-28 cursor-pointer ${
                  selectedChannel === 'instagram'
                    ? 'border-pink-500 bg-pink-50/60 ring-2 ring-pink-200'
                    : 'border-gray-200 bg-[#FAFAFA] hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 flex items-center justify-center text-white shadow-2xs">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Instagram</h4>
                  <p className="text-[10px] text-gray-500">DMs & Comments</p>
                </div>
              </button>

              <button
                onClick={() => setSelectedChannel('facebook')}
                className={`p-4 rounded-xl border text-left transition flex flex-col justify-between h-28 cursor-pointer ${
                  selectedChannel === 'facebook'
                    ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-200'
                    : 'border-gray-200 bg-[#FAFAFA] hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#1877F2] flex items-center justify-center text-white shadow-2xs">
                  <FacebookIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Facebook Page</h4>
                  <p className="text-[10px] text-gray-500">Page Inbox</p>
                </div>
              </button>

              <button
                onClick={() => setSelectedChannel('whatsapp')}
                className={`p-4 rounded-xl border text-left transition flex flex-col justify-between h-28 cursor-pointer ${
                  selectedChannel === 'whatsapp'
                    ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-200'
                    : 'border-gray-200 bg-[#FAFAFA] hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#25D366] flex items-center justify-center text-white shadow-2xs">
                  <MessageSquare className="w-4 h-4 fill-white text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">WhatsApp Business</h4>
                  <p className="text-[10px] text-gray-500">Cloud API WABA</p>
                </div>
              </button>

              <button
                onClick={() => setSelectedChannel('threads')}
                className={`p-4 rounded-xl border text-left transition flex flex-col justify-between h-28 cursor-pointer ${
                  selectedChannel === 'threads'
                    ? 'border-black bg-gray-100 ring-2 ring-gray-300'
                    : 'border-gray-200 bg-[#FAFAFA] hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white shadow-2xs">
                  <span className="font-bold text-xs">@</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Threads</h4>
                  <p className="text-[10px] text-gray-500">Replies & Hub</p>
                </div>
              </button>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-50 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 py-2.5 rounded-xl bg-black text-white text-xs font-bold hover:bg-gray-800 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Authorize {selectedChannel.toUpperCase()} Asset</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Meta OAuth Sim */}
        {step === 3 && (
          <div className="bg-white p-7 sm:p-8 rounded-2xl border border-gray-200/90 shadow-lg shadow-gray-200/50 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E7E34] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full inline-block">
                Step 3: Meta OAuth Authorization
              </span>
              <h2 className="text-2xl font-bold text-gray-900">Connect {selectedChannel.toUpperCase()}</h2>
              <p className="text-xs text-gray-500">PostPilot requests only Meta Graph API permissions required for your automation rules.</p>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Granular Meta Permissions Requested:</span>
                <span className="text-[10px] text-[#1E7E34] bg-[#EAF5EE] px-2 py-0.5 rounded-full font-bold">
                  Official Dialog
                </span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                  <span><code className="text-indigo-600 font-mono text-[11px]">instagram_basic</code> — Account identity & handle lookup</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                  <span><code className="text-indigo-600 font-mono text-[11px]">instagram_manage_messages</code> — DM triggers & auto-replies</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                  <span><code className="text-indigo-600 font-mono text-[11px]">pages_messaging</code> — Webhook event subscription</span>
                </li>
              </ul>
            </div>

            {!isConnected ? (
              <button
                onClick={handleSimulateMetaOAuth}
                disabled={isAuthenticating}
                className="w-full py-3 bg-[#1877F2] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition"
              >
                {isAuthenticating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting via Meta Graph OAuth...</span>
                  </>
                ) : (
                  <>
                    <FacebookIcon className="w-4 h-4" />
                    <span>Log In with Facebook / Meta</span>
                  </>
                )}
              </button>
            ) : (
              <div className="p-4 bg-[#F0FDF4] border border-emerald-300 rounded-xl text-center space-y-1.5">
                <CheckCircle2 className="w-7 h-7 text-[#16A34A] mx-auto" />
                <h4 className="text-xs font-bold text-emerald-950">Connected @acmestudio Successfully!</h4>
                <p className="text-[11px] text-emerald-800">Token encrypted with AES-256 and stored securely in PostPilot backend.</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-50 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!isConnected}
                className="w-2/3 py-2.5 rounded-xl bg-black disabled:opacity-40 text-white text-xs font-bold hover:bg-gray-800 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Configure First Rule</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Automation Setup */}
        {step === 4 && (
          <div className="bg-white p-7 sm:p-8 rounded-2xl border border-gray-200/90 shadow-lg shadow-gray-200/50 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E7E34] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full inline-block">
                Step 4: Automation Setup
              </span>
              <h2 className="text-2xl font-bold text-gray-900">Create First Rule</h2>
              <p className="text-xs text-gray-500">Define the trigger keyword and the automated direct message response.</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-xl space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">1. Trigger Condition</span>
                <label className="block text-xs font-bold text-gray-700">When Message Contains Keyword:</label>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g. PRICE or INFO"
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-xl space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E7E34]">2. Action Response</span>
                <label className="block text-xs font-bold text-gray-700">Direct Message Content:</label>
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep(3)}
                className="w-1/3 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-50 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="w-2/3 py-2.5 rounded-xl bg-black text-white text-xs font-bold hover:bg-gray-800 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Test Rule Execution</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Test & Activate */}
        {step === 5 && (
          <div className="bg-white p-7 sm:p-8 rounded-2xl border border-gray-200/90 shadow-lg shadow-gray-200/50 space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E7E34] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full inline-block">
                Step 5: Test & Activate
              </span>
              <h2 className="text-2xl font-bold text-gray-900">Dry-Run Test Your Automation</h2>
              <p className="text-xs text-gray-500">Simulate an incoming Meta webhook event to verify trigger evaluation before going live.</p>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-xl space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-500 text-[11px]">
                <span>SIMULATED INCOMING DM</span>
                <span>Keyword: &quot;{keyword}&quot;</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-lg text-slate-900">
                &quot;Hi @acmestudio, what is your {keyword}?&quot;
              </div>

              {testResult && (
                <div className="p-3 bg-[#F0FDF4] border border-emerald-300 rounded-lg text-emerald-950 space-y-1 font-sans">
                  <div className="font-bold flex items-center gap-1.5 text-xs text-[#16A34A]">
                    <CheckCircle2 className="w-4 h-4" /> Trigger Matched & Condition Passed!
                  </div>
                  <div className="text-xs text-slate-700">Outbound Reply: &quot;{replyText}&quot;</div>
                </div>
              )}
            </div>

            {!testResult ? (
              <button
                onClick={handleRunDryRunTest}
                disabled={isTesting}
                className="w-full py-3 bg-[#1D3B2A] hover:bg-[#152B1E] text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition"
              >
                {isTesting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Evaluating trigger...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white text-white" />
                    <span>Run Simulated Trigger Test</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => router.push('/app/dashboard')}
                className="w-full py-3 bg-black hover:bg-gray-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Activate Automation & Launch Dashboard</span>
              </button>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-3">
        PostPilot SaaS Platform • Meta Graph Review Ready
      </footer>
    </div>
  );
}
