'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Send, 
  Search, 
  Plus, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Eye, 
  Play, 
  Pause, 
  Calendar, 
  ArrowRight,
  Filter,
  FileText,
  X,
  Check
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { whatsappService } from '@/lib/services/whatsappService';
import { WhatsAppCampaign, WhatsAppTemplate } from '@/lib/types/whatsapp';

export default function WhatsAppCampaignsPage() {
  const [campaigns, setCampaigns] = useState<WhatsAppCampaign[]>([]);
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreating, setIsCreating] = useState(false);

  // Campaign Wizard State
  const [wizardStep, setWizardStep] = useState(1);
  const [campaignName, setCampaignName] = useState('');
  const [audienceType, setAudienceType] = useState<'all' | 'tag' | 'recency'>('tag');
  const [selectedTag, setSelectedTag] = useState('VIP Buyer');
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [scheduleType, setScheduleType] = useState<'now' | 'later'>('now');
  const [scheduleDate, setScheduleDate] = useState('2026-09-22T10:00');

  useEffect(() => {
    Promise.all([
      whatsappService.getCampaigns('ws-acme'),
      whatsappService.getTemplates('ws-acme')
    ]).then(([campData, tplData]) => {
      setCampaigns(campData);
      setTemplates(tplData.filter(t => t.status === 'approved'));
      if (tplData.length > 0) setSelectedTemplateId(tplData[0].id);
    });
  }, []);

  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.templateName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getEstimatedAudience = () => {
    if (audienceType === 'all') return 4850;
    if (selectedTag === 'VIP Buyer') return 1240;
    if (selectedTag === 'High Intent') return 890;
    return 650;
  };

  const handleLaunchCampaign = () => {
    const selectedTemplate = templates.find(t => t.id === selectedTemplateId);
    whatsappService.createCampaign({
      workspaceId: 'ws-acme',
      name: campaignName || 'Autumn WhatsApp Broadcast',
      templateId: selectedTemplateId,
      templateName: selectedTemplate?.name || 'welcome_discount_offer',
      audienceFilter: {
        allContacts: audienceType === 'all',
        tags: audienceType === 'tag' ? [selectedTag] : undefined
      },
      status: scheduleType === 'now' ? 'running' : 'scheduled',
      totalRecipients: getEstimatedAudience(),
      scheduledAt: scheduleType === 'later' ? scheduleDate : new Date().toISOString()
    }).then(newCamp => {
      setCampaigns(prev => [newCamp, ...prev]);
      setIsCreating(false);
      setWizardStep(1);
    });
  };

  return (
    <AppShell title="WhatsApp Campaigns">
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Top Header & CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900">WhatsApp Broadcast Campaigns</h2>
              <span className="text-xs font-bold text-[#15803D] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full border border-[#D0EADB]">
                {campaigns.length} Campaigns
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Send segmented WhatsApp marketing dispatches & announcements to targeted customer audiences.
            </p>
          </div>

          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2.5 rounded-xl bg-black text-white hover:bg-gray-800 text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Broadcast Campaign</span>
          </button>
        </div>

        {/* Filters Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns by name, template..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAFAFA] border border-gray-200 text-xs rounded-xl pl-9 pr-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            />
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#FAFAFA] border border-gray-200 text-xs text-gray-700 rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">All Campaign Statuses</option>
              <option value="running">Running</option>
              <option value="completed">Completed</option>
              <option value="scheduled">Scheduled</option>
              <option value="draft">Draft</option>
              <option value="paused">Paused</option>
            </select>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFDFB] border-b border-gray-100 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Campaign Name</th>
                  <th className="py-3.5 px-4">Template Used</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Audience</th>
                  <th className="py-3.5 px-4">Delivery Rate</th>
                  <th className="py-3.5 px-4">Replies</th>
                  <th className="py-3.5 px-4">Scheduled / Sent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                {filteredCampaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FAFAFA] transition">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-bold text-gray-900 leading-tight">{c.name}</div>
                      <span className="text-[10px] text-gray-400 font-mono">ID: {c.id}</span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="text-[11px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        {c.templateName}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                        c.status === 'completed' ? 'bg-[#EAF5EE] text-[#1E7E34] border border-[#D0EADB]' :
                        c.status === 'running' ? 'bg-emerald-100 text-emerald-800 animate-pulse' :
                        c.status === 'scheduled' ? 'bg-sky-50 text-sky-800 border border-sky-200' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {c.status === 'completed' && <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />}
                        {c.status === 'scheduled' && <Calendar className="w-3 h-3 text-sky-600" />}
                        <span>{c.status}</span>
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-bold text-gray-900">{c.totalRecipients.toLocaleString()}</span>
                      <span className="text-gray-400 text-[10px] ml-1">contacts</span>
                    </td>

                    <td className="py-4 px-4">
                      {c.deliveredCount > 0 ? (
                        <div>
                          <span className="font-bold text-gray-900">
                            {((c.deliveredCount / c.totalRecipients) * 100).toFixed(1)}%
                          </span>
                          <span className="text-[10px] text-gray-400 block font-mono">
                            {c.deliveredCount.toLocaleString()} / {c.totalRecipients.toLocaleString()}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400 font-mono">--</span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-bold text-emerald-700">{c.repliesCount.toLocaleString()}</span>
                      <span className="text-gray-400 text-[10px] ml-1">replies</span>
                    </td>

                    <td className="py-4 px-4 text-gray-400 font-mono text-[11px]">
                      {c.scheduledAt ? new Date(c.scheduledAt).toLocaleString() : 'Immediate'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Multi-Step Create Campaign Wizard Modal */}
        {isCreating && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-xl w-full p-6 space-y-5 relative">
              {/* Wizard Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Create WhatsApp Campaign</h3>
                  <span className="text-xs text-gray-500">Step {wizardStep} of 4</span>
                </div>
                <button 
                  onClick={() => setIsCreating(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map(s => (
                  <div key={s} className={`h-1 flex-1 rounded-full ${s <= wizardStep ? 'bg-black' : 'bg-gray-200'}`} />
                ))}
              </div>

              {/* STEP 1: Details */}
              {wizardStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Campaign Title</label>
                    <input
                      type="text"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      placeholder="e.g. VIP Autumn Flash Sale Broadcast"
                      className="w-full bg-[#FAFAFA] border border-gray-200 text-xs rounded-xl px-3 py-2.5 text-gray-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Select Audience Segment</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 bg-[#FAFAFA] cursor-pointer">
                        <input
                          type="radio"
                          name="audType"
                          checked={audienceType === 'tag'}
                          onChange={() => setAudienceType('tag')}
                          className="accent-black"
                        />
                        <div>
                          <span className="text-xs font-bold text-gray-900 block">Filtered by CRM Tag</span>
                          <span className="text-[11px] text-gray-500">Target VIP buyers, newsletter subscribers, or leads.</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 bg-[#FAFAFA] cursor-pointer">
                        <input
                          type="radio"
                          name="audType"
                          checked={audienceType === 'all'}
                          onChange={() => setAudienceType('all')}
                          className="accent-black"
                        />
                        <div>
                          <span className="text-xs font-bold text-gray-900 block">All Verified Contacts</span>
                          <span className="text-[11px] text-gray-500">Broadcast to all contacts with active WhatsApp consent.</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {audienceType === 'tag' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Select Tag</label>
                      <select
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                        className="w-full bg-[#FAFAFA] border border-gray-200 text-xs text-gray-900 rounded-xl px-3 py-2"
                      >
                        <option value="VIP Buyer">VIP Buyer (1,240 contacts)</option>
                        <option value="High Intent">High Intent (890 contacts)</option>
                        <option value="Wholesale">Wholesale (420 contacts)</option>
                      </select>
                    </div>
                  )}

                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-950">Estimated Audience:</span>
                    <span className="text-sm font-extrabold text-[#15803D]">{getEstimatedAudience().toLocaleString()} Recipients</span>
                  </div>

                  <button
                    onClick={() => setWizardStep(2)}
                    className="w-full py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition"
                  >
                    Next: Select Template &rarr;
                  </button>
                </div>
              )}

              {/* STEP 2: Template Selection */}
              {wizardStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Select Approved WhatsApp Template</label>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {templates.map(t => (
                        <div
                          key={t.id}
                          onClick={() => setSelectedTemplateId(t.id)}
                          className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                            selectedTemplateId === t.id
                              ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-200'
                              : 'bg-[#FAFAFA] border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div>
                            <h4 className="text-xs font-bold text-gray-900">{t.name}</h4>
                            <span className="text-[10px] text-gray-500 font-mono">{t.category} • {t.language}</span>
                          </div>
                          {selectedTemplateId === t.id && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setWizardStep(1)}
                      className="w-1/3 py-2.5 rounded-xl border border-gray-200 text-xs font-bold hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setWizardStep(3)}
                      className="w-2/3 py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition"
                    >
                      Next: Schedule &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Schedule */}
              {wizardStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">When should this campaign be sent?</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 bg-[#FAFAFA] cursor-pointer">
                        <input
                          type="radio"
                          name="schedType"
                          checked={scheduleType === 'now'}
                          onChange={() => setScheduleType('now')}
                          className="accent-black"
                        />
                        <div>
                          <span className="text-xs font-bold text-gray-900 block">Send Immediately</span>
                          <span className="text-[11px] text-gray-500">Dispatch in batches conforming to Meta rate limits.</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 bg-[#FAFAFA] cursor-pointer">
                        <input
                          type="radio"
                          name="schedType"
                          checked={scheduleType === 'later'}
                          onChange={() => setScheduleType('later')}
                          className="accent-black"
                        />
                        <div>
                          <span className="text-xs font-bold text-gray-900 block">Schedule for Later</span>
                          <span className="text-[11px] text-gray-500">Automatically broadcast at the scheduled time.</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {scheduleType === 'later' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Target Date & Time (EST)</label>
                      <input
                        type="datetime-local"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        className="w-full bg-[#FAFAFA] border border-gray-200 text-xs rounded-xl px-3 py-2"
                      />
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => setWizardStep(2)}
                      className="w-1/3 py-2.5 rounded-xl border border-gray-200 text-xs font-bold hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setWizardStep(4)}
                      className="w-2/3 py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition"
                    >
                      Next: Review & Confirm &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Review & Confirmation */}
              {wizardStep === 4 && (
                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-xl space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Campaign Name:</span>
                      <strong className="text-gray-900">{campaignName || 'Autumn WhatsApp Broadcast'}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Audience:</span>
                      <strong className="text-gray-900">{getEstimatedAudience().toLocaleString()} Recipients</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Template:</span>
                      <strong className="text-indigo-700 font-mono">
                        {templates.find(t => t.id === selectedTemplateId)?.name || 'welcome_discount_offer'}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Timing:</span>
                      <strong className="text-emerald-700">
                        {scheduleType === 'now' ? 'Immediate Dispatch' : new Date(scheduleDate).toLocaleString()}
                      </strong>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setWizardStep(3)}
                      className="w-1/3 py-2.5 rounded-xl border border-gray-200 text-xs font-bold hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleLaunchCampaign}
                      className="w-2/3 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Launch Broadcast</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
