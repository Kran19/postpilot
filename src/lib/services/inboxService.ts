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
    try {
      const msg = await ApiClient.post<Message>(
        `/workspaces/${workspaceId}/inbox/conversations/${conversationId}/messages`,
        { text },
      );
      if (msg && msg.id) {
        return msg;
      }
    } catch (err) {
      console.warn('[inboxService] Live send message failed, using local optimistic message:', err);
    }

    const newMsg: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      conversationId,
      sender: 'agent',
      senderName,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel: 'instagram',
    };
    const conv = MOCK_CONVERSATIONS.find((c) => c.id === conversationId);
    if (conv) {
      conv.lastMessage = text;
      conv.lastMessageAt = new Date().toISOString();
      conv.status = 'open';
      if (!conv.messages.some((m) => m.id === newMsg.id)) {
        conv.messages.push(newMsg);
      }
    }
    return newMsg;
  },
};
