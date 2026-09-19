'use client';

import React from 'react';
import { FileCode2, Plus, CheckCircle2, Clock, Search } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_TEMPLATES } from '@/lib/mock-data';

export default function TemplatesPage() {
  return (
    <AppShell title="Message Templates">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Pre-Approved Message Templates</h2>
            <p className="text-xs text-gray-500 mt-0.5">Manage WhatsApp HSM templates and multi-channel response scripts.</p>
          </div>
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
            New Template
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MOCK_TEMPLATES.map((tpl) => (
            <div key={tpl.id} className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{tpl.name}</h3>
                  <span className="text-[10px] text-gray-400 font-mono">Category: {tpl.category}</span>
                </div>
                <Badge variant={tpl.status === 'APPROVED' ? 'success' : 'warning'}>
                  {tpl.status}
                </Badge>
              </div>

              <div className="p-3.5 bg-[#F8F9FA] rounded-xl border border-gray-200/80 text-xs font-mono text-gray-800 leading-relaxed">
                {tpl.content}
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-100">
                <span>Channel: <strong className="text-gray-700 uppercase">{tpl.channel}</strong></span>
                <span>Language: <strong className="text-gray-700 font-mono">{tpl.language}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
