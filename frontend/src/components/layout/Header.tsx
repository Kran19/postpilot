'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Bell, 
  Plus, 
  Calendar,
  Menu,
  X,
  LogOut,
  Settings,
  User,
  ChevronDown
} from 'lucide-react';
import { Sidebar } from './Sidebar';

export const Header: React.FC<{ title?: string; description?: string }> = ({
  title = 'Dashboard',
}) => {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Search Bar on Left */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={() => setShowMobileDrawer(!showMobileDrawer)}
          className="md:hidden p-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
          aria-label="Toggle Navigation Drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search contacts, automations, messages..."
            className="w-full bg-[#F6F7F9] border border-gray-200/80 rounded-xl pl-10 pr-12 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 transition"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-white text-[10px] font-sans font-medium text-gray-400 border border-gray-200 shadow-2xs">
            ⌘ K
          </kbd>
        </div>
      </div>

      {/* Utilities & Actions on Right */}
      <div className="flex items-center gap-3">
        {/* Notification Bell with red dot */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-white border border-gray-200/80 text-gray-600 hover:text-gray-900 hover:bg-gray-50 relative transition cursor-pointer shadow-2xs"
            aria-label="View Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444] ring-2 ring-white" />
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl z-30 p-4 space-y-3 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Notifications</h4>
                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">2 New</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-900 space-y-1">
                    <p className="font-semibold text-xs text-emerald-800">Automation Triggered</p>
                    <p className="text-[11px] text-emerald-700">Instagram Price Inquiry Auto Reply executed for @sarah_design.</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Date Indicator Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200/80 text-xs font-medium text-gray-700 shadow-2xs">
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          <span>Wed, 13 Aug 2025</span>
        </div>

        {/* Primary CTA Button */}
        <Link href="/app/automations/builder">
          <button className="bg-[#18181B] hover:bg-black text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition shadow-xs cursor-pointer">
            <Plus className="w-3.5 h-3.5" />
            <span>New Automation</span>
          </button>
        </Link>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition cursor-pointer select-none"
            aria-label="User menu"
          >
            <div className="w-7 h-7 rounded-full bg-gray-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
              AM
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 hidden sm:block" />
          </button>

          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200/90 rounded-2xl shadow-xl z-50 p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-xs font-bold text-gray-900">Alex Morgan</p>
                  <p className="text-[10px] text-gray-400 truncate">alex@acmestudio.io</p>
                </div>
                <Link
                  href="/app/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition"
                >
                  <Settings className="w-3.5 h-3.5 text-gray-400" />
                  <span>Account Settings</span>
                </Link>
                <div className="border-t border-gray-100 my-1" />
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    try {
                      localStorage.clear();
                      sessionStorage.clear();
                    } catch {}
                    router.push('/login');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 transition cursor-pointer font-semibold text-left"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span>Log Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {showMobileDrawer && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setShowMobileDrawer(false)} />
          <div className="relative w-72 bg-white h-full shadow-2xl z-10 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="text-sm font-bold text-gray-900">PostPilot Menu</span>
              <button onClick={() => setShowMobileDrawer(false)} className="text-gray-400 hover:text-gray-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Sidebar className="w-full h-full border-r-0" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
