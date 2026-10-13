import { MOCK_AUTOMATIONS, MOCK_EXECUTION_LOGS } from '../mock-data';
import { AutomationRule, ExecutionLog } from '../types';

export const automationService = {
  async getAutomations(workspaceId: string): Promise<AutomationRule[]> {
    return Promise.resolve(MOCK_AUTOMATIONS.filter((a) => a.workspaceId === workspaceId));
  },

  async getAutomationById(id: string): Promise<AutomationRule | null> {
    const rule = MOCK_AUTOMATIONS.find((a) => a.id === id);
    return Promise.resolve(rule || null);
  },

  async getExecutionLogs(workspaceId: string): Promise<ExecutionLog[]> {
    return Promise.resolve(MOCK_EXECUTION_LOGS.filter((l) => l.workspaceId === workspaceId));
  },

  async toggleAutomationStatus(id: string): Promise<AutomationRule | null> {
    const rule = MOCK_AUTOMATIONS.find((a) => a.id === id);
    if (rule) {
      rule.status = rule.status === 'active' ? 'paused' : 'active';
      rule.updatedAt = new Date().toISOString();
    }
    return Promise.resolve(rule || null);
  },

  async createAutomation(rule: Omit<AutomationRule, 'id' | 'executionCount' | 'successRate' | 'createdAt' | 'updatedAt'>): Promise<AutomationRule> {
    const newRule: AutomationRule = {
      ...rule,
      id: `auto-${Date.now()}`,
      executionCount: 0,
      successRate: 100,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    MOCK_AUTOMATIONS.unshift(newRule);
    return Promise.resolve(newRule);
  },
};
