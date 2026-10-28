import { ApiClient } from './apiClient';
import { MOCK_CONVERSATIONS } from '../mock-data';
import { Conversation, Message } from '../types';

export const inboxService = {
  async getConversations(workspaceId: string = 'empeor-smart-solutions'): Promise<Conversation[]> {
    try {
      const data = await ApiClient.get<Conversation[]>(`/workspaces/${workspaceId}/inbox/conversations`);
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn('[inboxService] Live backend unavailable, using mock data:', err);
    }
    // Fallback to mock data if no live conversations or backend offline
    const list = MOCK_CONVERSATIONS.filter((c) => c.workspaceId === workspaceId || c.workspaceId === 'ws-acme');
    return JSON.parse(JSON.stringify(list));
  },

  async sendMessage(
    conversationId: string,
    text: string,
    senderName: string = 'Support Agent',
    workspaceId: string = 'empeor-smart-solutions',
  ): Promise<Message> {
    return await ApiClient.post<Message>(
      `/workspaces/${workspaceId}/inbox/conversations/${conversationId}/messages`,
      { text },
    );
  },
};

