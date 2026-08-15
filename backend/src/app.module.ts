import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { MetaModule } from './meta/meta.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { AutomationsModule } from './automations/automations.module';
import { ConversationsModule } from './conversations/conversations.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PrismaModule,
    AuthModule,
    WorkspacesModule,
    MetaModule,
    WebhooksModule,
    AutomationsModule,
    ConversationsModule,
    AnalyticsModule,
    HealthModule,
  ],
})
export class AppModule {}
