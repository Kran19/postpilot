'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bot, 
  ArrowLeft, 
  Save, 
  Play, 
  Plus, 
  Trash2, 
  Workflow, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  ShieldCheck, 
  Sliders,
  Send,
  Zap
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/icons/SocialIcons';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { automationService } from '@/lib/services/automationService';
import { ChannelType, TriggerType, ActionType, ConditionOperator } from '@/lib/types';

export default function AutomationBuilderPage() {
  const router = useRouter();

  const [ruleName, setRuleName] = useState('Instagram Price Inquiry Auto Reply');
  const [description, setDescription] = useState('Sends automated pricing DM when someone asks about PRICE or PRICING.');
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>('instagram');
  const [triggerType, setTriggerType] = useState<TriggerType>('ig_dm_received');
  
  const [conditionOperator, setConditionOperator] = useState<ConditionOperator>('contains');
  const [keyword, setKeyword] = useState('PRICE');

  const [actionType, setActionType] = useState<ActionType>('send_reply_dm');
  const [replyText, setReplyText] = useState('Hi! Our Pro plan starts at $49/mo. Check full pricing details: https://postpilot.app/pricing');
  const [tagToApply, setTagToApply] = useState('Lead: High Intent');

  const [simulatedInput, setSimulatedInput] = useState('Hi! How much is your PRICE for teams?');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationTrace, setSimulationTrace] = useState<{ step: string; status: 'pass' | 'fail'; time: string }[] | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationTrace(null);
    setTimeout(() => {
      setIsSimulating(false);
      const isMatch = simulatedInput.toUpperCase().includes(keyword.toUpperCase());
      if (isMatch) {
        setSimulationTrace([
          { step: `Meta Webhook Received (${selectedChannel.toUpperCase()})`, status: 'pass', time: '10:42:01.080' },
          { step: `Trigger Matched: ${triggerType}`, status: 'pass', time: '10:42:01.120' },
          { step: `Condition Evaluation: "${simulatedInput}" ${conditionOperator} "${keyword}"`, status: 'pass', time: '10:42:01.150' },
          { step: `Action Executed: ${actionType}`, status: 'pass', time: '10:42:01.310' },
          { step: `Tag Applied: "${tagToApply}"`, status: 'pass', time: '10:42:01.325' },
        ]);
      } else {
        setSimulationTrace([
          { step: `Meta Webhook Received (${selectedChannel.toUpperCase()})`, status: 'pass', time: '10:42:01.080' },
          { step: `Trigger Matched: ${triggerType}`, status: 'pass', time: '10:42:01.120' },
          { step: `Condition Evaluation: "${simulatedInput}" ${conditionOperator} "${keyword}"`, status: 'fail', time: '10:42:01.150' },
        ]);
      }
    }, 800);
  };

  const handleSaveRule = () => {
    setIsSaving(true);
    setTimeout(() => {
      automationService.createAutomation({
        workspaceId: 'ws-acme',
        name: ruleName,
        description,
        channel: selectedChannel,
        status: 'active',
        triggerType,
        triggerLabel: `${selectedChannel.toUpperCase()} Event`,
        conditions: [{ id: 'c1', field: 'message_text', operator: conditionOperator, value: keyword }],
        actions: [{ id: 'a1', type: actionType, payload: { text: replyText, tag: tagToApply } }],
      }).then(() => {
        setIsSaving(false);
        router.push('/app/automations');
      });
    }, 600);
  };

  return (
    <AppShell title="Workflow Builder" description="Interactive Visual Automation Flow Engine">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center gap-3">
            <Link href="/app/automations">
              <Button variant="ghost" size="sm" iconOnly>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Workflow className="w-4 h-4 text-indigo-400" /> {ruleName}
              </h2>
              <p className="text-xs text-slate-400">{description}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={handleRunSimulation} leftIcon={<Play className="w-3.5 h-3.5 text-emerald-400" />}>
              Dry-Run Test
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveRule} isLoading={isSaving} leftIcon={<Save className="w-3.5 h-3.5" />}>
              Save & Publish Rule
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative">
              <div className="p-6 bg-slate-900 border-2 border-indigo-500/50 rounded-2xl shadow-xl shadow-indigo-950/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                      1
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">TRIGGER NODE</span>
                      <h4 className="text-sm font-bold text-white">Meta Webhook Ingestion</h4>
                    </div>
                  </div>
                  <Badge variant={selectedChannel}>{selectedChannel.toUpperCase()}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Channel Platform"
                    value={selectedChannel}
                    onChange={(e) => setSelectedChannel(e.target.value as ChannelType)}
                    options={[
                      { label: 'Instagram', value: 'instagram' },
                      { label: 'Facebook Page', value: 'facebook' },
                      { label: 'WhatsApp WABA', value: 'whatsapp' },
                      { label: 'Threads', value: 'threads' },
                    ]}
                  />

                  <Select
                    label="Event Trigger Type"
                    value={triggerType}
                    onChange={(e) => setTriggerType(e.target.value as TriggerType)}
                    options={[
                      { label: 'Direct Message Received', value: 'ig_dm_received' },
                      { label: 'Post Comment Created', value: 'ig_comment_created' },
                      { label: 'Page Inbox Message', value: 'fb_message_received' },
                      { label: 'WhatsApp Message Ingest', value: 'wa_message_received' },
                    ]}
                  />
                </div>
              </div>

              <div className="flex justify-center my-3">
                <div className="w-0.5 h-8 bg-indigo-500/40 relative">
                  <div className="absolute bottom-0 -left-1 w-2.5 h-2.5 border-b-2 border-r-2 border-indigo-400 rotate-45" />
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="p-6 bg-slate-900 border-2 border-amber-500/40 rounded-2xl shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-xs">
                      2
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">CONDITION NODE</span>
                      <h4 className="text-sm font-bold text-white">Rule Filter Matcher</h4>
                    </div>
                  </div>
                  <Badge variant="warning">IF MATCHES</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Match Operator"
                    value={conditionOperator}
                    onChange={(e) => setConditionOperator(e.target.value as ConditionOperator)}
                    options={[
                      { label: 'Contains Keyword', value: 'contains' },
                      { label: 'Equals Exactly', value: 'equals' },
                      { label: 'Starts With', value: 'starts_with' },
                      { label: 'Regex Pattern Match', value: 'matches_regex' },
                    ]}
                  />

                  <Input
                    label="Target Keyword / String"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="e.g. PRICE"
                  />
                </div>
              </div>

              <div className="flex justify-center my-3">
                <div className="w-0.5 h-8 bg-amber-500/40 relative">
                  <div className="absolute bottom-0 -left-1 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-400 rotate-45" />
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900 border-2 border-emerald-500/40 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-xs">
                    3
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">ACTION NODE</span>
                    <h4 className="text-sm font-bold text-white">Outbound Meta Execution</h4>
                  </div>
                </div>
                <Badge variant="success">DISPATCH RESPONSE</Badge>
              </div>

              <div className="space-y-4">
                <Select
                  label="Execution Action Type"
                  value={actionType}
                  onChange={(e) => setActionType(e.target.value as ActionType)}
                  options={[
                    { label: 'Send Direct Message Reply', value: 'send_reply_dm' },
                    { label: 'Send Post Comment Private Reply', value: 'send_comment_reply' },
                    { label: 'Dispatch WhatsApp HSM Template', value: 'send_wa_template' },
                    { label: 'Assign Conversation to Agent', value: 'assign_to_agent' },
                  ]}
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Outbound DM Response Text Template
                  </label>
                  <textarea
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-lg text-sm p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                  />
                </div>

                <Input
                  label="Apply Customer Lead Tag"
                  value={tagToApply}
                  onChange={(e) => setTagToApply(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Dry-Run Execution Tester</h3>
              </div>

              <div className="space-y-3">
                <Input
                  label="Simulated Customer Input"
                  value={simulatedInput}
                  onChange={(e) => setSimulatedInput(e.target.value)}
                />

                <Button
                  variant="secondary"
                  className="w-full"
                  isLoading={isSimulating}
                  onClick={handleRunSimulation}
                  leftIcon={<Play className="w-4 h-4 text-emerald-400" />}
                >
                  Simulate Trigger Evaluation
                </Button>
              </div>

              {simulationTrace && (
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Step-by-Step Audit Trace
                  </span>
                  <div className="space-y-2 font-mono text-[11px]">
                    {simulationTrace.map((t, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-lg border flex items-center justify-between ${
                          t.status === 'pass'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                        }`}
                      >
                        <div>
                          <div className="font-bold flex items-center gap-1">
                            {t.status === 'pass' ? '✓' : '✕'} {t.step}
                          </div>
                        </div>
                        <span className="text-[10px] opacity-70 shrink-0">{t.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-6 space-y-3 bg-indigo-950/20 border-indigo-500/20">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-indigo-400" /> Meta Graph API Compliance Check
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                This rule strictly complies with Meta&apos;s 24-hour customer service messaging window. All outbound actions validate `X-Hub-Signature-256` HMAC signatures server-side.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
