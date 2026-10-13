'use client';

import React, { useState } from 'react';
import { Users, UserPlus, Shield, Mail, CheckCircle2 } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { MOCK_TEAM_MEMBERS } from '@/lib/mock-data';
import { Role } from '@/lib/types';

export default function TeamPage() {
  const [members, setMembers] = useState(MOCK_TEAM_MEMBERS);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('agent');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setMembers((prev) => [
      ...prev,
      {
        id: `mem-${Date.now()}`,
        workspaceId: 'ws-acme',
        name: email.split('@')[0],
        email,
        role,
        status: 'invited',
        joinedAt: new Date().toISOString(),
      },
    ]);
    setIsInviteOpen(false);
    setEmail('');
  };

  return (
    <AppShell title="Team & RBAC">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Workspace Members ({members.length})</h2>
            <p className="text-xs text-gray-500 mt-0.5">Manage team access and role-based permissions.</p>
          </div>
          <Button variant="primary" size="sm" leftIcon={<UserPlus className="w-3.5 h-3.5" />} onClick={() => setIsInviteOpen(true)}>
            Invite Team Member
          </Button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F9FA] text-gray-400 border-b border-gray-100 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="px-6 py-4">Member Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {members.map((mem) => (
                  <tr key={mem.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 font-bold text-xs">
                        {mem.name.charAt(0)}
                      </div>
                      <span>{mem.name}</span>
                    </td>
                    <td className="px-6 py-4 font-mono text-gray-400 text-[11px]">{mem.email}</td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] bg-gray-100 text-gray-800 font-semibold px-2 py-0.5 rounded-md uppercase border border-gray-200">
                        {mem.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={mem.status === 'active' ? 'success' : 'warning'}>
                        {mem.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm">Manage</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Modal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} title="Invite Team Member">
          <form onSubmit={handleInvite} className="space-y-4">
            <Input label="Work Email" type="email" placeholder="colleague@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Role Assignment</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full bg-[#F6F7F9] border border-gray-200/90 text-gray-900 rounded-xl text-xs p-2.5"
              >
                <option value="agent">Agent — Manage inbox conversations</option>
                <option value="manager">Manager — Build automations & view analytics</option>
                <option value="admin">Admin — Full workspace control & billing</option>
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" className="w-1/2" onClick={() => setIsInviteOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary" className="w-1/2">Send Invitation</Button>
            </div>
          </form>
        </Modal>
      </div>
    </AppShell>
  );
}
