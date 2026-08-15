import * as crypto from 'crypto';

interface OAuthStateRecord {
  stateId: string;
  workspaceId: string;
  userId: string;
  expiresAt: Date;
  isUsed: boolean;
}

class OAuthStateStore {
  private states = new Map<string, OAuthStateRecord>();

  generateState(workspaceId: string, userId: string): string {
    const randomHex = crypto.randomBytes(32).toString('hex');
    const stateId = `state_${randomHex}`;
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    this.states.set(stateId, {
      stateId,
      workspaceId,
      userId,
      expiresAt,
      isUsed: false,
    });

    return stateId;
  }

  validateAndConsumeState(stateId?: string, expectedWorkspaceId?: string): { valid: boolean; code: string; reason?: string } {
    if (!stateId) {
      return { valid: false, code: 'MISSING_STATE', reason: 'OAuth callback missing state parameter.' };
    }

    const record = this.states.get(stateId);
    if (!record) {
      return { valid: false, code: 'INVALID_STATE', reason: 'OAuth state parameter not found or forged.' };
    }

    if (record.isUsed) {
      return { valid: false, code: 'STATE_REUSED', reason: 'OAuth state has already been consumed (Replay Attack Blocked).' };
    }

    if (new Date() > record.expiresAt) {
      return { valid: false, code: 'STATE_EXPIRED', reason: 'OAuth state parameter has expired.' };
    }

    if (expectedWorkspaceId && record.workspaceId !== expectedWorkspaceId) {
      return { valid: false, code: 'WORKSPACE_MISMATCH', reason: 'OAuth state belongs to a different workspace boundary.' };
    }

    // Mark as consumed (One-Time Use)
    record.isUsed = true;
    return { valid: true, code: 'STATE_VALID' };
  }
}

function runOAuthStateSecurityAudit() {
  console.log('====================================================');
  console.log(' OAUTH STATE SECURITY & REPLAY PROTECTION SUITE');
  console.log('====================================================');

  const store = new OAuthStateStore();
  let passedCount = 0;
  const workspaceId = 'ws-acme-studio';
  const userId = 'user-owner-101';

  // Test 1: Valid State Generation & Validation
  const validState = store.generateState(workspaceId, userId);
  const val1 = store.validateAndConsumeState(validState, workspaceId);
  if (val1.valid && val1.code === 'STATE_VALID') {
    console.log('✓ TEST 1 [Valid Cryptographic OAuth State]: PASSED 🟢');
    passedCount++;
  } else {
    console.error('✗ TEST 1 FAILED!');
  }

  // Test 2: Reused State Callback (Replay Attack)
  const valReused = store.validateAndConsumeState(validState, workspaceId);
  if (!valReused.valid && valReused.code === 'STATE_REUSED') {
    console.log('✓ TEST 2 [OAuth State Replay Attack Blocked]: PASSED 🟢 (One-Time Use Enforced)');
    passedCount++;
  } else {
    console.error('✗ TEST 2 FAILED: Reused state was accepted!');
  }

  // Test 3: Forged / Wrong State Callback (CSRF Attack)
  const valForged = store.validateAndConsumeState('state_forged_hacker_123456', workspaceId);
  if (!valForged.valid && valForged.code === 'INVALID_STATE') {
    console.log('✓ TEST 3 [Forged OAuth CSRF State Blocked]: PASSED 🟢');
    passedCount++;
  } else {
    console.error('✗ TEST 3 FAILED: Forged state was accepted!');
  }

  // Test 4: Workspace Mismatch State Callback (Cross-Tenant OAuth Attack)
  const tenantBState = store.generateState('ws-tenant-b', userId);
  const valCrossTenant = store.validateAndConsumeState(tenantBState, workspaceId);
  if (!valCrossTenant.valid && valCrossTenant.code === 'WORKSPACE_MISMATCH') {
    console.log('✓ TEST 4 [Cross-Tenant OAuth State Mismatch Blocked]: PASSED 🟢');
    passedCount++;
  } else {
    console.error('✗ TEST 4 FAILED: Cross-tenant OAuth state accepted!');
  }

  // Test 5: Missing State Callback
  const valMissing = store.validateAndConsumeState(undefined, workspaceId);
  if (!valMissing.valid && valMissing.code === 'MISSING_STATE') {
    console.log('✓ TEST 5 [Missing OAuth State Callback Blocked]: PASSED 🟢');
    passedCount++;
  } else {
    console.error('✗ TEST 5 FAILED: Missing state accepted!');
  }

  console.log('====================================================');
  console.log(` OAUTH STATE SUMMARY: ${passedCount}/5 AUDITS PASSED 🟢`);
  console.log('====================================================');
}

runOAuthStateSecurityAudit();
