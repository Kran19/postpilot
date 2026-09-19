'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Play, 
  Pause, 
  Copy, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Sparkles,
  Sliders,
  Check,
  ChevronDown
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';

interface WhatsAppAutomationItem {
  id: string;
  name: string;
  description: string;
  triggerType: string;
  triggerLabel: string;
  status: 'active' | 'paused' | 'draft';
  runs: number;
  successRate: number;
  lastRun: string;
}

const INITIAL_WA_AUTOMATIONS: WhatsAppAutomationItem[] = [
  {
    id: 'wa-auto-1',
    name: 'Order Status & Tracking Dispatcher',
    description: 'When customer sends "ORDER" or mentions order ID, lookup status and send tracking link.',
    triggerType: 'keyword',
    triggerLabel: 'Keyword: "ORDER", "STATUS"',
    status: 'active',
    runs: 3120,
    successRate: 97.8,
    lastRun: '2 mins ago'
  },
  {
    id: 'wa-auto-2',
    name: 'Welcome Flow & Discount Code',
    description: 'Automatically greets first-time WhatsApp contacts with a 15% discount coupon code.',
    triggerType: 'new_contact',
    triggerLabel: 'New Contact First Message',
    status: 'active',
    runs: 1840,
    successRate: 99.1,
    lastRun: '14 mins ago'
  },
  {
    id: 'wa-auto-3',
    name: 'Lead Qualification & Consultation Booking',
    description: 'Evaluates buyer budget and auto-schedules Zoom consultation via interactive buttons.',
    triggerType: 'keyword',
    triggerLabel: 'Keyword: "DEMO", "PRICING"',
    status: 'paused',
    runs: 920,
    successRate: 96.4,
    lastRun: '2 days ago'
  },
  {
    id: 'wa-auto-4',
    name: 'Abandoned Cart WhatsApp Recovery',
    description: 'Sends pre-approved HSM template with dynamic product image 1 hour after checkout abandonment.',
    triggerType: 'order_event',
    triggerLabel: 'Event: Checkout Abandoned',
    status: 'active',
    runs: 450,
    successRate: 94.2,
    lastRun: '3 hours ago'
  }
];

export default function WhatsAppAutomationsPage() {
  const [automations, setAutomations] = useState<WhatsAppAutomationItem[]>(INITIAL_WA_AUTOMATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused'>('all');
  const [triggerFilter, setTriggerFilter] = useState<string>('all');

  const filteredAutomations = automations.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesTrigger = triggerFilter === 'all' || item.triggerType === triggerFilter;
    return matchesSearch && matchesStatus && matchesTrigger;
  });

  const toggleStatus = (id: string) => {
    setAutomations(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, status: a.status === 'active' ? 'paused' : 'active' };
      }
      return a;
    }));
  };

  const deleteAutomation = (id: string) => {
    setAutomations(prev => prev.filter(a => a.id !== id));
  };

  return (
    <AppShell title="WhatsApp Automations">
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Top Header & Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900">WhatsApp Automation Rules</h2>
              <span className="text-xs font-bold text-[#15803D] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full border border-[#D0EADB]">
                {automations.length} Active Rules
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Automate inbound message responses, keyword triggers, and interactive WhatsApp Flows.
            </p>
          </div>

          <Link href="/app/whatsapp/automations/new">
            <button className="px-4 py-2.5 rounded-xl bg-black text-white hover:bg-gray-800 text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer">
              <Plus className="w-4 h-4" />
              <span>Create WhatsApp Automation</span>
            </button>
          </Link>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search automations, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAFAFA] border border-gray-200 text-xs rounded-xl pl-9 pr-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            />
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto overflow-x-auto">
            {/* Status Filter */}
            <div className="flex items-center bg-gray-100 p-0.5 rounded-xl text-xs font-semibold shrink-0">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  statusFilter === 'all' ? 'bg-white text-gray-900 shadow-2xs font-bold' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('active')}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  statusFilter === 'active' ? 'bg-white text-[#15803D] shadow-2xs font-bold' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setStatusFilter('paused')}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  statusFilter === 'paused' ? 'bg-white text-amber-700 shadow-2xs font-bold' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Paused
              </button>
            </div>

            {/* Trigger Filter */}
            <select
              value={triggerFilter}
              onChange={(e) => setTriggerFilter(e.target.value)}
              className="bg-[#FAFAFA] border border-gray-200 text-xs text-gray-700 rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer shrink-0"
            >
              <option value="all">All Triggers</option>
              <option value="keyword">Keyword Triggers</option>
              <option value="new_contact">New Contacts</option>
              <option value="order_event">Order & Cart Events</option>
            </select>
          </div>
        </div>

        {/* Automations Table / Cards */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
          <div className="divide-y divide-gray-100">
            {filteredAutomations.map((item) => (
              <div 
                key={item.id} 
                className="p-5 hover:bg-[#FAFAFA] transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Rule Info */}
                <div className="flex items-start gap-3.5 min-w-0 max-w-xl">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    item.status === 'active' 
                      ? 'bg-[#EAF5EE] text-[#1E7E34]' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Zap className={`w-4 h-4 ${item.status === 'active' ? 'fill-[#1E7E34]' : ''}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-gray-900 leading-tight">{item.name}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full uppercase ${
                        item.status === 'active' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-normal">{item.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md font-mono">
                        {item.triggerLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metrics & Execution Stats */}
                <div className="flex items-center gap-6 justify-between md:justify-end shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
                  <div className="text-left md:text-right">
                    <span className="text-xs font-bold text-gray-900 block">{item.runs.toLocaleString()} runs</span>
                    <span className="text-[11px] text-emerald-700 font-semibold">{item.successRate}% success rate</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">Last run: {item.lastRun}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    <Link href={`/app/whatsapp/automations/${item.id}`}>
                      <button className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 text-xs font-bold transition shadow-2xs cursor-pointer">
                        Edit Flow
                      </button>
                    </Link>

                    <button
                      onClick={() => toggleStatus(item.id)}
                      title={item.status === 'active' ? 'Pause Automation' : 'Activate Automation'}
                      className={`p-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                        item.status === 'active' 
                          ? 'border-gray-200 bg-white text-amber-700 hover:bg-amber-50' 
                          : 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                      }`}
                    >
                      {item.status === 'active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => deleteAutomation(item.id)}
                      title="Delete Automation"
                      className="p-2 rounded-xl border border-gray-200 bg-white text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredAutomations.length === 0 && (
              <div className="p-12 text-center space-y-3">
                <Zap className="w-10 h-10 text-gray-300 mx-auto" />
                <h3 className="text-sm font-bold text-gray-900">No WhatsApp Automations Found</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Try adjusting your search or filters, or create a new WhatsApp automation rule.
                </p>
                <Link href="/app/whatsapp/automations/new">
                  <button className="mt-2 px-4 py-2 rounded-xl bg-black text-white text-xs font-bold hover:bg-gray-800 transition flex items-center gap-1.5 mx-auto">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Automation</span>
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
