'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutGrid, 
  MessageSquare, 
  BadgeCheck, 
  Users, 
  Radio, 
  BarChart2, 
  FileText, 
  CreditCard, 
  Settings, 
  Crown,
  ChevronDown,
  MoreVertical,
  ArrowRight,
  Send,
  Zap,
  Layers,
  Sparkles,
  GitBranch,
  Sliders,
  PhoneCall
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const PRIMARY_NAV: NavItem[] = [
  { name: 'Dashboard', href: '/app/dashboard', icon: LayoutGrid },
  { name: 'Unified Inbox', href: '/app/inbox', icon: MessageSquare, badge: '3' },
  { name: 'Automations', href: '/app/automations', icon: BadgeCheck },
  { name: 'Contacts', href: '/app/contacts', icon: Users },
  { name: 'Integrations', href: '/app/channels', icon: Radio },
  { name: 'Analytics', href: '/app/analytics', icon: BarChart2 },
];

const WHATSAPP_NAV: NavItem[] = [
  { name: 'Overview', href: '/app/whatsapp', icon: LayoutGrid },
  { name: 'Automations', href: '/app/whatsapp/automations', icon: Zap },
  { name: 'Templates', href: '/app/whatsapp/templates', icon: FileText },
  { name: 'Campaigns', href: '/app/whatsapp/campaigns', icon: Send },
  { name: 'Flows', href: '/app/whatsapp/flows', icon: GitBranch },
  { name: 'Conversations', href: '/app/whatsapp/conversations', icon: MessageSquare },
  { name: 'Analytics', href: '/app/whatsapp/analytics', icon: BarChart2 },
  { name: 'Settings', href: '/app/whatsapp/settings', icon: Sliders },
];

const SECONDARY_NAV: NavItem[] = [
  { name: 'Message Templates', href: '/app/templates', icon: FileText },
  { name: 'Team & Permissions', href: '/app/team', icon: Users },
  { name: 'Billing & Usage', href: '/app/billing', icon: CreditCard },
  { name: 'Settings', href: '/app/settings', icon: Settings },
];

let cachedSidebarScroll = 0;

export const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  const pathname = usePathname();
  const asideRef = React.useRef<HTMLElement | null>(null);

  // Restore scroll position on initial load and after pathname navigation
  React.useEffect(() => {
    const aside = asideRef.current;
    if (!aside) return;

    const saved = cachedSidebarScroll || Number(sessionStorage.getItem('pp_sidebar_scroll') || '0');
    if (saved > 0) {
      aside.scrollTop = saved;
    }
  }, [pathname]);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const top = e.currentTarget.scrollTop;
    cachedSidebarScroll = top;
    try {
      sessionStorage.setItem('pp_sidebar_scroll', String(top));
    } catch {}
  };

  const handleLinkClick = () => {
    if (asideRef.current) {
      const top = asideRef.current.scrollTop;
      cachedSidebarScroll = top;
      try {
        sessionStorage.setItem('pp_sidebar_scroll', String(top));
      } catch {}
    }
  };

  return (
    <aside
      ref={asideRef}
      onScroll={handleScroll}
      className={cn(
        'w-64 bg-white border-r border-gray-200/80 flex flex-col justify-between p-4 h-screen sticky top-0 overflow-y-auto select-none shadow-xs',
        className
      )}
    >
      <div className="space-y-4">
        {/* Brand Header */}
        <Link href="/app/dashboard" scroll={false} onClick={handleLinkClick} className="flex items-center gap-3 px-2 pt-1">
          <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white shadow-xs">
            <Send className="w-4 h-4 fill-white text-white -rotate-12 translate-x-0.5 -translate-y-0.5" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-gray-900 block leading-tight">PostPilot</span>
            <span className="text-[10px] font-semibold text-gray-400 block uppercase tracking-wider">Social SaaS Engine</span>
          </div>
        </Link>

        {/* Workspace Switcher Card */}
        <div className="bg-white border border-gray-200/90 rounded-xl p-2.5 flex items-center justify-between shadow-xs hover:border-gray-300 transition cursor-pointer">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
              E
            </div>
            <div className="truncate">
              <h4 className="text-xs font-bold text-gray-900 truncate leading-tight">Empeor Smart Solutions</h4>
              <p className="text-[10px] text-gray-400 truncate">Enterprise Plan</p>
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        </div>

        {/* Primary Navigation */}
        <nav className="space-y-0.5">
          {PRIMARY_NAV.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/app/dashboard' && pathname.startsWith(`${item.href}`));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                scroll={false}
                onClick={handleLinkClick}
                className={cn(
                  'flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-[#E3ECE6] text-[#1D3B2A] font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={cn('w-4 h-4', isActive ? 'text-[#1D3B2A]' : 'text-gray-500')} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="w-4 h-4 rounded-full bg-[#16A34A] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* DEDICATED WHATSAPP SECTION */}
          <div className="pt-3 pb-1">
            <div className="flex items-center justify-between px-3 mb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">WHATSAPP</span>
              </div>
              <span className="text-[9px] font-semibold text-[#1E7E34] bg-[#EAF5EE] px-1.5 py-0.2 rounded-full">
                Connected
              </span>
            </div>
          </div>

          {WHATSAPP_NAV.map((item) => {
            const isOverview = item.href === '/app/whatsapp';
            const isActive = isOverview 
              ? pathname === '/app/whatsapp' 
              : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                scroll={false}
                onClick={handleLinkClick}
                className={cn(
                  'flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-[#EAF5EE] text-[#15803D] font-bold shadow-2xs'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-[#16A34A]' : 'text-gray-400')} />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}

          {/* Secondary Divider & Settings */}
          <div className="pt-3 pb-1">
            <div className="border-t border-gray-100 px-3 pt-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">WORKSPACE</span>
            </div>
          </div>

          {SECONDARY_NAV.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}`);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                scroll={false}
                onClick={handleLinkClick}
                className={cn(
                  'flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-[#E3ECE6] text-[#1D3B2A] font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-[#1D3B2A]' : 'text-gray-400')} />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-3 pt-3">
        {/* Upgrade to Enterprise Card */}
        <div className="bg-[#FAF7F2] border border-[#EAE5D8] rounded-xl p-3.5 shadow-2xs">
          <div className="flex items-center gap-1.5 mb-1">
            <Crown className="w-3.5 h-3.5 text-[#A1711C] fill-[#A1711C]" />
            <h5 className="text-xs font-bold text-gray-900">Enterprise Scale</h5>
          </div>
          <p className="text-[10px] text-gray-500 leading-normal">
            Higher WhatsApp Cloud API limits & dedicated Meta WABA IP.
          </p>
          <Link
            href="/app/billing"
            scroll={false}
            onClick={handleLinkClick}
            className="mt-2.5 w-full bg-[#1D3B2A] hover:bg-[#162F22] text-white text-[11px] font-semibold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition shadow-2xs"
          >
            <span>Upgrade Plan</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* User Profile Footer */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 font-bold text-xs flex items-center justify-center shrink-0">
              AM
            </div>
            <div className="truncate">
              <h5 className="text-xs font-bold text-gray-900 truncate">Alex Morgan</h5>
              <p className="text-[10px] text-gray-400 truncate">alex@acmestudio.io</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer" aria-label="Account Settings">
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
