import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getWorkspaceConversations(workspaceId: string) {
    const convs = await this.prisma.conversation.findMany({
      where: { workspaceId },
      include: {
        contact: {
          include: {
            identities: true,
          },
        },
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { lastMessageAt: 'desc' },
    });

    return convs.map((c) => {
      const lastMsg = c.messages[c.messages.length - 1];
      const identity = c.contact.identities.find((i) => i.channel === c.channel) || c.contact.identities[0];

      return {
        id: c.id,
        workspaceId: c.workspaceId,
        channel: c.channel,
        customer: {
          id: c.contact.id,
          name: c.contact.name,
          handle: identity ? identity.handle : '@customer',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          totalMessages: c.messages.length,
          lastInteractionAt: c.lastMessageAt.toISOString(),
        },
        lastMessage: lastMsg ? lastMsg.text : 'No messages yet',
        lastMessageAt: c.lastMessageAt.toISOString(),
        unread: false,
        status: c.status,
        tags: (c.contact.tags as string[]) || ['VIP Lead', 'Price Inquiry'],
        messages: c.messages.map((m) => ({
          id: m.id,
          conversationId: m.conversationId,
          sender: m.senderType,
          senderName: m.senderType === 'customer' ? c.contact.name : m.senderType === 'bot' ? 'POSTPILOT Bot' : 'Agent',
          text: m.text,
          timestamp: m.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          automationName: m.automationRuleId ? 'Price Inquiry Auto Reply' : undefined,
        })),
      };
    });
  }

  async sendMessage(workspaceId: string, conversationId: string, text: string, agentName: string) {
    const conv = await this.prisma.conversation.findFirst({
      where: { id: conversationId, workspaceId },
    });
    if (!conv) throw new NotFoundException(`Conversation ${conversationId} not found`);

    const message = await this.prisma.message.create({
      data: {
        conversationId,
        senderType: 'agent',
        text,
      },
    });

    await this.prisma.conversation.update({
      where: { id: conversationId },
      data: { lastMessageAt: new Date(), status: 'open' },
    });

    return {
      id: message.id,
      conversationId: message.conversationId,
      sender: 'agent',
      senderName: agentName || 'Support Agent',
      text: message.text,
      timestamp: message.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }
}
