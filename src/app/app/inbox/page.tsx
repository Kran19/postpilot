'use client';

import React, { useEffect, useState } from 'react';
import { 
  Inbox, 
  Search, 
  Send, 
  Bot, 
  User, 
  Tag, 
  MessageSquare, 
  CheckCheck,
  CheckCircle2, 
  Clock, 
  MoreVertical, 
  ChevronRight, 
  ArrowLeft,
  Sparkles,
  Zap,
  PhoneCall,
  Package,
  ShieldCheck,
  Star,
  Check,
  CircleDot,
  Smile,
  Paperclip,
  Flame,
  ShoppingBag,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/icons/SocialIcons';
import { AppShell } from '@/components/layout/AppShell';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { inboxService } from '@/lib/services/inboxService';
import { Conversation, Message, ChannelType } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function UnifiedInboxPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<string>('conv-1');
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyInput, setReplyInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');

  useEffect(() => {
    inboxService.getConversations('ws-acme').then((data) => {
      setConversations(data);
      if (data.length > 0) setSelectedConvId(data[0].id);
    });
  }, []);

  const activeConv = conversations.find((c) => c.id === selectedConvId) || conversations[0];

  const filteredConversations = conversations.filter((c) => {
    const matchesChannel = channelFilter === 'all' || c.channel === channelFilter;
    const matchesSearch = 
      c.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customer.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesSearch;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyInput.trim()) return;
    setIsSending(true);
    inboxService.sendMessage(activeConv.id, replyInput, 'Alex Morgan').then((newMsg) => {
      setConversations((prev) =>
        prev.map((c) => (c.id === activeConv.id ? { ...c, messages: [...c.messages, newMsg] } : c))
      );
      setReplyInput('');
      setIsSending(false);
    });
  };

  const handleQuickTemplate = (text: string) => {
    setReplyInput(text);
  };

  const getChannelBadge = (channel: ChannelType) => {
    switch (channel) {
      case 'instagram':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 text-pink-700 border border-pink-200/80 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
            Instagram
          </span>
        );
      case 'facebook':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#1877F2] border border-blue-200/80 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1877F2]" />
            Facebook
          </span>
        );
      case 'whatsapp':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#15803D] border border-emerald-200/80 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
            WhatsApp
          </span>
        );
      case 'threads':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-900 border border-slate-300 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            Threads
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <AppShell title="Unified Inbox">
      <div className="h-[calc(100vh-136px)] grid grid-cols-1 lg:grid-cols-12 gap-4 bg-[#F1F5F9]/80 border border-slate-200/80 rounded-2xl p-3 sm:p-4 shadow-sm overflow-hidden">
        {/* ============================================================ */}
        {/* COLUMN 1: Conversation List (4 Cols) */}
        {/* ============================================================ */}
        <div className={`lg:col-span-4 flex-col border-r-0 lg:border-r border-slate-200/90 pr-0 lg:pr-3.5 space-y-3 h-full ${
          mobileView === 'list' ? 'flex' : 'hidden lg:flex'
        }`}>
          {/* Channel Filters with Brand Colors */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setChannelFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition cursor-pointer shrink-0 ${
                channelFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs font-bold'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              All Channels ({conversations.length})
            </button>
            <button
              onClick={() => setChannelFilter('instagram')}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                channelFilter === 'instagram'
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white shadow-xs font-bold'
                  : 'bg-white border border-pink-200 text-pink-700 hover:bg-pink-50/80'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
              Instagram
            </button>
            <button
              onClick={() => setChannelFilter('facebook')}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                channelFilter === 'facebook'
                  ? 'bg-[#1877F2] text-white shadow-xs font-bold'
                  : 'bg-white border border-blue-200 text-blue-700 hover:bg-blue-50/80'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1877F2]" />
              Facebook
            </button>
            <button
              onClick={() => setChannelFilter('whatsapp')}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                channelFilter === 'whatsapp'
                  ? 'bg-[#16A34A] text-white shadow-xs font-bold'
                  : 'bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50/80'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              WhatsApp
            </button>
            <button
              onClick={() => setChannelFilter('threads')}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                channelFilter === 'threads'
                  ? 'bg-black text-white shadow-xs font-bold'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              Threads
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations, handles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-900 text-xs rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs"
            />
          </div>

          {/* Conversation Cards List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filteredConversations.map((conv) => {
              const isSelected = conv.id === selectedConvId;
              return (
                <div
                  key={conv.id}
                  onClick={() => {
                    setSelectedConvId(conv.id);
                    setMobileView('chat');
                  }}
                  className={`p-3 rounded-xl border transition cursor-pointer space-y-2 relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#F0FDF4] via-[#F5FDF8] to-[#EFF6FF] border-emerald-400 shadow-xs ring-1.5 ring-emerald-300/80'
                      : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/70 shadow-2xs'
                  }`}
                >
                  {/* Left Highlight Indicator */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-teal-600" />
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 truncate pr-2">
                      <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs ${
                        conv.channel === 'instagram' ? 'bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600' :
                        conv.channel === 'facebook' ? 'bg-[#1877F2]' :
                        conv.channel === 'whatsapp' ? 'bg-[#22C55E]' : 'bg-black'
                      }`}>
                        {conv.customer.name.charAt(0)}
                      </div>
                      <div className="truncate">
                        <h4 className={`text-xs font-bold truncate leading-tight ${isSelected ? 'text-emerald-950' : 'text-slate-900'}`}>
                          {conv.customer.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 truncate block">{conv.customer.handle}</span>
                      </div>
                    </div>
                    {getChannelBadge(conv.channel)}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-1 pl-0.5">{conv.lastMessage}</p>

                  <div className="flex items-center justify-between text-[10px] pt-0.5">
                    <span className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full ${
                      conv.status === 'automated' 
                        ? 'bg-emerald-100/70 text-emerald-800' 
                        : 'bg-indigo-100/70 text-indigo-800'
                    }`}>
                      {conv.status === 'automated' ? '🤖 Bot Active' : '👤 Agent Live'}
                    </span>
                    <span className="text-slate-400 font-medium">{formatDate(conv.lastMessageAt)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* COLUMN 2: Message Timeline & Reply Composer (5 Cols) */}
        {/* ============================================================ */}
        {activeConv ? (
          <div className={`lg:col-span-5 flex-col justify-between h-full space-y-3 ${
            mobileView === 'chat' ? 'flex' : 'hidden lg:flex'
          }`}>
            {/* Top Chat Header with Rich Accent Colors */}
            <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileView('list')}
                  className="lg:hidden p-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200"
                  aria-label="Back to list"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className={`w-9 h-9 rounded-full text-white flex items-center justify-center text-sm font-bold shadow-2xs ${
                  activeConv.channel === 'instagram' ? 'bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600' :
                  activeConv.channel === 'facebook' ? 'bg-[#1877F2]' :
                  activeConv.channel === 'whatsapp' ? 'bg-[#22C55E]' : 'bg-black'
                }`}>
                  {activeConv.customer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight flex items-center gap-1.5">
                    {activeConv.customer.name}
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-slate-500 font-mono">{activeConv.customer.handle}</span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                      Live
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {getChannelBadge(activeConv.channel)}
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${
                  activeConv.status === 'automated' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                }`}>
                  {activeConv.status}
                </span>
              </div>
            </div>

            {/* Message Thread Canvas with Soft Pattern & Colored Message Bubbles */}
            <div className="flex-1 overflow-y-auto space-y-3.5 p-3.5 sm:p-4 bg-gradient-to-b from-[#E2E8F0]/40 via-[#F1F5F9]/60 to-[#E2E8F0]/40 rounded-2xl border border-slate-200 shadow-inner">
              {activeConv.messages.map((msg) => {
                const isCustomer = msg.sender === 'customer';
                const isBot = msg.sender === 'bot';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-500">
                      <span className={`font-semibold ${
                        isCustomer ? 'text-sky-700' : isBot ? 'text-emerald-700' : 'text-slate-800'
                      }`}>
                        {msg.senderName}
                      </span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs space-y-1.5 transition ${
                        isCustomer
                          ? 'bg-white text-slate-900 rounded-tl-xs border border-sky-100 shadow-xs ring-1 ring-slate-100'
                          : isBot
                          ? 'bg-gradient-to-br from-[#F0FDF4] via-[#DCFCE7] to-[#BBF7D0] border border-emerald-300 text-[#064E3B] rounded-tr-xs shadow-xs'
                          : 'bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] text-white rounded-tr-xs shadow-md border border-slate-700/50'
                      }`}
                    >
                      <p className="leading-relaxed text-xs font-medium">{msg.text}</p>
                      
                      {msg.automationName && (
                        <div className="pt-1.5 border-t border-emerald-400/40 text-[10px] text-[#065F46] font-bold flex items-center gap-1.5">
                          <Bot className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Dispatched via: {msg.automationName}</span>
                        </div>
                      )}

                      {!isCustomer && (
                        <div className="flex justify-end pt-0.5">
                          <CheckCheck className={`w-3.5 h-3.5 ${isBot ? 'text-emerald-600' : 'text-emerald-400'}`} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Action Suggestion Pills Bar (Vibrant Color Palette) */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none select-none">
              <span className="text-[10px] text-slate-400 font-bold uppercase shrink-0">Quick Reply:</span>
              <button
                type="button"
                onClick={() => handleQuickTemplate('Hi! Our Pro plan starts at $49/mo. Check full pricing: https://postpilot.app/pricing')}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100 transition cursor-pointer shrink-0 flex items-center gap-1 shadow-2xs"
              >
                <Zap className="w-3 h-3 text-amber-600" /> Send Pricing ($49/mo)
              </button>
              <button
                type="button"
                onClick={() => handleQuickTemplate('Your order #9812 has shipped! Track live DHL status: https://track.postpilot.app/9812')}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition cursor-pointer shrink-0 flex items-center gap-1 shadow-2xs"
              >
                <Package className="w-3 h-3 text-emerald-600" /> Order Tracking
              </button>
              <button
                type="button"
                onClick={() => handleQuickTemplate('I am transferring this chat to our senior account manager right away.')}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-purple-50 border border-purple-200 text-purple-800 hover:bg-purple-100 transition cursor-pointer shrink-0 flex items-center gap-1 shadow-2xs"
              >
                <PhoneCall className="w-3 h-3 text-purple-600" /> Transfer to Agent
              </button>
            </div>

            {/* Reply Input Composer */}
            <form onSubmit={handleSendMessage} className="bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2">
              <input
                type="text"
                placeholder={`Reply to ${activeConv.customer.name} via ${activeConv.channel}...`}
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 text-xs px-3 py-2 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isSending || !replyInput.trim()}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-40 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition shadow-xs cursor-pointer flex items-center gap-1.5"
                aria-label="Send Reply"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        ) : null}

        {/* ============================================================ */}
        {/* COLUMN 3: Customer Context & Profile Panel (3 Cols) */}
        {/* ============================================================ */}
        {activeConv ? (
          <div className="lg:col-span-3 border-l border-slate-200/90 pl-3.5 space-y-3.5 hidden lg:block overflow-y-auto">
            {/* Customer Avatar & Bio Card with Gradient Header Accent */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
              <div className="h-12 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500" />
              <div className="p-4 pt-0 text-center space-y-2 -mt-6">
                <div className={`w-14 h-14 rounded-full text-white flex items-center justify-center text-lg font-bold mx-auto ring-4 ring-white shadow-md ${
                  activeConv.channel === 'instagram' ? 'bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600' :
                  activeConv.channel === 'facebook' ? 'bg-[#1877F2]' :
                  activeConv.channel === 'whatsapp' ? 'bg-[#22C55E]' : 'bg-black'
                }`}>
                  {activeConv.customer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{activeConv.customer.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">{activeConv.customer.handle}</p>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Verified User
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics Breakdown with Soft Colored Cards */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gradient-to-br from-indigo-50/70 to-indigo-100/40 p-3 rounded-xl border border-indigo-200/70 text-xs">
                <span className="text-[10px] text-indigo-700 font-bold block uppercase tracking-wider">Messages</span>
                <span className="text-lg font-bold text-indigo-950 mt-0.5 block">{activeConv.customer.totalMessages}</span>
              </div>
              <div className="bg-gradient-to-br from-emerald-50/70 to-emerald-100/40 p-3 rounded-xl border border-emerald-200/70 text-xs">
                <span className="text-[10px] text-emerald-700 font-bold block uppercase tracking-wider">Status</span>
                <span className="text-sm font-bold text-emerald-950 mt-1 block capitalize">{activeConv.status}</span>
              </div>
            </div>

            {/* Lead Tags in Multi-Colored Badges */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Customer Tags</span>
                <Tag className="w-3 h-3 text-slate-400" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeConv.tags.map((t, idx) => {
                  const tagStyles = [
                    'bg-purple-50 text-purple-700 border-purple-200',
                    'bg-amber-50 text-amber-800 border-amber-200',
                    'bg-sky-50 text-sky-700 border-sky-200',
                    'bg-emerald-50 text-emerald-800 border-emerald-200',
                    'bg-rose-50 text-rose-700 border-rose-200'
                  ];
                  return (
                    <span
                      key={t}
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${tagStyles[idx % tagStyles.length]}`}
                    >
                      {t}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Support Agent Assignee Box */}
            <div className="p-3.5 bg-gradient-to-br from-[#FAF7F2] to-[#F5EFE6] border border-[#EAE5D8] rounded-2xl space-y-1 text-xs shadow-2xs">
              <div className="flex items-center gap-1.5 text-amber-900/70 text-[11px]">
                <User className="w-3.5 h-3.5 text-[#1D3B2A]" />
                <span className="font-semibold">Assigned Agent</span>
              </div>
              <span className="font-bold text-[#1D3B2A] text-xs block">{activeConv.assignedAgent || 'Automated Bot Operator'}</span>
            </div>

            {/* Channel Live Sync Indicator */}
            <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[11px] font-bold text-emerald-900">Webhook Active</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-medium font-mono">100% SLA</span>
            </div>
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
