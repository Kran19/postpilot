import { ConfigService } from '@nestjs/config';
import { MetaOauthService } from '../src/meta/oauth/meta-oauth.service';
import { InstagramAdapter } from '../src/meta/adapters/instagram.adapter';
import { InstagramPolicy } from '../src/meta/policies/instagram.policy';

async function runRemediationTests() {
  console.log('================================================================');
  console.log(' POSTPILOT META APP REVIEW REJECTION REMEDIATION TEST SUITE     ');
  console.log('================================================================');

  let passed = 0;
  let total = 0;

  function assert(testName: string, condition: boolean, extra?: string) {
    total++;
    if (condition) {
      console.log(`✓ [PASSED] ${testName} ${extra || '🟢'}`);
      passed++;
    } else {
      console.error(`❌ [FAILED] ${testName}`);
    }
  }

  // TEST 1: Requested Scopes in OAuth URL
  const mockConfig = {
    get: (key: string) => {
      if (key === 'META_APP_ID') return '4558736907726599';
      if (key === 'META_API_VERSION') return 'v21.0';
      if (key === 'META_REDIRECT_URI') return 'https://postpilot.vardaansmartsolutions.com/app/channels';
      return null;
    },
  } as unknown as ConfigService;

  const oauthService = new MetaOauthService(mockConfig, {} as any, {} as any);
  const oauthUrl = oauthService.generateOAuthUrl('ws-test-123');

  assert(
    '1. OAuth URL Contains instagram_business_basic',
    oauthUrl.includes('instagram_business_basic'),
    '(Required for Profile & Media Access)'
  );

  assert(
    '2. OAuth URL Contains instagram_business_manage_messages',
    oauthUrl.includes('instagram_business_manage_messages'),
    '(Required for Customer DMs)'
  );

  assert(
    '3. OAuth URL Contains instagram_business_manage_comments',
    oauthUrl.includes('instagram_business_manage_comments'),
    '(Required for Comment Automations)'
  );

  assert(
    '4. OAuth URL Target App ID Matches 4558736907726599',
    oauthUrl.includes('client_id=4558736907726599'),
    '(Exact Submission App ID)'
  );

  // TEST 2: Policy Window Checks
  const policy = new InstagramPolicy();

  // 24 hour messaging window
  const recentInteraction = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
  const res24h = policy.validate24HourMessagingWindow(recentInteraction);
  assert(
    '5. Instagram Policy 24h Window Passes for Recent Message',
    res24h.eligible === true,
    '(Active 2h interaction)'
  );

  const staleInteraction = new Date(Date.now() - 26 * 60 * 60 * 1000); // 26 hours ago
  const resExpired24h = policy.validate24HourMessagingWindow(staleInteraction);
  assert(
    '6. Instagram Policy 24h Window Blocks Expired Message',
    resExpired24h.eligible === false,
    '(Expired 26h interaction)'
  );

  // 7 day comment private reply window
  const recentComment = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
  const resComment = policy.evaluatePolicy({
    actionType: 'INSTAGRAM_PRIVATE_COMMENT_REPLY',
    commentCreatedAt: recentComment,
    privateReplyCount: 0,
  });
  assert(
    '7. Instagram Comment Private Reply Allowed on Day 2',
    resComment.allowed === true,
    '(Within 7-day limit)'
  );

  const staleComment = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000); // 8 days ago
  const resExpiredComment = policy.evaluatePolicy({
    actionType: 'INSTAGRAM_PRIVATE_COMMENT_REPLY',
    commentCreatedAt: staleComment,
    privateReplyCount: 0,
  });
  assert(
    '8. Instagram Comment Private Reply Blocked on Day 8',
    resExpiredComment.allowed === false,
    '(Outside 7-day limit)'
  );

  // Duplicate comment private reply check
  const duplicateReply = policy.evaluatePolicy({
    actionType: 'INSTAGRAM_PRIVATE_COMMENT_REPLY',
    commentCreatedAt: recentComment,
    privateReplyCount: 1,
  });
  assert(
    '9. Duplicate Instagram Comment Private Reply Blocked',
    duplicateReply.allowed === false,
    '(Only 1 private reply per comment allowed)'
  );

  // TEST 3: Outbound Adapter Contract
  const adapter = new InstagramAdapter();
  const mockToken = 'mock_token_dev';
  const outboundDm = await adapter.sendDirectMessage(mockToken, 'ig_user_123', 'Hello from PostPilot');
  assert(
    '10. Instagram Adapter Outbound DM Generates External ID',
    outboundDm.success && !!outboundDm.externalMessageId,
    `(${outboundDm.externalMessageId})`
  );

  const outboundComment = await adapter.sendCommentReply(mockToken, 'comment_456', 'Thank you!');
  assert(
    '11. Instagram Adapter Outbound Comment Reply Generates External ID',
    outboundComment.success && !!outboundComment.externalMessageId,
    `(${outboundComment.externalMessageId})`
  );

  console.log('================================================================');
  console.log(` REMEDIATION AUDIT: ${passed}/${total} CHECKS PASSED 🟢`);
  console.log('================================================================\n');

  if (passed !== total) process.exit(1);
}

runRemediationTests();
