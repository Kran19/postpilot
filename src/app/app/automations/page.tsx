'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  Plus, 
  Search, 
  Filter, 
  Play, 
  Pause, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { automationService } from '@/lib/services/automationService';
import { AutomationRule, ChannelType } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function AutomationsListPage() {
  const [automations, setAutomations] = useState<AutomationRule[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState<string>('all');

  useEffect(() => {
    automationService.getAutomations('ws-acme').then(setAutomations);
  }, []);

  const handleToggleStatus = (id: string) => {
    automationService.toggleAutomationStatus(id).then((updatedRule) => {
      if (updatedRule) {
        setAutomations((prev) => prev.map((a) => a.id === id ? { ...updatedRule } : a));
      }
    });
  };

  const filteredAutomations = automations.filter((rule) => {
    const matchesSearch = rule.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          rule.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChannel = channelFilter === 'all' || rule.channel === channelFilter;
    return matchesSearch && matchesChannel;
  });

  return (
    <AppShell title="Automations" description="Manage Social Automation Workflows & Triggers">
      <div className="space-y-6">
        {/* Header CTA Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">Automation Workflows</h2>
            <p className="text-xs text-slate-400 mt-0.5">{automations.length} total automation rules configured in workspace.</p>
          </div>
          <Link href="/app/automations/builder">
            <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              Create Workflow
            </Button>
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <Card className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-80">
            <Input
              placeholder="Search by rule name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            <span className="text-xs text-slate-500 font-medium mr-1">Filter Channel:</span>
            {['all', 'instagram', 'facebook', 'whatsapp', 'threads'].map((ch) => (
              <button
                key={ch}
                onClick={() => setChannelFilter(ch)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                  channelFilter === ch
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {ch}
              </button>
            ))}
          </div>
        </Card>

        {/* Automations Rules List Table / Cards */}
        <div className="space-y-4">
          {filteredAutomations.map((rule) => (
            <Card key={rule.id} hoverEffect className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left Rule Metadata */}
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-base font-bold text-white">{rule.name}</h3>
                    <Badge variant={rule.channel}>{rule.channel.toUpperCase()}</Badge>
                    <Badge variant={rule.status === 'active' ? 'success' : 'warning'}>
                      {rule.status === 'active' ? '● Active' : '⏸ Paused'}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{rule.description}</p>
                  
                  <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono pt-1">
                    <span>Trigger: <strong className="text-indigo-300">{rule.triggerLabel}</strong></span>
                    <span>Conditions: <strong className="text-slate-300">{rule.conditions.length} rule</strong></span>
                    <span>Actions: <strong className="text-slate-300">{rule.actions.length} step</strong></span>
                  </div>
                </div>

                {/* Right Metrics & Controls */}
                <div className="flex items-center gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-slate-800">
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-slate-100 block">
                      {rule.executionCount.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 block uppercase font-medium">Executions</span>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-extrabold text-emerald-400 block">
                      {rule.successRate}%
                    </span>
                    <span className="text-[10px] text-slate-500 block uppercase font-medium">Success Rate</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant={rule.status === 'active' ? 'outline' : 'primary'}
                      size="sm"
                      onClick={() => handleToggleStatus(rule.id)}
                      leftIcon={rule.status === 'active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    >
                      {rule.status === 'active' ? 'Pause' : 'Activate'}
                    </Button>

                    <Link href={`/app/automations/builder?id=${rule.id}`}>
                      <Button variant="secondary" size="sm" iconOnly>
                        <Edit3 className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
