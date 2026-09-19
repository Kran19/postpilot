import { Module } from '@nestjs/common';
import { CryptoService } from '../common/crypto/crypto.service';
import { CredentialsService } from './credentials/credentials.service';
import { MetaOauthService } from './oauth/meta-oauth.service';
import { ChannelsController } from './assets/channels.controller';
import { WhatsAppModule } from './whatsapp/whatsapp.module';

@Module({
  imports: [WhatsAppModule],
  controllers: [ChannelsController],
  providers: [CryptoService, CredentialsService, MetaOauthService],
  exports: [CredentialsService, MetaOauthService, WhatsAppModule],
})
export class MetaModule {}
