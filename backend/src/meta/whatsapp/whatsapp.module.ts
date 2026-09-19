import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { WhatsAppController } from './whatsapp.controller';
import { WhatsAppService } from './whatsapp.service';
import { WhatsAppAdapter } from './whatsapp.adapter';
import { WhatsAppPolicyValidator } from './whatsapp.policy';

@Module({
  imports: [PrismaModule],
  controllers: [WhatsAppController],
  providers: [WhatsAppService, WhatsAppAdapter, WhatsAppPolicyValidator],
  exports: [WhatsAppService, WhatsAppAdapter, WhatsAppPolicyValidator],
})
export class WhatsAppModule {}
