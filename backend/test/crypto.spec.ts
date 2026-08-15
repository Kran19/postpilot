import * as crypto from 'crypto';

class StandaloneCryptoEngine {
  private readonly algorithm = 'aes-256-gcm';
  private readonly key: Buffer;

  constructor(hexKey: string) {
    this.key = Buffer.from(hexKey.slice(0, 64), 'hex');
  }

  encrypt(text: string): string {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
  }

  decrypt(encryptedText: string): string {
    const parts = encryptedText.split(':');
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted payload format');
    }
    const [ivHex, authTagHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

function runCryptoSecurityAudit() {
  console.log('====================================================');
  console.log(' CRYPTO SECURITY AUDIT: AES-256-GCM TAMPER SUITE');
  console.log('====================================================');

  const hexKey = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
  const cryptoEngine = new StandaloneCryptoEngine(hexKey);
  let passedCount = 0;

  // Test 1: Plaintext -> Encrypt -> Decrypt -> Match
  const originalToken = 'EAAG_mock_meta_access_token_super_secret_99812';
  const encryptedPayload = cryptoEngine.encrypt(originalToken);
  const decryptedToken = cryptoEngine.decrypt(encryptedPayload);

  if (decryptedToken === originalToken) {
    console.log('✓ TEST 1 [AES-256-GCM Roundtrip Encryption]: PASSED 🟢');
    passedCount++;
  } else {
    console.error('✗ TEST 1 FAILED: Decrypted token does not match original!');
  }

  // Test 2: Tamper Detection (Corrupt Ciphertext)
  const parts = encryptedPayload.split(':');
  const ivHex = parts[0];
  const authTagHex = parts[1];
  const tamperedCiphertext = parts[2].substring(0, parts[2].length - 2) + 'ff';
  const tamperedPayload = `${ivHex}:${authTagHex}:${tamperedCiphertext}`;

  let tamperDetected = false;
  try {
    cryptoEngine.decrypt(tamperedPayload);
  } catch {
    tamperDetected = true;
  }

  if (tamperDetected) {
    console.log('✓ TEST 2 [GCM Ciphertext Tamper Detection]: PASSED 🟢 (AuthTag Error Caught)');
    passedCount++;
  } else {
    console.error('✗ TEST 2 FAILED: Tampered ciphertext was decrypted without error!');
  }

  // Test 3: Tamper Detection (Corrupt Auth Tag)
  const tamperedAuthTagPayload = `${ivHex}:ffffffffffffffffffffffffffffffff:${parts[2]}`;
  let authTagTamperDetected = false;
  try {
    cryptoEngine.decrypt(tamperedAuthTagPayload);
  } catch {
    authTagTamperDetected = true;
  }

  if (authTagTamperDetected) {
    console.log('✓ TEST 3 [GCM AuthTag Tamper Detection]: PASSED 🟢 (AuthTag Error Caught)');
    passedCount++;
  } else {
    console.error('✗ TEST 3 FAILED: Tampered auth tag was accepted!');
  }

  console.log('====================================================');
  console.log(` CRYPTO SUMMARY: ${passedCount}/3 AUDITS PASSED 🟢`);
  console.log('====================================================');
}

runCryptoSecurityAudit();
