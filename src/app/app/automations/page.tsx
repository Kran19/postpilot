'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  Plus, 
  Search, 
  Play, 
  Pause, 
  Edit3, 
  CheckCircle2, 
  Activity,
  ArrowRight,
  Zap
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { automationService } from '@/lib/services/automationService';
import { AutomationRule } from '@/lib/types';
import { InstagramIcon, FacebookIcon } from '@/components/icons/SocialIcons';
import { MessageSquare } from 'lucide-react';

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
    <AppShell title="Automations">
      <div className="space-y-5">
        {/* Header CTA Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Automation Workflows</h2>
            <p className="text-xs text-gray-500 mt-0.5">{automations.length} total active rules running across Meta channels.</p>
          </div>
          <Link href="/app/automations/builder">
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
              Create Workflow
            </Button>
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-80">
            <Input
              placeholder="Search by rule name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-3.5 h-3.5" />}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            <span className="text-xs text-gray-400 font-medium mr-1">Filter Channel:</span>
            {['all', 'instagram', 'facebook', 'whatsapp', 'threads'].map((ch) => (
              <button
                key={ch}
                onClick={() => setChannelFilter(ch)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition cursor-pointer ${
                  channelFilter === ch
                    ? 'bg-[#18181B] text-white shadow-xs'
                    : 'bg-[#F6F7F9] border border-gray-200/80 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>

        {/* Automations Rules List Table / Cards */}
        <div className="space-y-3.5">
          {filteredAutomations.map((rule) => (
            <div key={rule.id} className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs hover:border-gray-300 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left Rule Metadata */}
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0 shadow-2xs"
                      style={{
                        background: 
                          rule.channel === 'instagram' ? 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' :
                          rule.channel === 'facebook' ? '#1877F2' :
                          rule.channel === 'whatsapp' ? '#25D366' : '#18181B'
                      }}
                    >
                      {rule.channel === 'instagram' && <InstagramIcon className="w-3.5 h-3.5" />}
                      {rule.channel === 'facebook' && <FacebookIcon className="w-3.5 h-3.5" />}
                      {rule.channel === 'whatsapp' && <MessageSquare className="w-3.5 h-3.5 fill-white text-white" />}
                      {rule.channel === 'threads' && <span className="font-bold text-xs">@</span>}
                    </div>

                    <h3 className="text-sm font-bold text-gray-900">{rule.name}</h3>
                    <Badge variant={rule.channel}>{rule.channel}</Badge>
                    <Badge variant={rule.status === 'active' ? 'success' : 'warning'}>
                      {rule.status === 'active' ? '● Active' : '⏸ Paused'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{rule.description}</p>
                  
                  <div className="flex items-center gap-4 text-[11px] text-gray-400 pt-1">
                    <span>Trigger: <strong className="text-gray-700">{rule.triggerLabel}</strong></span>
                    <span>Conditions: <strong className="text-gray-700">{rule.conditions.length} rule</strong></span>
                    <span>Actions: <strong className="text-gray-700">{rule.actions.length} step</strong></span>
                  </div>
                </div>

                {/* Right Metrics & Controls */}
                <div className="flex items-center gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900 block">
                      {rule.executionCount.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-gray-400 block uppercase font-medium">Runs</span>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold text-[#16A34A] block">
                      {rule.successRate}%
                    </span>
                    <span className="text-[10px] text-gray-400 block uppercase font-medium">Success</span>
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
                      <Button variant="secondary" size="sm" iconOnly aria-label="Edit Automation">
                        <Edit3 className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
