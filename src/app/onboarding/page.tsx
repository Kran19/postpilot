'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Bot, 
  ShieldCheck, 
  Play, 
  Loader2,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/icons/SocialIcons';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8">
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">POSTPILOT</span>
        </Link>
        <div className="text-xs text-slate-400 font-medium">
          Step {step} of 5
        </div>
      </header>

      <main className="max-w-2xl mx-auto w-full py-8">
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-indigo-500 shadow-sm shadow-indigo-500/50' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <Card className="p-8 space-y-6">
            <div className="space-y-2">
              <Badge variant="info">Step 1: Workspace Setup</Badge>
              <h2 className="text-2xl font-bold text-white">Name Your POSTPILOT Workspace</h2>
              <p className="text-xs text-slate-400">Your workspace isolates connected channels, team members, automations, and unified inbox logs.</p>
            </div>

            <Input
              label="Workspace Name"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="e.g. Acme Brand Studio"
            />

            <Button
              variant="primary"
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => setStep(2)}
            >
              Continue to Channel Selection
            </Button>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-8 space-y-6">
            <div className="space-y-2">
              <Badge variant="info">Step 2: Channel Selection</Badge>
              <h2 className="text-2xl font-bold text-white">Select Primary Channel to Connect</h2>
              <p className="text-xs text-slate-400">Choose the Meta channel you want to automate first. You can add more channels later.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedChannel('instagram')}
                className={`p-4 rounded-xl border text-left transition flex flex-col justify-between h-28 cursor-pointer ${
                  selectedChannel === 'instagram'
                    ? 'border-pink-500/80 bg-pink-500/10'
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-pink-600 flex items-center justify-center text-white">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Instagram</h4>
                  <p className="text-[11px] text-slate-400">DMs & Comments</p>
                </div>
              </button>

              <button
                onClick={() => setSelectedChannel('facebook')}
                className={`p-4 rounded-xl border text-left transition flex flex-col justify-between h-28 cursor-pointer ${
                  selectedChannel === 'facebook'
                    ? 'border-blue-500/80 bg-blue-500/10'
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <FacebookIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Facebook Page</h4>
                  <p className="text-[11px] text-slate-400">Page Inbox</p>
                </div>
              </button>

              <button
                onClick={() => setSelectedChannel('whatsapp')}
                className={`p-4 rounded-xl border text-left transition flex flex-col justify-between h-28 cursor-pointer ${
                  selectedChannel === 'whatsapp'
                    ? 'border-emerald-500/80 bg-emerald-500/10'
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">WhatsApp Business</h4>
                  <p className="text-[11px] text-slate-400">Cloud API WABA</p>
                </div>
              </button>

              <button
                onClick={() => setSelectedChannel('threads')}
                className={`p-4 rounded-xl border text-left transition flex flex-col justify-between h-28 cursor-pointer ${
                  selectedChannel === 'threads'
                    ? 'border-slate-500 bg-slate-800/80'
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-white">
                  <span className="font-bold text-sm">@</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Threads</h4>
                  <p className="text-[11px] text-slate-400">Replies & Publishing</p>
                </div>
              </button>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setStep(1)} className="w-1/3">Back</Button>
              <Button variant="primary" onClick={() => setStep(3)} className="w-2/3" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Authorize {selectedChannel.toUpperCase()} Asset
              </Button>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card className="p-8 space-y-6">
            <div className="space-y-2">
              <Badge variant="info">Step 3: Meta Permission Authorization</Badge>
              <h2 className="text-2xl font-bold text-white">Connect {selectedChannel.toUpperCase()} via Meta OAuth</h2>
              <p className="text-xs text-slate-400">POSTPILOT requests only Meta Graph API permissions required for your automation features.</p>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>Granular Meta Permissions Requested:</span>
                <Badge variant="success">Official Meta Dialog</Badge>
              </div>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span><code className="text-indigo-300 font-mono">instagram_basic</code> — Account identity & handle lookup</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span><code className="text-indigo-300 font-mono">instagram_manage_messages</code> — Direct Message triggers & auto-replies</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span><code className="text-indigo-300 font-mono">pages_messaging</code> — Meta webhook subscription & event dispatch</span>
                </li>
              </ul>
            </div>

            {!isConnected ? (
              <Button
                variant="primary"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 shadow-blue-600/20"
                isLoading={isAuthenticating}
                onClick={handleSimulateMetaOAuth}
                leftIcon={<FacebookIcon className="w-5 h-5" />}
              >
                Log In with Facebook / Meta
              </Button>
            ) : (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-300">Connected @acmestudio Successfully!</h4>
                <p className="text-xs text-slate-400">Access token encrypted with AES-256 and stored securely in NestJS backend service.</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setStep(2)} className="w-1/3">Back</Button>
              <Button
                variant="primary"
                onClick={() => setStep(4)}
                disabled={!isConnected}
                className="w-2/3"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Configure First Rule
              </Button>
            </div>
          </Card>
        )}

        {step === 4 && (
          <Card className="p-8 space-y-6">
            <div className="space-y-2">
              <Badge variant="info">Step 4: Automation Setup</Badge>
              <h2 className="text-2xl font-bold text-white">Create Your First Automation Rule</h2>
              <p className="text-xs text-slate-400">Define the trigger keyword and the automated direct message response.</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">1. Trigger Condition</span>
                <Input
                  label="When Customer Message Contains Keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g. PRICE or INFO"
                />
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">2. Automated Action Response</span>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Direct Message Response Content
                  </label>
                  <textarea
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-lg text-sm p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setStep(3)} className="w-1/3">Back</Button>
              <Button variant="primary" onClick={() => setStep(5)} className="w-2/3" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Test Rule Execution
              </Button>
            </div>
          </Card>
        )}

        {step === 5 && (
          <Card className="p-8 space-y-6">
            <div className="space-y-2">
              <Badge variant="info">Step 5: Test & Activate</Badge>
              <h2 className="text-2xl font-bold text-white">Dry-Run Test Your Automation</h2>
              <p className="text-xs text-slate-400">Simulate an incoming Meta webhook event to verify trigger evaluation before going live.</p>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>SIMULATED INCOMING DM</span>
                <span>Keyword: &quot;{keyword}&quot;</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg text-slate-200">
                &quot;Hi @acmestudio, what is your {keyword}?&quot;
              </div>

              {testResult && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 space-y-1">
                  <div className="font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Trigger Matched & Condition Passed!</div>
                  <div className="text-[11px] text-slate-300">Outbound Reply: &quot;{replyText}&quot;</div>
                </div>
              )}
            </div>

            {!testResult ? (
              <Button
                variant="secondary"
                className="w-full"
                isLoading={isTesting}
                onClick={handleRunDryRunTest}
                leftIcon={<Play className="w-4 h-4 text-emerald-400" />}
              >
                Run Simulated Trigger Test
              </Button>
            ) : (
              <Button
                variant="primary"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/25"
                onClick={() => router.push('/app/dashboard')}
                rightIcon={<Sparkles className="w-4 h-4" />}
              >
                Activate Automation & Launch Dashboard
              </Button>
            )}
          </Card>
        )}
      </main>

      <footer className="text-center text-xs text-slate-500 py-4">
        POSTPILOT Commercial SaaS Infrastructure • Meta App Review Ready
      </footer>
    </div>
  );
}
