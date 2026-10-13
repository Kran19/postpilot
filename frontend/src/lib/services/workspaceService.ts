import { MOCK_WORKSPACES, MOCK_TEAM_MEMBERS, MOCK_PLANS } from '../mock-data';
import { Workspace, TeamMember, SubscriptionPlan } from '../types';

export const workspaceService = {
  async getWorkspaces(): Promise<Workspace[]> {
    return Promise.resolve([...MOCK_WORKSPACES]);
  },

  async getWorkspaceById(id: string): Promise<Workspace | null> {
    const ws = MOCK_WORKSPACES.find((w) => w.id === id);
    return Promise.resolve(ws || null);
  },

  async getTeamMembers(workspaceId: string): Promise<TeamMember[]> {
    return Promise.resolve(MOCK_TEAM_MEMBERS.filter((m) => m.workspaceId === workspaceId));
  },

  async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return Promise.resolve([...MOCK_PLANS]);
  },
};
