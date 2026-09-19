'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  GitBranch, 
  Search, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Bot, 
  Layers, 
  UserCheck, 
  Sliders, 
  FileText, 
  Play,
  X,
  MessageSquare
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { whatsappService } from '@/lib/services/whatsappService';
import { WhatsAppFlow } from '@/lib/types/whatsapp';

export default function WhatsAppFlowsPage() {
  const [flows, setFlows] = useState<WhatsAppFlow[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFlow, setSelectedFlow] = useState<WhatsAppFlow | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newFlowName, setNewFlowName] = useState('');
  const [newFlowCategory, setNewFlowCategory] = useState<'booking' | 'inquiry' | 'feedback' | 'lead_gen' | 'custom'>('booking');
  const [newFlowDescription, setNewFlowDescription] = useState('');

  useEffect(() => {
    whatsappService.getFlows('ws-acme').then(data => {
      setFlows(data);
      if (data.length > 0) setSelectedFlow(data[0]);
    });
  }, []);

  const filteredFlows = flows.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateFlow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFlowName.trim()) return;

    whatsappService.createFlow({
      workspaceId: 'ws-acme',
      name: newFlowName,
      description: newFlowDescription || 'Custom interactive WhatsApp customer journey.',
      status: 'published',
      category: newFlowCategory,
      nodes: [
        { id: 'n1', title: 'Start Screen', type: 'select', description: 'User selects initial pathway' },
        { id: 'n2', title: 'Data Capture', type: 'text_input', description: 'Collects user response' },
        { id: 'n3', title: 'Outcome & Confirmation', type: 'confirmation', description: 'Completes action & notifies team' }
      ]
    }).then(newF => {
      setFlows(prev => [newF, ...prev]);
      setSelectedFlow(newF);
      setIsCreating(false);
      setNewFlowName('');
      setNewFlowDescription('');
    });
  };

  return (
    <AppShell title="WhatsApp Flows">
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900">WhatsApp Interactive Flows</h2>
              <span className="text-xs font-bold text-[#15803D] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full border border-[#D0EADB]">
                {flows.length} Structured Flows
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Build structured in-app forms, appointment booking, and product configurators directly inside WhatsApp.
            </p>
          </div>

          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2.5 rounded-xl bg-black text-white hover:bg-gray-800 text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create WhatsApp Flow</span>
          </button>
        </div>

        {/* 2-Column Layout: Flow Catalog (5 cols) + Visual Step Inspector (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Flow List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search flows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 text-xs rounded-xl pl-9 pr-3 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2.5">
              {filteredFlows.map(flow => {
                const isSelected = selectedFlow?.id === flow.id;
                return (
                  <div
                    key={flow.id}
                    onClick={() => setSelectedFlow(flow)}
                    className={`p-4 rounded-2xl border transition cursor-pointer space-y-2.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-emerald-50/80 to-teal-50/50 border-emerald-400 shadow-xs ring-1 ring-emerald-300'
                        : 'bg-white border-gray-200/90 hover:border-gray-300 hover:bg-[#FAFAFA]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#EAF5EE] text-[#1E7E34] flex items-center justify-center font-bold">
                          <GitBranch className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="text-xs font-bold text-gray-900 leading-tight">{flow.name}</h4>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full uppercase">
                        {flow.status}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{flow.description}</p>

                    <div className="flex items-center justify-between text-[11px] pt-1 text-gray-400 border-t border-gray-100/80 font-medium">
                      <span>{flow.totalSessions.toLocaleString()} completed sessions</span>
                      <span className="text-emerald-700 font-bold">{flow.completionRate}% completion</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Flow Step Visualizer */}
          {selectedFlow && (
            <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-900">{selectedFlow.name}</h3>
                    <span className="text-[10px] font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full capitalize">
                      {selectedFlow.category} Flow
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{selectedFlow.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    Live Active
                  </span>
                </div>
              </div>

              {/* Node Sequence Steps */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Interactive Screen Steps Sequence</h4>

                <div className="space-y-3">
                  {selectedFlow.nodes.map((node, index) => (
                    <div key={node.id} className="relative">
                      {index > 0 && (
                        <div className="w-0.5 h-3 bg-emerald-400 mx-auto -my-1" />
                      )}

                      <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/90 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center">
                              {index + 1}
                            </span>
                            <h5 className="text-xs font-bold text-gray-900">{node.title}</h5>
                          </div>
                          <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.2 rounded">
                            {node.type.toUpperCase()}
                          </span>
                        </div>
                        {node.description && (
                          <p className="text-xs text-gray-600 pl-7">{node.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Banner */}
              <div className="p-4 rounded-xl bg-[#FAFDFB] border border-[#D0EADB] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#1E7E34]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="font-bold">Attached to Trigger: Keyword Match</span>
                </div>
                <Link href="/app/whatsapp/automations/new" className="font-bold text-[#15803D] hover:underline flex items-center gap-1">
                  <span>View Automation Flow</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Create Flow Modal */}
        {isCreating && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-sm font-bold text-gray-900">Create New WhatsApp Flow</h3>
                <button onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-gray-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateFlow} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Flow Name</label>
                  <input
                    type="text"
                    value={newFlowName}
                    onChange={(e) => setNewFlowName(e.target.value)}
                    placeholder="e.g. VIP Consultation Booking"
                    className="w-full bg-[#FAFAFA] border border-gray-200 text-xs rounded-xl px-3 py-2 text-gray-900 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={newFlowCategory}
                    onChange={(e) => setNewFlowCategory(e.target.value as any)}
                    className="w-full bg-[#FAFAFA] border border-gray-200 text-xs text-gray-900 rounded-xl px-3 py-2"
                  >
                    <option value="booking">Appointment / Booking</option>
                    <option value="inquiry">Product & Pricing Inquiry</option>
                    <option value="lead_gen">Lead Capture & Qualification</option>
                    <option value="feedback">Customer NPS & Feedback</option>
                    <option value="custom">Custom Multi-Step Flow</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={newFlowDescription}
                    onChange={(e) => setNewFlowDescription(e.target.value)}
                    placeholder="Describe what this structured flow accomplishes..."
                    className="w-full bg-[#FAFAFA] border border-gray-200 text-xs rounded-xl p-3 text-gray-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-black text-white font-bold text-xs rounded-xl hover:bg-gray-800 transition"
                >
                  Create & Open Screen Builder
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
