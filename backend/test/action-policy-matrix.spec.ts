class ActionPolicyEngine {
  evaluatePolicy(context: { actionType: string; lastInteractionAt?: Date; commentCreatedAt?: Date; replyCount?: number; isLive?: boolean }) {
    const now = Date.now();
    switch (context.actionType) {
      case 'INSTAGRAM_DM_RESPONSE':
        if (!context.lastInteractionAt) return { allowed: false, code: 'MISSING_TIMESTAMP' };
        return (now - context.lastInteractionAt.getTime()) / 3600000 <= 24
          ? { allowed: true, code: 'INSTAGRAM_DM_WINDOW_ACTIVE' }
          : { allowed: false, code: 'INSTAGRAM_DM_WINDOW_EXPIRED' };

      case 'INSTAGRAM_PRIVATE_COMMENT_REPLY':
        if (context.isLive) return { allowed: false, code: 'INSTAGRAM_LIVE_NOT_SUPPORTED' };
        if ((context.replyCount || 0) >= 1) return { allowed: false, code: 'PRIVATE_REPLY_LIMIT_EXCEEDED' };
        if (!context.commentCreatedAt) return { allowed: false, code: 'MISSING_TIMESTAMP' };
        return (now - context.commentCreatedAt.getTime()) / (3600000 * 24) <= 7
          ? { allowed: true, code: 'INSTAGRAM_PRIVATE_REPLY_ELIGIBLE' }
          : { allowed: false, code: 'INSTAGRAM_PRIVATE_REPLY_EXPIRED' };

      case 'INSTAGRAM_FOLLOW_UP':
        if (!context.lastInteractionAt) return { allowed: false, code: 'NO_ENGAGEMENT' };
        return (now - context.lastInteractionAt.getTime()) / 3600000 <= 24
          ? { allowed: true, code: 'FOLLOW_UP_ALLOWED' }
          : { allowed: false, code: 'FOLLOW_UP_BLOCKED_OUTSIDE_WINDOW' };

      case 'FACEBOOK_MESSENGER_RESPONSE':
        if (!context.lastInteractionAt) return { allowed: false, code: 'NO_ENGAGEMENT' };
        return (now - context.lastInteractionAt.getTime()) / 3600000 <= 24
          ? { allowed: true, code: 'FB_24H_WINDOW_ACTIVE' }
          : { allowed: false, code: 'FB_24H_WINDOW_EXPIRED' };

      default:
        return { allowed: false, code: 'POLICY_UNKNOWN' };
    }
  }
}

