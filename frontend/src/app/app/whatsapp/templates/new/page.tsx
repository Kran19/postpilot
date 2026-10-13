'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  ArrowLeft, 
  Save, 
  Send, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  Phone, 
  CornerDownLeft, 
  Image as ImageIcon, 
  Video, 
  File,
  ShieldCheck
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { whatsappService } from '@/lib/services/whatsappService';
import { 
  WhatsAppTemplateCategory, 
  WhatsAppHeaderType, 
  WhatsAppTemplateButton 
} from '@/lib/types/whatsapp';

export default function CreateWhatsAppTemplatePage() {
  const router = useRouter();

  const [name, setName] = useState('shipping_tracking_notification');
  const [category, setCategory] = useState<WhatsAppTemplateCategory>('UTILITY');
  const [language, setLanguage] = useState('en_US');
  const [headerType, setHeaderType] = useState<WhatsAppHeaderType>('TEXT');
  const [headerText, setHeaderText] = useState('Acme Order Delivery Status');
  const [bodyText, setBodyText] = useState('Hello {{1}},\nYour order #{{2}} has been shipped via {{3}}. Track your package in real-time below.');
  const [footerText, setFooterText] = useState('PostPilot Verified Merchant');
  
  const [buttons, setButtons] = useState<WhatsAppTemplateButton[]>([
    { id: 'b1', type: 'URL', text: 'Track Order', url: 'https://track.postpilot.app/{{2}}' },
    { id: 'b2', type: 'QUICK_REPLY', text: 'Contact Support' }
  ]);

  // Test values for preview replacement
  const [sampleVar1, setSampleVar1] = useState('Rahul');
  const [sampleVar2, setSampleVar2] = useState('9812');
  const [sampleVar3, setSampleVar3] = useState('DHL Express');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddButton = () => {
    if (buttons.length >= 3) return;
    const newBtn: WhatsAppTemplateButton = {
      id: `btn-${Date.now()}`,
      type: 'QUICK_REPLY',
      text: `Action ${buttons.length + 1}`
    };
    setButtons([...buttons, newBtn]);
  };

  const handleRemoveButton = (id: string) => {
    setButtons(buttons.filter(b => b.id !== id));
  };

  const handleUpdateButton = (id: string, updates: Partial<WhatsAppTemplateButton>) => {
    setButtons(buttons.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const handleInsertVariable = (varNum: number) => {
    setBodyText(prev => `${prev} {{${varNum}}}`);
  };

  const handleSaveTemplate = (status: 'draft' | 'pending') => {
    setIsSubmitting(true);
    whatsappService.createTemplate({
      workspaceId: 'ws-acme',
      name: name.toLowerCase().replace(/\s+/g, '_'),
      category,
      language,
      status: status === 'pending' ? 'approved' : 'draft', // simulated approval
      headerType,
      headerContent: headerType === 'TEXT' ? headerText : undefined,
      bodyText,
      footerText,
      buttons,
      variables: ['{{1}}', '{{2}}', '{{3}}']
    }).then(() => {
      setIsSubmitting(false);
      router.push('/app/whatsapp/templates');
    });
  };

  return (
    <AppShell title="Create WhatsApp Template">
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <div className="flex items-center gap-3">
            <Link href="/app/whatsapp/templates">
              <button className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 transition cursor-pointer" aria-label="Back">
                <ArrowLeft className="w-4 h-4" />
              </button>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" /> WhatsApp Template Editor
                </h2>
                <span className="text-[10px] font-bold text-[#1E7E34] bg-[#EAF5EE] px-2 py-0.2 rounded-full">
                  Meta HSM Standards
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Configure header, body variables, and interactive buttons for Meta review.</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => handleSaveTemplate('draft')}
              disabled={isSubmitting}
              className="px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 text-xs font-bold transition shadow-2xs cursor-pointer"
            >
              Save as Draft
            </button>
            <button
              onClick={() => handleSaveTemplate('pending')}
              disabled={isSubmitting || !name.trim() || !bodyText.trim()}
              className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit to Meta for Approval</span>
            </button>
          </div>
        </div>

        {/* 2 Column Layout: Configurator (7 cols) + Realistic Phone Preview (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form Configurator */}
          <div className="lg:col-span-7 space-y-4">
            {/* Meta Category & Language */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">1. Basic Template Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Template Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. order_update_v1"
                    className="w-full bg-[#FAFAFA] border border-gray-200 text-xs rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as WhatsAppTemplateCategory)}
                    className="w-full bg-[#FAFAFA] border border-gray-200 text-xs text-gray-900 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="MARKETING">Marketing</option>
                    <option value="UTILITY">Utility</option>
                    <option value="AUTHENTICATION">Authentication</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-gray-200 text-xs text-gray-900 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="en_US">English (US)</option>
                    <option value="es">Spanish</option>
                    <option value="pt_BR">Portuguese (BR)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Header Settings */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">2. Header (Optional)</h3>
                <span className="text-[10px] text-gray-400">Adds bold headline or media atop the message</span>
              </div>

              <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
                {(['NONE', 'TEXT', 'IMAGE', 'VIDEO', 'DOCUMENT'] as WhatsAppHeaderType[]).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setHeaderType(t)}
                    className={`flex-1 py-1.5 px-2.5 rounded-lg transition cursor-pointer text-center text-xs shrink-0 ${
                      headerType === t ? 'bg-white text-gray-900 shadow-2xs font-bold' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {headerType === 'TEXT' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Header Title Text</label>
                  <input
                    type="text"
                    value={headerText}
                    onChange={(e) => setHeaderText(e.target.value)}
                    maxLength={60}
                    placeholder="e.g. Order Status Update"
                    className="w-full bg-[#FAFAFA] border border-gray-200 text-xs rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}
            </div>

            {/* Body Content with Dynamic Variable Tags */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">3. Body Content</h3>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-gray-500 font-semibold">Insert Variable:</span>
                  <button
                    type="button"
                    onClick={() => handleInsertVariable(1)}
                    className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold hover:bg-emerald-100 cursor-pointer"
                  >
                    {"{{1}}"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertVariable(2)}
                    className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold hover:bg-emerald-100 cursor-pointer"
                  >
                    {"{{2}}"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertVariable(3)}
                    className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold hover:bg-emerald-100 cursor-pointer"
                  >
                    {"{{3}}"}
                  </button>
                </div>
              </div>

              <textarea
                rows={4}
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
                maxLength={1024}
                placeholder="Enter template message text here. Use {{1}}, {{2}} for dynamic customer parameters."
                className="w-full bg-[#FAFAFA] border border-gray-200 text-xs rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 leading-relaxed"
              />

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Footer Text (Optional)</label>
                <input
                  type="text"
                  value={footerText}
                  onChange={(e) => setFooterText(e.target.value)}
                  maxLength={60}
                  placeholder="e.g. Reply STOP to unsubscribe"
                  className="w-full bg-[#FAFAFA] border border-gray-200 text-xs rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Interactive Buttons */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">4. Interactive Buttons (Max 3)</h3>
                {buttons.length < 3 && (
                  <button
                    type="button"
                    onClick={handleAddButton}
                    className="text-xs font-bold text-[#15803D] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Button</span>
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {buttons.map((b, idx) => (
                  <div key={b.id} className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-700">Button {idx + 1}</span>
                        <select
                          value={b.type}
                          onChange={(e) => handleUpdateButton(b.id, { type: e.target.value as any })}
                          className="bg-white border border-gray-200 text-xs rounded-lg px-2 py-1 text-gray-800"
                        >
                          <option value="QUICK_REPLY">Quick Reply</option>
                          <option value="URL">Call to Action (Website URL)</option>
                          <option value="PHONE_NUMBER">Call Phone Number</option>
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveButton(b.id)}
                        className="text-gray-400 hover:text-rose-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-gray-600 block mb-1">Button Text</label>
                        <input
                          type="text"
                          value={b.text}
                          onChange={(e) => handleUpdateButton(b.id, { text: e.target.value })}
                          className="w-full bg-white border border-gray-200 text-xs rounded-lg px-2.5 py-1.5"
                        />
                      </div>

                      {b.type === 'URL' && (
                        <div>
                          <label className="text-[10px] font-bold text-gray-600 block mb-1">Target URL</label>
                          <input
                            type="text"
                            value={b.url || ''}
                            onChange={(e) => handleUpdateButton(b.id, { url: e.target.value })}
                            placeholder="https://acmestudio.io/{{2}}"
                            className="w-full bg-white border border-gray-200 text-xs rounded-lg px-2.5 py-1.5 font-mono"
                          />
                        </div>
                      )}

                      {b.type === 'PHONE_NUMBER' && (
                        <div>
                          <label className="text-[10px] font-bold text-gray-600 block mb-1">Phone Number (E.164)</label>
                          <input
                            type="text"
                            value={b.phoneNumber || ''}
                            onChange={(e) => handleUpdateButton(b.id, { phoneNumber: e.target.value })}
                            placeholder="+18005550199"
                            className="w-full bg-white border border-gray-200 text-xs rounded-lg px-2.5 py-1.5 font-mono"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Realistic WhatsApp Phone Mockup & Variable Testers */}
          <div className="lg:col-span-5 space-y-4">
            {/* Phone Container */}
            <div className="bg-slate-900 rounded-3xl p-3 sm:p-4 shadow-xl border border-slate-800 text-white">
              {/* Phone Header Notch */}
              <div className="flex items-center justify-between px-3 py-1 text-[10px] text-slate-400 border-b border-slate-800 mb-2">
                <span>9:41</span>
                <div className="w-16 h-3.5 bg-slate-800 rounded-full" />
                <span>5G 100%</span>
              </div>

              {/* Chat Top Bar */}
              <div className="bg-[#1F2C34] p-3 rounded-2xl flex items-center justify-between mb-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center font-bold text-xs text-white">
                    A
                  </div>
                  <div>
                    <h4 className="font-bold text-white leading-tight">Acme Studio</h4>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#25D366]" /> Official Business Account
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Chat Canvas */}
              <div className="bg-[#EFEAE2] text-gray-900 p-3 sm:p-4 rounded-2xl min-h-[300px] flex flex-col justify-end space-y-2">
                {/* Outbound HSM Bubble */}
                <div className="bg-white rounded-2xl rounded-tl-xs p-3.5 shadow-sm space-y-2 text-xs border border-gray-200/80 max-w-[95%]">
                  {headerType === 'TEXT' && headerText && (
                    <h5 className="font-bold text-gray-900 text-xs leading-snug">{headerText}</h5>
                  )}

                  <p className="whitespace-pre-line leading-relaxed text-gray-800 font-medium">
                    {bodyText
                      .replace(/\{\{1\}\}/g, sampleVar1 || '{{1}}')
                      .replace(/\{\{2\}\}/g, sampleVar2 || '{{2}}')
                      .replace(/\{\{3\}\}/g, sampleVar3 || '{{3}}')}
                  </p>

                  {footerText && (
                    <p className="text-[10px] text-gray-400 pt-0.5">{footerText}</p>
                  )}

                  {buttons.length > 0 && (
                    <div className="pt-2 border-t border-gray-100 space-y-1.5">
                      {buttons.map(b => (
                        <div key={b.id} className="w-full text-center py-2 bg-[#F6F7F9] rounded-lg text-emerald-700 font-bold text-xs flex items-center justify-center gap-1">
                          {b.type === 'URL' && <ExternalLink className="w-3 h-3 text-emerald-600" />}
                          {b.type === 'PHONE_NUMBER' && <Phone className="w-3 h-3 text-emerald-600" />}
                          <span>{b.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Variable Test Values */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Live Preview Sample Values</h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <label className="text-[10px] text-gray-500 font-mono">{"{{1}}"}</label>
                  <input
                    type="text"
                    value={sampleVar1}
                    onChange={(e) => setSampleVar1(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-gray-200 text-xs rounded-lg px-2 py-1"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-mono">{"{{2}}"}</label>
                  <input
                    type="text"
                    value={sampleVar2}
                    onChange={(e) => setSampleVar2(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-gray-200 text-xs rounded-lg px-2 py-1"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-mono">{"{{3}}"}</label>
                  <input
                    type="text"
                    value={sampleVar3}
                    onChange={(e) => setSampleVar3(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-gray-200 text-xs rounded-lg px-2 py-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
