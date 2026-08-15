'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Zap, 
  LayoutDashboard, 
  Inbox, 
  Bot, 
  Share2, 
  BarChart3, 
  FileCode2, 
  Users, 
  CreditCard, 
  Settings, 
  Users2,
  ChevronRight
} from 'lucide-react';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';
import { cn } from '@/lib/utils';

interface NavGroup {
  label: string;
  items: {
    name: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'OVERVIEW',
    items: [
      { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'ENGAGE',
    items: [
      { name: 'Unified Inbox', href: '/app/inbox', icon: Inbox, badge: '3' },
      { name: 'Automations', href: '/app/automations', icon: Bot },
      { name: 'Contacts', href: '/app/contacts', icon: Users2 },
    ],
  },
  {
    label: 'CHANNELS',
    items: [
      { name: 'Integrations Hub', href: '/app/channels', icon: Share2 },
    ],
  },
  {
    label: 'INSIGHTS',
    items: [
      { name: 'Analytics', href: '/app/analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'MANAGE',
    items: [
      { name: 'Message Templates', href: '/app/templates', icon: FileCode2 },
      { name: 'Team & RBAC', href: '/app/team', icon: Users },
      { name: 'Billing & Usage', href: '/app/billing', icon: CreditCard },
    ],
  },
  {
    label: 'SETTINGS',
    items: [
      { name: 'Workspace Settings', href: '/app/settings', icon: Settings },
    ],
  },
];

export const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  const pathname = usePathname();

  return (
    <aside className={cn('w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between p-4 h-screen sticky top-0 overflow-y-auto select-none', className)}>
      <div className="space-y-6">
        {/* Brand Header */}
        <Link href="/app/dashboard" className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white block">POSTPILOT</span>
            <span className="text-[10px] font-bold text-indigo-400 tracking-wider uppercase block -mt-1">Commercial SaaS</span>
          </div>
        </Link>

        {/* Workspace Switcher */}
        <WorkspaceSwitcher />

        {/* Navigation Group items */}
        <nav className="space-y-5">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="space-y-1">
              <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                {group.label}
              </div>
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150',
                      isActive
                        ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={cn('w-4 h-4', isActive ? 'text-white' : 'text-slate-400')} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={cn(
                        'px-1.5 py-0.2 rounded-full text-[10px] font-bold',
                        isActive ? 'bg-white/20 text-white' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* User Profile Footer */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between px-2">
        <div className="flex items-center gap-2.5 truncate">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-300 shrink-0">
            AM
          </div>
          <div className="truncate">
            <h5 className="text-xs font-bold text-slate-200 truncate">Alex Morgan</h5>
            <p className="text-[10px] text-slate-400 truncate">alex@acmestudio.io</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
