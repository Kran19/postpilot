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
  CheckCircle2, 
  Clock, 
  MoreVertical,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/icons/SocialIcons';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
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
    return channelFilter === 'all' || c.channel === channelFilter;
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

  return (
    <AppShell title="Unified Inbox" description="Centralized Communication Across Meta Ecosystem">
      <div className="h-[calc(100vh-140px)] grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 overflow-hidden">
        {/* COLUMN 1: Conversation List (4 Cols on Desktop, toggleable on Mobile) */}
        <div className={`lg:col-span-4 flex-col border-r-0 lg:border-r border-slate-800/80 pr-0 lg:pr-4 space-y-4 h-full ${
          mobileView === 'list' ? 'flex' : 'hidden lg:flex'
        }`}>
          {/* Channel Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
            {['all', 'instagram', 'facebook', 'whatsapp', 'threads'].map((ch) => (
              <button
                key={ch}
                onClick={() => setChannelFilter(ch)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider transition cursor-pointer shrink-0 ${
                  channelFilter === ch
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {ch}
              </button>
            ))}
          </div>

          <Input placeholder="Filter conversations..." leftIcon={<Search className="w-3.5 h-3.5" />} />

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
                  className={`p-3.5 rounded-xl border transition cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-indigo-600/15 border-indigo-500/50 shadow-md'
                      : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                        {conv.customer.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-100">{conv.customer.name}</h4>
                        <span className="text-[10px] text-slate-400">{conv.customer.handle}</span>
                      </div>
                    </div>
                    <Badge variant={conv.channel}>{conv.channel}</Badge>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-1">{conv.lastMessage}</p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                    <span>{conv.status === 'automated' ? '🤖 Automated' : '👤 Agent Assigned'}</span>
                    <span>{formatDate(conv.lastMessageAt)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMN 2: Message Timeline & Reply Composer (5 Cols on Desktop, toggleable on Mobile) */}
        {activeConv ? (
          <div className={`lg:col-span-5 flex-col justify-between h-full space-y-4 ${
            mobileView === 'chat' ? 'flex' : 'hidden lg:flex'
          }`}>
            {/* Timeline Header with Mobile Back Button */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileView('list')}
                  className="lg:hidden p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
                  aria-label="Back to conversations list"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="w-9 h-9 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-sm font-bold text-indigo-300">
                  {activeConv.customer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{activeConv.customer.name}</h3>
                  <p className="text-xs text-slate-400">{activeConv.customer.handle} • via {activeConv.channel.toUpperCase()}</p>
                </div>
              </div>

              <Badge variant={activeConv.status === 'automated' ? 'success' : 'info'}>
                {activeConv.status.toUpperCase()}
              </Badge>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 p-2">
              {activeConv.messages.map((msg) => {
                const isCustomer = msg.sender === 'customer';
                const isBot = msg.sender === 'bot';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400">
                      <span>{msg.senderName}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs space-y-1.5 ${
                        isCustomer
                          ? 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700'
                          : isBot
                          ? 'bg-indigo-950/80 border border-indigo-500/40 text-indigo-100 rounded-tr-none shadow-lg'
                          : 'bg-indigo-600 text-white rounded-tr-none shadow-md'
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                      {msg.automationName && (
                        <div className="pt-1.5 border-t border-indigo-500/20 text-[10px] text-indigo-300 font-semibold flex items-center gap-1">
                          <Bot className="w-3 h-3 text-indigo-400" />
                          <span>Handled by: {msg.automationName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                placeholder={`Reply to ${activeConv.customer.name} via ${activeConv.channel}...`}
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button type="submit" variant="primary" size="md" isLoading={isSending} iconOnly>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        ) : null}

        {/* COLUMN 3: Customer Context & Profile Panel (3 Cols on Desktop) */}
        {activeConv ? (
          <div className="lg:col-span-3 border-l border-slate-800/80 pl-4 space-y-6 hidden lg:block overflow-y-auto">
            <div className="text-center space-y-2 pt-2">
              <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-indigo-500/30 flex items-center justify-center text-xl font-bold text-indigo-400 mx-auto">
                {activeConv.customer.name.charAt(0)}
              </div>
              <h3 className="text-sm font-bold text-white">{activeConv.customer.name}</h3>
              <p className="text-xs text-slate-400 font-mono">{activeConv.customer.handle}</p>
            </div>

            <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Channel</span>
                <span className="font-bold text-slate-200 uppercase">{activeConv.channel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Interactions</span>
                <span className="font-bold text-slate-200">{activeConv.customer.totalMessages} messages</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Last Active</span>
                <span className="font-bold text-slate-200">{activeConv.customer.lastInteractionAt}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Customer Lead Tags</span>
              <div className="flex flex-wrap gap-1.5">
                {activeConv.tags.map((t) => (
                  <Badge key={t} variant="info">{t}</Badge>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1 text-xs">
              <span className="text-slate-500 block">Assigned Support Agent</span>
              <span className="font-bold text-indigo-400">{activeConv.assignedAgent || 'Automated Bot Operator'}</span>
            </div>
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
