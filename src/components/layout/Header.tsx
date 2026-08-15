'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Bell, 
  Plus, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  X,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Sidebar } from './Sidebar';

export const Header: React.FC<{ title?: string; description?: string }> = ({
  title = 'Dashboard',
  description = 'Commercial Social Automation Overview',
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 py-4 flex items-center justify-between">
      {/* Title & Mobile Hamburger Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowMobileDrawer(!showMobileDrawer)}
          className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition"
          aria-label="Toggle Navigation Drawer"
          aria-expanded={showMobileDrawer}
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mb-0.5">
            <span>POSTPILOT</span>
            <span>/</span>
            <span className="text-slate-200 capitalize">{title}</span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight">{title}</h1>
        </div>
      </div>

      {/* Global Utilities */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search trigger */}
        <button
          onClick={() => setShowSearchModal(true)}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs transition cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500"
          aria-label="Global Search"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Search automations, contacts...</span>
          <kbd className="hidden lg:inline px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-700">⌘K</kbd>
        </button>

        {/* Health Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>Meta Webhooks Live</span>
        </div>

        {/* Notifications Drawer */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 relative transition cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label="View Notifications"
            aria-expanded={showNotifications}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-slate-950" />
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-30 p-4 space-y-3 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">System Notifications</h4>
                  <Badge variant="info">2 New</Badge>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 space-y-1">
                    <div className="font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> WhatsApp WABA Reauth Needed
                    </div>
                    <p className="text-[11px] text-slate-400">Payment method update required in Meta Business Manager.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 space-y-1">
                    <div className="font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Automation Triggered
                    </div>
                    <p className="text-[11px] text-slate-400">Instagram Price Inquiry Auto Reply executed for @sarah_design.</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Primary Quick Action CTA */}
        <Link href="/app/automations/builder">
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            <span className="hidden sm:inline">New Automation</span>
            <span className="sm:hidden">New</span>
          </Button>
        </Link>
      </div>

      {/* Mobile Sidebar Navigation Drawer Overlay */}
      {showMobileDrawer && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowMobileDrawer(false)} />
          <div className="relative w-72 bg-slate-950 h-full shadow-2xl z-10 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <span className="text-sm font-bold text-white uppercase tracking-wider">Navigation Menu</span>
              <button onClick={() => setShowMobileDrawer(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Sidebar className="w-full h-full border-r-0" />
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-slate-400 w-full">
                <Search className="w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search automations, rule keywords, contacts..."
                  className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                  autoFocus
                />
              </div>
              <button onClick={() => setShowSearchModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs text-slate-500 p-4 text-center">
              Type a keyword like &quot;PRICE&quot;, &quot;Instagram&quot;, or &quot;Sarah&quot; to filter assets.
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
