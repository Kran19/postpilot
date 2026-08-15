'use client';

import React, { useState } from 'react';
import { FileCode2, Plus, CheckCircle2, Clock, Search } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_TEMPLATES } from '@/lib/mock-data';

export default function TemplatesPage() {
  return (
    <AppShell title="Message Templates" description="WhatsApp Business HSM & Reusable Response Templates">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">Pre-Approved Message Templates</h2>
            <p className="text-xs text-slate-400 mt-0.5">Manage WhatsApp HSM templates and multi-channel response scripts.</p>
          </div>
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            New Template
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_TEMPLATES.map((tpl) => (
            <Card key={tpl.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{tpl.name}</h3>
                  <span className="text-[10px] text-slate-500 font-mono">Category: {tpl.category}</span>
                </div>
                <Badge variant={tpl.status === 'APPROVED' ? 'success' : 'warning'}>
                  {tpl.status}
                </Badge>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
                {tpl.content}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                <span>Channel: <strong className="text-slate-300 uppercase">{tpl.channel}</strong></span>
                <span>Language: <strong className="text-slate-300 font-mono">{tpl.language}</strong></span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
