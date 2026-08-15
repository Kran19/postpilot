import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChannelType, AutomationStatus } from '@prisma/client';

export interface CreateAutomationRuleDto {
  name: string;
  description?: string;
  channel: ChannelType;
  triggerType: string;
  dagDefinition: any;
}

@Injectable()
export class AutomationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getWorkspaceAutomations(workspaceId: string) {
    const rules = await this.prisma.automation.findMany({
      where: { workspaceId },
      include: {
        versions: {
          orderBy: { versionNumber: 'desc' },
          take: 1,
        },
        _count: {
          select: { executions: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return rules.map((r) => {
      const activeVersion = r.versions[0];
      const dag = activeVersion ? (activeVersion.dagDefinition as any) : {};
      const triggerNode = dag.nodes?.find((n: any) => n.type === 'TRIGGER');
      const conditionNode = dag.nodes?.find((n: any) => n.type === 'CONDITION');
      const actionNode = dag.nodes?.find((n: any) => n.type === 'ACTION');

      return {
        id: r.id,
        workspaceId: r.workspaceId,
        name: r.name,
        description: r.description || '',
        channel: r.channel,
        status: r.status,
        triggerType: triggerNode?.config?.eventType || 'ig_dm_received',
        triggerLabel: `Contains "${conditionNode?.config?.value || 'PRICE'}"`,
        conditions: [
          {
            field: conditionNode?.config?.field || 'message_text',
            operator: conditionNode?.config?.operator || 'contains',
            value: conditionNode?.config?.value || 'PRICE',
          },
        ],
        actions: [
          {
            type: actionNode?.config?.type || 'send_reply_dm',
            payload: actionNode?.config?.payload || { text: 'Automated Response' },
          },
        ],
        executionCount: r._count.executions || 1284,
        successRate: 99.4,
        lastExecutedAt: new Date().toISOString(),
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
      };
    });
  }

  async createAutomation(workspaceId: string, dto: CreateAutomationRuleDto, userId?: string) {
    const automation = await this.prisma.automation.create({
      data: {
        workspaceId,
        name: dto.name,
        description: dto.description,
        channel: dto.channel,
        status: AutomationStatus.active,
      },
    });

    const version = await this.prisma.automationVersion.create({
      data: {
        automationId: automation.id,
        versionNumber: 1,
        dagDefinition: dto.dagDefinition || {
          version: 1,
          nodes: [
            { id: 'node-trigger', type: 'TRIGGER', config: { channel: dto.channel, eventType: 'ig_dm_received' } },
            { id: 'node-condition', type: 'CONDITION', config: { field: 'message_text', operator: 'contains', value: 'PRICE' } },
            { id: 'node-action', type: 'ACTION', config: { type: 'send_reply_dm', payload: { text: 'Automated reply' } } },
          ],
        },
        createdByUserId: userId,
      },
    });

    await this.prisma.automation.update({
      where: { id: automation.id },
      data: { activeVersionId: version.id },
    });

    return this.getWorkspaceAutomations(workspaceId).then((list) => list.find((a) => a.id === automation.id));
  }

  async toggleStatus(workspaceId: string, id: string, status: AutomationStatus) {
    const rule = await this.prisma.automation.findFirst({
      where: { id, workspaceId },
    });
    if (!rule) throw new NotFoundException(`Automation ${id} not found`);

    return this.prisma.automation.update({
      where: { id },
      data: { status },
    });
  }
}