function runActionPolicyMatrixAudit() {
  console.log('====================================================');
  console.log(' META ACTION-SPECIFIC POLICY MATRIX AUDIT');
  console.log('====================================================');

  const engine = new ActionPolicyEngine();
  let passedCount = 0;
  const now = Date.now();

  // Test 1: Instagram DM Response (Active Window - 5 Hours Ago)
  const dm1 = engine.evaluatePolicy({ actionType: 'INSTAGRAM_DM_RESPONSE', lastInteractionAt: new Date(now - 5 * 3600000) });
  if (dm1.allowed && dm1.code === 'INSTAGRAM_DM_WINDOW_ACTIVE') {
    console.log('✓ TEST 1 [Instagram DM 24h Window Active]: PASSED 🟢');
    passedCount++;
  }

  // Test 2: Instagram DM Response (Expired Window - 36 Hours Ago)
  const dm2 = engine.evaluatePolicy({ actionType: 'INSTAGRAM_DM_RESPONSE', lastInteractionAt: new Date(now - 36 * 3600000) });
  if (!dm2.allowed && dm2.code === 'INSTAGRAM_DM_WINDOW_EXPIRED') {
    console.log('✓ TEST 2 [Instagram DM Expired Window Blocked]: PASSED 🟢');
    passedCount++;
  }

  // Test 3: Instagram Private Comment Reply (Day 1 Eligible)
  const pr1 = engine.evaluatePolicy({ actionType: 'INSTAGRAM_PRIVATE_COMMENT_REPLY', commentCreatedAt: new Date(now - 1 * 86400000), replyCount: 0 });
  if (pr1.allowed && pr1.code === 'INSTAGRAM_PRIVATE_REPLY_ELIGIBLE') {
    console.log('✓ TEST 3 [Private Reply Day 1 Eligible]: PASSED 🟢');
    passedCount++;
  }

  // Test 4: Instagram Private Comment Reply (Day 6 Eligible)
  const pr6 = engine.evaluatePolicy({ actionType: 'INSTAGRAM_PRIVATE_COMMENT_REPLY', commentCreatedAt: new Date(now - 6 * 86400000), replyCount: 0 });
  if (pr6.allowed && pr6.code === 'INSTAGRAM_PRIVATE_REPLY_ELIGIBLE') {
    console.log('✓ TEST 4 [Private Reply Day 6 Eligible]: PASSED 🟢');
    passedCount++;
  }

  // Test 5: Instagram Private Comment Reply (Day 7 Boundary Eligible)
  const pr7 = engine.evaluatePolicy({ actionType: 'INSTAGRAM_PRIVATE_COMMENT_REPLY', commentCreatedAt: new Date(now - 6.9 * 86400000), replyCount: 0 });
  if (pr7.allowed && pr7.code === 'INSTAGRAM_PRIVATE_REPLY_ELIGIBLE') {
    console.log('✓ TEST 5 [Private Reply Day 7 Boundary Eligible]: PASSED 🟢');
    passedCount++;
  }

  // Test 6: Instagram Private Comment Reply (Day 8 Expired Blocked)
  const pr8 = engine.evaluatePolicy({ actionType: 'INSTAGRAM_PRIVATE_COMMENT_REPLY', commentCreatedAt: new Date(now - 8 * 86400000), replyCount: 0 });
  if (!pr8.allowed && pr8.code === 'INSTAGRAM_PRIVATE_REPLY_EXPIRED') {
    console.log('✓ TEST 6 [Private Reply Day 8 Expired Blocked]: PASSED 🟢');
    passedCount++;
  }

  // Test 7: Instagram Private Comment Reply (Duplicate Reply Attempt Blocked)
  const prDup = engine.evaluatePolicy({ actionType: 'INSTAGRAM_PRIVATE_COMMENT_REPLY', commentCreatedAt: new Date(now - 1 * 86400000), replyCount: 1 });
  if (!prDup.allowed && prDup.code === 'PRIVATE_REPLY_LIMIT_EXCEEDED') {
    console.log('✓ TEST 7 [Duplicate Private Reply Blocked]: PASSED 🟢');
    passedCount++;
  }

  // Test 8: Instagram Live Comment Private Reply (Blocked)
  const prLive = engine.evaluatePolicy({ actionType: 'INSTAGRAM_PRIVATE_COMMENT_REPLY', commentCreatedAt: new Date(now - 1 * 86400000), replyCount: 0, isLive: true });
  if (!prLive.allowed && prLive.code === 'INSTAGRAM_LIVE_NOT_SUPPORTED') {
    console.log('✓ TEST 8 [Instagram Live Comment Private Reply Blocked]: PASSED 🟢');
    passedCount++;
  }

  // Test 9: Facebook Messenger Standard 24h Window Active
  const fb1 = engine.evaluatePolicy({ actionType: 'FACEBOOK_MESSENGER_RESPONSE', lastInteractionAt: new Date(now - 12 * 3600000) });
  if (fb1.allowed && fb1.code === 'FB_24H_WINDOW_ACTIVE') {
    console.log('✓ TEST 9 [Facebook Messenger 24h Window Active]: PASSED 🟢');
    passedCount++;
  }

  // Test 10: Unknown Action Policy (Safe Failure)
  const unk = engine.evaluatePolicy({ actionType: 'UNKNOWN_CUSTOM_ACTION' });
  if (!unk.allowed && unk.code === 'POLICY_UNKNOWN') {
    console.log('✓ TEST 10 [Unknown Action Safe Failure]: PASSED 🟢 (POLICY_UNKNOWN Blocked)');
    passedCount++;
  }

  console.log('====================================================');
  console.log(` POLICY MATRIX SUMMARY: ${passedCount}/10 AUDITS PASSED 🟢`);
  console.log('====================================================');
}

runActionPolicyMatrixAudit();
