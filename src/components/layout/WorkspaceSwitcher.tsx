'use client';

import React, { useState } from 'react';
import { MOCK_WORKSPACES } from '@/lib/mock-data';
import { Workspace } from '@/lib/types';
import { ChevronDown, Building, Plus, Check } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const WorkspaceSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeWs, setActiveWs] = useState<Workspace>(MOCK_WORKSPACES[0]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-left transition"
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold shrink-0">
            {activeWs.name.charAt(0)}
          </div>
          <div className="truncate">
            <h4 className="text-xs font-bold text-slate-100 truncate">{activeWs.name}</h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] text-slate-400 capitalize">{activeWs.plan} Plan</span>
            </div>
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-2 w-full bg-slate-900 border border-slate-800 rounded-xl shadow-xl z-30 p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Workspaces
            </div>
            {MOCK_WORKSPACES.map((ws) => (
              <button
                key={ws.id}
                onClick={() => {
                  setActiveWs(ws);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-medium transition ${
                  activeWs.id === ws.id
                    ? 'bg-indigo-600/15 text-indigo-300 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{ws.name}</span>
                </div>
                {activeWs.id === ws.id && <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
              </button>
            ))}
            <div className="pt-1 border-t border-slate-800">
              <button
                onClick={() => alert('New Workspace creation modal')}
                className="w-full flex items-center gap-2 p-2 rounded-lg text-xs text-indigo-400 hover:bg-slate-800 font-medium transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Workspace</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
