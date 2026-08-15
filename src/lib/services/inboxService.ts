import { MOCK_CONVERSATIONS } from '../mock-data';
import { Conversation, Message } from '../types';

export const inboxService = {
  async getConversations(workspaceId: string): Promise<Conversation[]> {
    return Promise.resolve(MOCK_CONVERSATIONS.filter((c) => c.workspaceId === workspaceId));
  },

  async sendMessage(conversationId: string, text: string, senderName: string = 'Support Agent'): Promise<Message> {
    const conv = MOCK_CONVERSATIONS.find((c) => c.id === conversationId);
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      sender: 'agent',
      senderName,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      channel: conv?.channel || 'instagram',
    };
    if (conv) {
      conv.messages.push(newMsg);
      conv.lastMessage = text;
      conv.lastMessageAt = new Date().toISOString();
      conv.status = 'open';
    }
    return Promise.resolve(newMsg);
  },
};
