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
  Zap, 
  Clock, 
  Check, 
  AlertCircle,
  FileText,
  PhoneCall,
  Tag,
  UserCheck
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { INITIAL_WHATSAPP_TEMPLATES } from '@/lib/services/whatsappService';

export default function WhatsAppAutomationBuilderPage() {
  const router = useRouter();

  const [ruleName, setRuleName] = useState('WhatsApp Order Status & Instant Tracking');
  const [description, setDescription] = useState('Sends pre-approved order tracking template when customer sends keyword ORDER or tracking number.');
  
  // WhatsApp Specific Trigger
  const [triggerType, setTriggerType] = useState('wa_keyword_match');
  const [keyword, setKeyword] = useState('ORDER');

  // WhatsApp Conditions
  const [conditionField, setConditionField] = useState('message_text');
  const [conditionOperator, setConditionOperator] = useState('contains');
  const [checkBusinessHours, setCheckBusinessHours] = useState(false);
  const [check24hWindow, setCheck24hWindow] = useState(true);

  // WhatsApp Actions
  const [actionCategory, setActionCategory] = useState<'template' | 'text' | 'buttons' | 'handoff'>('template');
  const [selectedTemplateId, setSelectedTemplateId] = useState('tpl-wa-1');
  const [varParam1, setVarParam1] = useState('Rahul');
  const [varParam2, setVarParam2] = useState('9812');
  const [varParam3, setVarParam3] = useState('DHL Express');
  const [freeformText, setFreeformText] = useState('Hello! Your order is being processed by our automated system.');
  const [tagToApply, setTagToApply] = useState('Order Tracked');
  const [assigneeAgent, setAssigneeAgent] = useState('Alex Morgan');

  // Simulation State
  const [simulatedInput, setSimulatedInput] = useState('Hi! What is the status of my ORDER #9812?');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationTrace, setSimulationTrace] = useState<{ step: string; status: 'pass' | 'fail'; time: string; detail?: string }[] | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const selectedTemplate = INITIAL_WHATSAPP_TEMPLATES.find(t => t.id === selectedTemplateId) || INITIAL_WHATSAPP_TEMPLATES[0];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationTrace(null);
    setTimeout(() => {
      setIsSimulating(false);
      const isMatch = simulatedInput.toUpperCase().includes(keyword.toUpperCase());
      
      if (isMatch) {
        setSimulationTrace([
          { step: 'Meta Cloud API Webhook Received', status: 'pass', time: '10:42:01.010', detail: 'Signature X-Hub-Signature-256 verified' },
          { step: `Trigger Matched: ${triggerType}`, status: 'pass', time: '10:42:01.035', detail: `Detected keyword: "${keyword}"` },
          { step: 'Meta 24-Hour Messaging Window Check', status: 'pass', time: '10:42:01.045', detail: 'Inbound message creates active 24h conversation window' },
          { step: `Action Executed: Send Template (${selectedTemplate.name})`, status: 'pass', time: '10:42:01.120', detail: `Injected variables: [${varParam1}, ${varParam2}, ${varParam3}]` },
          { step: `Applied CRM Tag: "${tagToApply}"`, status: 'pass', time: '10:42:01.135' }
        ]);
      } else {
        setSimulationTrace([
          { step: 'Meta Cloud API Webhook Received', status: 'pass', time: '10:42:01.010', detail: 'Signature verified' },
          { step: `Trigger Evaluated: ${triggerType}`, status: 'fail', time: '10:42:01.035', detail: `Message "${simulatedInput}" does not contain "${keyword}"` },
        ]);
      }
    }, 700);
  };

  const handleSaveRule = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      router.push('/app/whatsapp/automations');
    }, 600);
  };

  return (
    <AppShell title="WhatsApp Workflow Builder">
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <div className="flex items-center gap-3">
            <Link href="/app/whatsapp/automations">
              <button className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 transition cursor-pointer" aria-label="Back">
                <ArrowLeft className="w-4 h-4" />
              </button>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#16A34A] fill-[#16A34A]" /> {ruleName}
                </h2>
                <span className="text-[10px] font-bold text-[#1E7E34] bg-[#EAF5EE] px-2 py-0.2 rounded-full">
                  WhatsApp Cloud API
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 text-xs font-bold transition shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-[#16A34A] fill-[#16A34A]" />
              <span>{isSimulating ? 'Testing...' : 'Dry-Run Test'}</span>
            </button>
            <button
              onClick={handleSaveRule}
              disabled={isSaving}
              className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Publishing...' : 'Save & Publish Flow'}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Builder Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Visual Node Flow (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Metadata Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Flow Metadata</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Automation Name</label>
                  <input
                    type="text"
                    value={ruleName}
                    onChange={(e) => setRuleName(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-gray-200 text-xs rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-gray-200 text-xs rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* NODE 1: TRIGGER */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
              <div className="bg-[#FAFDFB] border-b border-gray-100 p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#EAF5EE] text-[#1E7E34] flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <span className="text-xs font-bold text-gray-900">TRIGGER: Inbound WhatsApp Event</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Entry Point
                </span>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Select WhatsApp Trigger Type</label>
                  <select
                    value={triggerType}
                    onChange={(e) => setTriggerType(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-gray-200 text-xs text-gray-900 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="wa_keyword_match">Keyword Match (Exact or Contains)</option>
                    <option value="wa_message_received">Any Inbound Customer Message</option>
                    <option value="wa_button_click">Interactive Quick Reply Button Click</option>
                    <option value="wa_list_select">Interactive List Menu Selection</option>
                    <option value="wa_template_interaction">WhatsApp Template Response</option>
                    <option value="wa_new_contact">New Contact First Interaction</option>
                    <option value="wa_order_event">Order / Checkout Webhook Event</option>
                  </select>
                </div>

                {triggerType === 'wa_keyword_match' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Trigger Keywords (Comma separated)</label>
                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="e.g. ORDER, TRACK, STATUS"
                      className="w-full bg-[#FAFAFA] border border-gray-200 text-xs rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Connecting Connector Arrow */}
            <div className="flex justify-center -my-2">
              <div className="w-0.5 h-6 bg-emerald-400" />
            </div>

            {/* NODE 2: CONDITIONS & POLICY CHECK */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
              <div className="bg-[#FAFDFB] border-b border-gray-100 p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <span className="text-xs font-bold text-gray-900">CONDITIONS: Policy & Routing Filters</span>
                </div>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                  Filters
                </span>
              </div>

              <div className="p-5 space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Field to Inspect</label>
                    <select
                      value={conditionField}
                      onChange={(e) => setConditionField(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-gray-200 text-xs text-gray-900 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="message_text">Inbound Message Text</option>
                      <option value="customer_tag">Customer CRM Tag</option>
                      <option value="phone_number">Customer Country / Code</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Operator</label>
                    <select
                      value={conditionOperator}
                      onChange={(e) => setConditionOperator(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-gray-200 text-xs text-gray-900 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="contains">Contains (Case Insensitive)</option>
                      <option value="equals">Exact Match</option>
                      <option value="starts_with">Starts With</option>
                      <option value="regex">Matches Regex</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 pt-1 border-t border-gray-100 text-xs">
                  <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={check24hWindow}
                      onChange={(e) => setCheck24hWindow(e.target.checked)}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Enforce Meta 24-Hour Messaging Window Compliance</span>
                  </label>
                  <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checkBusinessHours}
                      onChange={(e) => setCheckBusinessHours(e.target.checked)}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Only execute during active Business Hours (9:00 AM - 6:00 PM EST)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Connecting Connector Arrow */}
            <div className="flex justify-center -my-2">
              <div className="w-0.5 h-6 bg-emerald-400" />
            </div>

            {/* NODE 3: ACTION DISPATCH */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
              <div className="bg-[#FAFDFB] border-b border-gray-100 p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#EAF5EE] text-[#1E7E34] flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <span className="text-xs font-bold text-gray-900">ACTION: WhatsApp Response & CRM Step</span>
                </div>
                <span className="text-[10px] font-bold text-[#1E7E34] bg-[#EAF5EE] px-2 py-0.5 rounded-full">
                  Dispatch
                </span>
              </div>

              <div className="p-5 space-y-4">
                {/* Action Type Selector */}
                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => setActionCategory('template')}
                    className={`flex-1 py-1.5 px-3 rounded-lg transition cursor-pointer text-center shrink-0 ${
                      actionCategory === 'template' ? 'bg-white text-gray-900 shadow-2xs font-bold' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    WhatsApp Template (HSM)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActionCategory('text')}
                    className={`flex-1 py-1.5 px-3 rounded-lg transition cursor-pointer text-center shrink-0 ${
                      actionCategory === 'text' ? 'bg-white text-gray-900 shadow-2xs font-bold' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Direct Message (Text)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActionCategory('handoff')}
                    className={`flex-1 py-1.5 px-3 rounded-lg transition cursor-pointer text-center shrink-0 ${
                      actionCategory === 'handoff' ? 'bg-white text-gray-900 shadow-2xs font-bold' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Transfer to Human
                  </button>
                </div>

                {/* Template Selection Mode */}
                {actionCategory === 'template' && (
                  <div className="space-y-3 p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Select Approved Template</label>
                      <select
                        value={selectedTemplateId}
                        onChange={(e) => setSelectedTemplateId(e.target.value)}
                        className="w-full bg-white border border-gray-200 text-xs text-gray-900 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                      >
                        {INITIAL_WHATSAPP_TEMPLATES.map(t => (
                          <option key={t.id} value={t.id}>{t.name} ({t.category} - {t.status.toUpperCase()})</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-gray-700 block">Dynamic Variable Parameters:</span>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-[10px] text-gray-500 font-mono">{"{{1}}"} (Customer Name)</label>
                          <input
                            type="text"
                            value={varParam1}
                            onChange={(e) => setVarParam1(e.target.value)}
                            className="w-full bg-white border border-gray-200 text-xs rounded-lg px-2.5 py-1.5"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-500 font-mono">{"{{2}}"} (Order Number)</label>
                          <input
                            type="text"
                            value={varParam2}
                            onChange={(e) => setVarParam2(e.target.value)}
                            className="w-full bg-white border border-gray-200 text-xs rounded-lg px-2.5 py-1.5"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-500 font-mono">{"{{3}}"} (Carrier / Code)</label>
                          <input
                            type="text"
                            value={varParam3}
                            onChange={(e) => setVarParam3(e.target.value)}
                            className="w-full bg-white border border-gray-200 text-xs rounded-lg px-2.5 py-1.5"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Freeform Text Mode */}
                {actionCategory === 'text' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Message Content (24h window active)</label>
                    <textarea
                      rows={3}
                      value={freeformText}
                      onChange={(e) => setFreeformText(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-gray-200 text-xs rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                )}

                {/* Handoff Mode */}
                {actionCategory === 'handoff' && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2 text-xs text-amber-900">
                    <span className="font-bold flex items-center gap-1.5">
                      <PhoneCall className="w-4 h-4 text-amber-700" /> Assign to Support Operator
                    </span>
                    <p className="text-[11px] text-amber-800 leading-normal">
                      Pauses bot responses for 2 hours and assigns this thread to the selected team agent.
                    </p>
                    <select
                      value={assigneeAgent}
                      onChange={(e) => setAssigneeAgent(e.target.value)}
                      className="w-full bg-white border border-amber-300 text-xs text-gray-900 rounded-xl px-3 py-2 mt-1"
                    >
                      <option value="Alex Morgan">Alex Morgan (Senior Support)</option>
                      <option value="Sarah Jenkins">Sarah Jenkins (Sales Lead)</option>
                    </select>
                  </div>
                )}

                {/* CRM Tagging */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Apply Contact Tag</label>
                  <input
                    type="text"
                    value={tagToApply}
                    onChange={(e) => setTagToApply(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-gray-200 text-xs rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dry-Run Interactive Simulation & Trace (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Simulator Box */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Live Simulator</h3>
                  <p className="text-xs text-gray-500">Test automation logic against webhook payload</p>
                </div>
                <div className="w-7 h-7 rounded-lg bg-[#EAF5EE] text-[#1E7E34] flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-[#1E7E34]" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Simulated Incoming WhatsApp Message</label>
                <input
                  type="text"
                  value={simulatedInput}
                  onChange={(e) => setSimulatedInput(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-gray-200 text-xs rounded-xl px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
                />
              </div>

              <button
                type="button"
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="w-full py-2.5 rounded-xl bg-[#1D3B2A] hover:bg-[#162F22] text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isSimulating ? 'Executing Simulation...' : 'Run Simulation'}</span>
              </button>
            </div>

            {/* Execution Trace Feed */}
            {simulationTrace && (
              <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Execution Step Trace</h4>
                  <span className="text-[10px] text-gray-400 font-mono">Meta Graph v20.0</span>
                </div>

                <div className="space-y-2.5">
                  {simulationTrace.map((t, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 flex items-center gap-1.5">
                          {t.status === 'pass' ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          )}
                          <span>{t.step}</span>
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">{t.time}</span>
                      </div>
                      {t.detail && (
                        <p className="text-[11px] text-gray-500 pl-5 font-mono">{t.detail}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WhatsApp Message Preview Card */}
            <div className="bg-[#EFEAE2] rounded-2xl border border-[#D9D2C7] p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-600 font-semibold border-b border-[#DFD8CC] pb-2">
                <span>WhatsApp Customer Preview</span>
                <span className="text-[10px] text-emerald-800 font-bold bg-[#D4E8DA] px-2 py-0.2 rounded">Live</span>
              </div>

              {actionCategory === 'template' ? (
                <div className="bg-white rounded-2xl rounded-tl-xs p-3.5 shadow-xs space-y-2 text-xs text-gray-900 border border-gray-200/60 max-w-[95%]">
                  {selectedTemplate.headerType === 'TEXT' && (
                    <h5 className="font-bold text-gray-900 leading-tight">{selectedTemplate.headerContent}</h5>
                  )}
                  <p className="whitespace-pre-line leading-relaxed text-gray-800">
                    {selectedTemplate.bodyText
                      .replace('{{1}}', varParam1)
                      .replace('{{2}}', varParam2)
                      .replace('{{3}}', varParam3)}
                  </p>
                  {selectedTemplate.footerText && (
                    <p className="text-[10px] text-gray-400">{selectedTemplate.footerText}</p>
                  )}

                  {selectedTemplate.buttons.length > 0 && (
                    <div className="pt-2 border-t border-gray-100 space-y-1.5">
                      {selectedTemplate.buttons.map(b => (
                        <div key={b.id} className="w-full text-center py-1.5 bg-[#F6F7F9] rounded-lg text-emerald-700 font-bold text-xs">
                          {b.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-2xl rounded-tl-xs p-3.5 shadow-xs space-y-1 text-xs text-gray-900 border border-gray-200/60 max-w-[95%]">
                  <p className="leading-relaxed">{freeformText}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
