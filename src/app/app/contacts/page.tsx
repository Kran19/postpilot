'use client';

import React, { useState } from 'react';
import { Users2, Search, Filter, Tag, MessageSquare } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/icons/SocialIcons';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { MOCK_CONVERSATIONS } from '@/lib/mock-data';

export default function ContactsPage() {
  return (
    <AppShell title="Contacts CRM" description="Social Customer Profiles & Channel Identities">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white">Social Contacts Directory</h2>
          <p className="text-xs text-slate-400 mt-0.5">Centralized profile records across Instagram, Facebook, and WhatsApp.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_CONVERSATIONS.map((conv) => {
            const cust = conv.customer;
            return (
              <Card key={cust.id} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-indigo-400">
                    {cust.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{cust.name}</h3>
                    <p className="text-xs text-slate-400 font-mono">{cust.handle}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Channel</span>
                    <Badge variant={cust.channel}>{cust.channel}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Interactions</span>
                    <span className="font-bold text-slate-200">{cust.totalMessages} messages</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] text-slate-500 font-medium">Applied Tags:</span>
                  <div className="flex flex-wrap gap-1">
                    {cust.tags.map((t) => (
                      <Badge key={t} variant="info">{t}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
