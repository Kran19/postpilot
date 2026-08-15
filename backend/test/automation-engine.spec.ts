class InstagramPolicyTester {
  validate24HourMessagingWindow(lastInteractionAt: Date): { eligible: boolean; code: string; reason?: string } {
    const now = new Date().getTime();
    const elapsedHours = (now - lastInteractionAt.getTime()) / (1000 * 60 * 60);
    if (elapsedHours <= 24) {
      return { eligible: true, code: 'WINDOW_ACTIVE' };
    }
    return {
      eligible: false,
      code: 'WINDOW_EXPIRED',
      reason: `Instagram 24-hour messaging window closed (${Math.round(elapsedHours)} hours elapsed)`,
    };
  }

  validatePrivateReplyEligibility(commentCreatedAt: Date): { eligible: boolean; code: string; reason?: string } {
    const now = new Date().getTime();
    const elapsedDays = (now - commentCreatedAt.getTime()) / (1000 * 60 * 60 * 24);
    if (elapsedDays <= 7) {
      return { eligible: true, code: 'PRIVATE_REPLY_ELIGIBLE' };
    }
    return {
      eligible: false,
      code: 'PRIVATE_REPLY_EXPIRED',
      reason: 'Instagram Comment Private Replies must be dispatched within 7 days of comment creation',
    };
  }
}

function runAutomationPolicyAudit() {
  console.log('====================================================');
  console.log(' AUTOMATION ENGINE & CHANNEL POLICY TEST SUITE');
  console.log('====================================================');

  const policy = new InstagramPolicyTester();
  let passedCount = 0;

  // Test 1: 24-Hour Messaging Window Active (2 Hours Ago)
  const recentInteraction = new Date(Date.now() - 2 * 60 * 60 * 1000);
  const res1 = policy.validate24HourMessagingWindow(recentInteraction);
  if (res1.eligible && res1.code === 'WINDOW_ACTIVE') {
    console.log('✓ TEST 1 [24-Hour Window Active]: PASSED 🟢');
    passedCount++;
  } else {
    console.error('✗ TEST 1 FAILED!');
  }

  // Test 2: 24-Hour Messaging Window Expired (30 Hours Ago)
  const expiredInteraction = new Date(Date.now() - 30 * 60 * 60 * 1000);
  const res2 = policy.validate24HourMessagingWindow(expiredInteraction);
  if (!res2.eligible && res2.code === 'WINDOW_EXPIRED') {
    console.log('✓ TEST 2 [24-Hour Window Expired Blocked]: PASSED 🟢 (Policy Safety Triggered)');
    passedCount++;
  } else {
    console.error('✗ TEST 2 FAILED: Expired window was permitted!');
  }

  // Test 3: Comment Private Reply Eligible (3 Days Old)
  const recentComment = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
  const res3 = policy.validatePrivateReplyEligibility(recentComment);
  if (res3.eligible && res3.code === 'PRIVATE_REPLY_ELIGIBLE') {
    console.log('✓ TEST 3 [Private Reply Eligible (3 Days)]: PASSED 🟢');
    passedCount++;
  } else {
    console.error('✗ TEST 3 FAILED!');
  }

  // Test 4: Comment Private Reply Expired (10 Days Old)
  const oldComment = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
  const res4 = policy.validatePrivateReplyEligibility(oldComment);
  if (!res4.eligible && res4.code === 'PRIVATE_REPLY_EXPIRED') {
    console.log('✓ TEST 4 [Private Reply Expired Blocked (10 Days)]: PASSED 🟢 (Policy Safety Triggered)');
    passedCount++;
  } else {
    console.error('✗ TEST 4 FAILED: Expired comment private reply permitted!');
  }

  // Test 5: Keyword Condition Matcher ("PRICE" keyword in message)
  const messageText = 'Hi! What is the PRICE for your Pro plan?';
  const keywordRule = 'PRICE';
  const isKeywordMatch = messageText.toUpperCase().includes(keywordRule.toUpperCase());
  if (isKeywordMatch) {
    console.log('✓ TEST 5 [Trigger Condition Keyword Matcher]: PASSED 🟢');
    passedCount++;
  } else {
    console.error('✗ TEST 5 FAILED!');
  }

  console.log('====================================================');
  console.log(` POLICY SUMMARY: ${passedCount}/5 AUDITS PASSED 🟢`);
  console.log('====================================================');
}

runAutomationPolicyAudit();
