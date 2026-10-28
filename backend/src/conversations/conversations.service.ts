import { Injectable, NotFoundException, Optional, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CredentialsService } from '../meta/credentials/credentials.service';

@Injectable()
export class ConversationsService {
  private readonly logger = new Logger(ConversationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Optional() private readonly credentialsService?: CredentialsService,
  ) {}

  private async resolveWorkspaceId(workspaceId: string): Promise<string> {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(workspaceId)) {
      return workspaceId;
    }
    const ws = await this.prisma.workspace.findFirst({
      where: {
        OR: [
          { slug: workspaceId },
          { name: { contains: workspaceId, mode: 'insensitive' } },
        ],
      },
    });
    if (ws) return ws.id;

    // Fallback to first available workspace in database
    const fallback = await this.prisma.workspace.findFirst();
    return fallback ? fallback.id : workspaceId;
  }

  async getWorkspaceConversations(workspaceIdParam: string) {
    const workspaceId = await this.resolveWorkspaceId(workspaceIdParam);

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
          lastInteractionAt: c.lastMessageAt ? c.lastMessageAt.toISOString() : new Date().toISOString(),
        },
        lastMessage: lastMsg ? lastMsg.text : 'No messages yet',
        lastMessageAt: c.lastMessageAt ? c.lastMessageAt.toISOString() : new Date().toISOString(),
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

  async sendMessage(workspaceIdParam: string, conversationId: string, text: string, agentName: string) {
    const workspaceId = await this.resolveWorkspaceId(workspaceIdParam);

    const conv = await this.prisma.conversation.findFirst({
      where: { id: conversationId, workspaceId },
      include: {
        contact: {
          include: { identities: true },
        },
      },
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

    // Check if channel is instagram and attempt live dispatch
    if (conv.channel === 'instagram') {
      const recipientIdentity = conv.contact.identities.find((i) => i.channel === 'instagram');
      const recipientId = recipientIdentity ? recipientIdentity.externalUserId : null;

      let token = process.env.INSTAGRAM_TEST_ACCESS_TOKEN || '';
      if (this.credentialsService && conv.connectedAssetId) {
        try {
          const decrypted = await this.credentialsService.getDecryptedToken(conv.connectedAssetId);
          if (decrypted) token = decrypted;
        } catch (e: any) {
          this.logger.warn(`Could not load decrypted token for asset ${conv.connectedAssetId}: ${e.message}`);
        }
      }

      if (recipientId && token && (token.startsWith('EAA') || token.startsWith('IGA'))) {
        try {
          const endpoint = token.startsWith('IGA')
            ? 'https://graph.instagram.com/v21.0/me/messages'
            : 'https://graph.facebook.com/v21.0/me/messages';

          const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              recipient: { id: recipientId },
              message: { text },
            }),
          });
          const resData = await res.json();
          if (resData?.message_id) {
            await this.prisma.message.update({
              where: { id: message.id },
              data: { externalMessageId: resData.message_id, status: 'delivered' },
            });
            this.logger.log(`Live Instagram DM successfully delivered: ${resData.message_id}`);
          } else if (resData?.error) {
            this.logger.error(`Live Meta Graph API DM error: ${resData.error.message}`);
          }
        } catch (e: any) {
          this.logger.error(`Live Meta Graph API request exception: ${e.message}`);
        }
      }
    }

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
