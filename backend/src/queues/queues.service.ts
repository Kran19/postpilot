import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue, Worker, Job } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';

export interface WebhookJobPayload {
  eventId: string;
  channel: string;
  rawPayload: any;
}

export interface AutomationJobPayload {
  workspaceId: string;
  automationId: string;
  connectedAssetId: string;
  customerHandle: string;
  customerName: string;
  triggerKeyword?: string;
}

export interface OutboundJobPayload {
  workspaceId: string;
  connectedAssetId: string;
  recipientId: string;
  text: string;
  executionId: string;
}

@Injectable()
export class QueuesService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(QueuesService.name);
  private webhookQueue!: Queue<WebhookJobPayload>;
  private automationQueue!: Queue<AutomationJobPayload>;
  private outboundQueue!: Queue<OutboundJobPayload>;

  private webhookWorker?: Worker<WebhookJobPayload>;
  private automationWorker?: Worker<AutomationJobPayload>;
  private outboundWorker?: Worker<OutboundJobPayload>;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    const redisUrl = this.configService.get<string>('REDIS_URL') || 'redis://localhost:6379';
    const connection = { host: 'localhost', port: 6379 };

    const defaultJobOptions = {
      attempts: 5,
      backoff: {
        type: 'exponential' as const,
        delay: 1000, // 1s, 2s, 4s, 8s, 16s
      },
      removeOnComplete: 100,
      removeOnFail: 500,
    };

    // 1. Webhook Ingestion Queue
    this.webhookQueue = new Queue<WebhookJobPayload>('webhook-ingestion-queue', {
      connection,
      defaultJobOptions,
    });

    // 2. Automation Execution Queue
    this.automationQueue = new Queue<AutomationJobPayload>('automation-execution-queue', {
      connection,
      defaultJobOptions,
    });

    // 3. Meta Outbound Delivery Queue
    this.outboundQueue = new Queue<OutboundJobPayload>('meta-outbound-delivery-queue', {
      connection,
      defaultJobOptions,
    });

    this.logger.log('BullMQ Queues initialized: [webhook-ingestion, automation-execution, meta-outbound-delivery]');
  }

  async enqueueWebhook(payload: WebhookJobPayload) {
    return this.webhookQueue.add('process-webhook', payload, {
      jobId: `job_wh_${payload.eventId}`,
    });
  }

  async enqueueAutomation(payload: AutomationJobPayload) {
    return this.automationQueue.add('execute-automation', payload, {
      jobId: `job_auto_${payload.automationId}_${Date.now()}`,
    });
  }

  async enqueueOutbound(payload: OutboundJobPayload) {
    return this.outboundQueue.add('dispatch-outbound', payload, {
      jobId: `job_out_${payload.executionId}`,
    });
  }

  async onModuleDestroy() {
    await this.webhookQueue?.close();
    await this.automationQueue?.close();
    await this.outboundQueue?.close();
    await this.webhookWorker?.close();
    await this.automationWorker?.close();
    await this.outboundWorker?.close();
  }
}
