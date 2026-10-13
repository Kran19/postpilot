'use client';

import React from 'react';
import { Users2, Search, Filter, Tag, MessageSquare } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/icons/SocialIcons';
import { AppShell } from '@/components/layout/AppShell';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { MOCK_CONVERSATIONS } from '@/lib/mock-data';

export default function ContactsPage() {
  return (
    <AppShell title="Contacts CRM">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Social Contacts Directory</h2>
          <p className="text-xs text-gray-500 mt-0.5">Centralized customer profile records across Instagram, Facebook, and WhatsApp.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MOCK_CONVERSATIONS.map((conv) => {
            const cust = conv.customer;
            return (
              <div key={cust.id} className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 text-gray-800 flex items-center justify-center text-sm font-bold">
                    {cust.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{cust.name}</h3>
                    <p className="text-xs text-gray-400 font-mono">{cust.handle}</p>
                  </div>
                </div>

                <div className="p-3.5 bg-[#F8F9FA] rounded-xl border border-gray-200/80 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Channel</span>
                    <Badge variant={cust.channel}>{cust.channel}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Interactions</span>
                    <span className="font-bold text-gray-900">{cust.totalMessages} messages</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] text-gray-400 font-medium">Applied Tags:</span>
                  <div className="flex flex-wrap gap-1">
                    {cust.tags.map((t) => (
                      <Badge key={t} variant="info">{t}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
