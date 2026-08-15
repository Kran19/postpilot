'use client';

import React, { useState } from 'react';
import { Users, UserPlus, Shield, Mail, CheckCircle2 } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
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
    <AppShell title="Team & RBAC" description="Workspace Multi-Tenant Access Control & Permissions">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">Workspace Members ({members.length})</h2>
            <p className="text-xs text-slate-400 mt-0.5">Manage team access and role-based permissions.</p>
          </div>
          <Button variant="primary" leftIcon={<UserPlus className="w-4 h-4" />} onClick={() => setIsInviteOpen(true)}>
            Invite Team Member
          </Button>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="px-6 py-4">Member Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {members.map((mem) => (
                  <tr key={mem.id} className="hover:bg-slate-900/50">
                    <td className="px-6 py-4 font-bold text-slate-100 flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-xs">
                        {mem.name.charAt(0)}
                      </div>
                      <span>{mem.name}</span>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-400">{mem.email}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="uppercase font-semibold">{mem.role}</Badge>
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
        </Card>

        <Modal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} title="Invite Team Member">
          <form onSubmit={handleInvite} className="space-y-4">
            <Input label="Work Email" type="email" placeholder="colleague@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Select
              label="Role Assignment"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              options={[
                { label: 'Agent — Manage inbox conversations', value: 'agent' },
                { label: 'Manager — Build automations & view analytics', value: 'manager' },
                { label: 'Admin — Full workspace control & billing', value: 'admin' },
              ]}
            />
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
