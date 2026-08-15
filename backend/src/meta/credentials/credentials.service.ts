import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CryptoService } from '../../common/crypto/crypto.service';

@Injectable()
export class CredentialsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: CryptoService,
  ) {}

  async storeCredential(
    connectedAssetId: string,
    credentialType: string,
    providerAccountId: string,
    rawAccessToken: string,
    scopes: string[],
    expiresAt?: Date | null,
    rawRefreshToken?: string,
  ) {
    const encryptedAccessToken = this.cryptoService.encrypt(rawAccessToken);
    const encryptedRefreshToken = rawRefreshToken ? this.cryptoService.encrypt(rawRefreshToken) : null;

    return this.prisma.metaCredential.upsert({
      where: { connectedAssetId },
      create: {
        connectedAssetId,
        credentialType,
        providerAccountId,
        encryptedAccessToken,
        encryptedRefreshToken,
        scopes,
        issuedAt: new Date(),
        expiresAt,
        lastValidatedAt: new Date(),
        status: 'active',
      },
      update: {
        encryptedAccessToken,
        encryptedRefreshToken,
        scopes,
        expiresAt,
        lastValidatedAt: new Date(),
        status: 'active',
        revokedAt: null,
      },
    });
  }

  async getDecryptedToken(connectedAssetId: string): Promise<string> {
    const cred = await this.prisma.metaCredential.findUnique({
      where: { connectedAssetId },
    });
    if (!cred || cred.status !== 'active') {
      throw new NotFoundException(`Valid Meta credential not found for asset ${connectedAssetId}`);
    }
    return this.cryptoService.decrypt(cred.encryptedAccessToken);
  }

  async markTokenReauthRequired(connectedAssetId: string) {
    await this.prisma.metaCredential.update({
      where: { connectedAssetId },
      data: {
        status: 'reauth_required',
        lastValidatedAt: new Date(),
      },
    });

    await this.prisma.connectedAsset.update({
      where: { id: connectedAssetId },
      data: {
        status: 'reauth_required',
        errorMessage: 'Meta access token revoked or expired. Please reauthorize.',
      },
    });
  }
}
