import * as crypto from 'crypto';

class WebhookSignatureVerifier {
  verifyHmacSignature(rawBodyBuffer: Buffer, signatureHeader?: string, appSecret?: string): boolean {
    if (!signatureHeader || !appSecret) return false;
    const parts = signatureHeader.split('=');
    if (parts.length !== 2 || parts[0] !== 'sha256') return false;
    const expectedSig = parts[1];

    const hmac = crypto.createHmac('sha256', appSecret);
    hmac.update(rawBodyBuffer);
    const calculatedSig = hmac.digest('hex');

    try {
      return crypto.timingSafeEqual(Buffer.from(expectedSig, 'hex'), Buffer.from(calculatedSig, 'hex'));
    } catch {
      return false;
    }
  }

  generateDeduplicationKey(rawPayload: any): string {
    if (rawPayload.entry && rawPayload.entry[0]?.messaging && rawPayload.entry[0].messaging[0]?.message?.mid) {
      return `ext_msg_${rawPayload.entry[0].messaging[0].message.mid}`;
    }
    if (rawPayload.entry && rawPayload.entry[0]?.changes && rawPayload.entry[0].changes[0]?.value?.comment_id) {
      return `ext_comment_${rawPayload.entry[0].changes[0].value.comment_id}`;
    }
    const hash = crypto.createHash('sha256').update(JSON.stringify(rawPayload)).digest('hex').substring(0, 16);
    return `ext_hash_${hash}`;
  }
}

function runWebhookSignatureAudit() {
  console.log('====================================================');
  console.log(' WEBHOOK SECURITY AUDIT: HMAC SHA-256 SUITE');
  console.log('====================================================');

  const verifier = new WebhookSignatureVerifier();
  const appSecret = 'mock_meta_app_secret_890123981';
  let passedCount = 0;

  const rawBody = Buffer.from(JSON.stringify({ object: 'page', entry: [{ id: '109283', messaging: [{ message: { mid: 'mid.10928301' } }] }] }));
  
  // Calculate valid signature
  const validHmac = crypto.createHmac('sha256', appSecret).update(rawBody).digest('hex');
  const validHeader = `sha256=${validHmac}`;

  // Test 1: Valid HMAC Signature
  const isValid = verifier.verifyHmacSignature(rawBody, validHeader, appSecret);
  if (isValid) {
    console.log('✓ TEST 1 [Valid HMAC SHA-256 Signature]: PASSED 🟢');
    passedCount++;
  } else {
    console.error('✗ TEST 1 FAILED!');
  }

  // Test 2: Invalid Secret Signature
  const invalidSigHeader = 'sha256=1111222233334444555566667777888899990000111122223333444455556666';
  const isInvalid = verifier.verifyHmacSignature(rawBody, invalidSigHeader, appSecret);
  if (!isInvalid) {
    console.log('✓ TEST 2 [Invalid Signature Rejected]: PASSED 🟢');
    passedCount++;
  } else {
    console.error('✗ TEST 2 FAILED: Invalid signature accepted!');
  }

  // Test 3: Tampered Body Payload
  const tamperedBody = Buffer.from(JSON.stringify({ object: 'page', entry: [{ id: '999999' }] }));
  const isTamperedValid = verifier.verifyHmacSignature(tamperedBody, validHeader, appSecret);
  if (!isTamperedValid) {
    console.log('✓ TEST 3 [Tampered Body Payload Rejected]: PASSED 🟢');
    passedCount++;
  } else {
    console.error('✗ TEST 3 FAILED: Tampered body was accepted!');
  }

  // Test 4: Deduplication Key Generation (Instagram DM)
  const dmPayload = { entry: [{ messaging: [{ message: { mid: 'mid.ig.981023981' } }] }] };
  const dmDedupKey = verifier.generateDeduplicationKey(dmPayload);
  if (dmDedupKey === 'ext_msg_mid.ig.981023981') {
    console.log('✓ TEST 4 [Native DM Deduplication Key]: PASSED 🟢 (ext_msg_mid.ig.981023981)');
    passedCount++;
  } else {
    console.error('✗ TEST 4 FAILED!');
  }

  // Test 5: Deduplication Key Generation (Comment Auto DM)
  const commentPayload = { entry: [{ changes: [{ value: { comment_id: 'comment_10928301' } }] }] };
  const commentDedupKey = verifier.generateDeduplicationKey(commentPayload);
  if (commentDedupKey === 'ext_comment_comment_10928301') {
    console.log('✓ TEST 5 [Native Comment Deduplication Key]: PASSED 🟢 (ext_comment_comment_10928301)');
    passedCount++;
  } else {
    console.error('✗ TEST 5 FAILED!');
  }

  console.log('====================================================');
  console.log(` WEBHOOK SUMMARY: ${passedCount}/5 AUDITS PASSED 🟢`);
  console.log('====================================================');
}

runWebhookSignatureAudit();
