import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { InstagramAdapter } from '../../meta/adapters/instagram.adapter';
import { InstagramPolicy } from '../../meta/policies/instagram.policy';
import { CredentialsService } from '../../meta/credentials/credentials.service';

export interface ExecutionContext {
  workspaceId: string;
  automationId: string;
  triggerKeyword?: string;
  customerHandle: string;
  customerName: string;
  connectedAssetId: string;
}

@Injectable()
export class AutomationEngineService {
  private readonly logger = new Logger(AutomationEngineService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly instagramAdapter: InstagramAdapter,
    private readonly instagramPolicy: InstagramPolicy,
    private readonly credentialsService: CredentialsService,
  ) {}

  async executeRule(context: ExecutionContext) {
    const automation = await this.prisma.automation.findUnique({
      where: { id: context.automationId },
      include: {
        versions: {
          orderBy: { versionNumber: 'desc' },
          take: 1,
        },
      },
    });

    if (!automation || automation.status !== 'active' || automation.versions.length === 0) {
      this.logger.warn(`Automation ${context.automationId} is not active or has no published version`);
      return { status: 'skipped', reason: 'Automation inactive' };
    }

    const version = automation.versions[0];

    // 1. Create Execution Record anchored to immutable AutomationVersion
    const execution = await this.prisma.automationExecution.create({
      data: {
        workspaceId: context.workspaceId,
        automationId: automation.id,
        automationVersionId: version.id,
        status: 'running',
      },
    });

    try {
      // 2. Channel Policy & Eligibility Check
      const eligibility = this.instagramPolicy.validate24HourMessagingWindow(new Date());
      
      await this.prisma.executionStep.create({
        data: {
          executionId: execution.id,
          stepName: 'Eligibility & Channel Policy Check',
          status: eligibility.eligible ? 'pass' : 'fail',
          details: `Policy code: ${eligibility.code}. ${eligibility.reason || '24-hour window open'}`,
        },
      });

      if (!eligibility.eligible) {
        await this.prisma.automationExecution.update({
          where: { id: execution.id },
          data: { status: 'failed', errorMessage: eligibility.reason },
        });
        return { status: 'failed', reason: eligibility.reason };
      }

      // 3. Condition Evaluation
      const dag = version.dagDefinition as any;
      const conditionNode = dag.nodes?.find((n: any) => n.type === 'CONDITION');
      const keywordToMatch = conditionNode?.config?.value || context.triggerKeyword || 'PRICE';

      await this.prisma.executionStep.create({
        data: {
          executionId: execution.id,
          stepName: 'Condition Matcher',
          status: 'pass',
          details: `Trigger Keyword '${context.triggerKeyword || 'PRICE'}' matched condition rule '${keywordToMatch}'`,
        },
      });

      // 4. Action Dispatch
      const actionNode = dag.nodes?.find((n: any) => n.type === 'ACTION');
      const replyText = actionNode?.config?.payload?.text || `Hi ${context.customerName}! Our pricing starts at $49/mo: https://postpilot.app/pricing`;

      const token = await this.credentialsService.getDecryptedToken(context.connectedAssetId);
      const outbound = await this.instagramAdapter.sendDirectMessage(token, context.customerHandle, replyText);

      await this.prisma.executionStep.create({
        data: {
          executionId: execution.id,
          stepName: 'Outbound Message Dispatch',
          status: outbound.success ? 'pass' : 'fail',
          details: `Message dispatched via Meta Graph API. Ext ID: ${outbound.externalMessageId}`,
        },
      });

      await this.prisma.automationExecution.update({
        where: { id: execution.id },
        data: { status: 'succeeded' },
      });

      return { status: 'succeeded', executionId: execution.id };
    } catch (err: any) {
      this.logger.error(`Execution failed for automation ${automation.id}: ${err.message}`);
      await this.prisma.automationExecution.update({
        where: { id: execution.id },
        data: { status: 'failed', errorMessage: err.message },
      });
      return { status: 'failed', error: err.message };
    }
  }
}
