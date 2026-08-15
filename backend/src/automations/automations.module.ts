import { Module } from '@nestjs/common';
import { AutomationsService } from './automations.service';
import { AutomationsController } from './automations.controller';
import { AutomationEngineService } from './engine/automation-engine.service';
import { InstagramAdapter } from '../meta/adapters/instagram.adapter';
import { InstagramPolicy } from '../meta/policies/instagram.policy';
import { CryptoService } from '../common/crypto/crypto.service';
import { CredentialsService } from '../meta/credentials/credentials.service';

@Module({
  controllers: [AutomationsController],
  providers: [
    AutomationsService,
    AutomationEngineService,
    InstagramAdapter,
    InstagramPolicy,
    CryptoService,
    CredentialsService,
  ],
  exports: [AutomationsService, AutomationEngineService],
})
export class AutomationsModule {}
