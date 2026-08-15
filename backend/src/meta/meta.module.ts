import { Module } from '@nestjs/common';
import { CryptoService } from '../common/crypto/crypto.service';
import { CredentialsService } from './credentials/credentials.service';
import { MetaOauthService } from './oauth/meta-oauth.service';
import { ChannelsController } from './assets/channels.controller';

@Module({
  controllers: [ChannelsController],
  providers: [CryptoService, CredentialsService, MetaOauthService],
  exports: [CredentialsService, MetaOauthService],
})
export class MetaModule {}
