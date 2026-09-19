import { Injectable, Logger } from '@nestjs/common';

export type PolicyActionType =
  | 'INSTAGRAM_DM_RESPONSE'
  | 'INSTAGRAM_PRIVATE_COMMENT_REPLY'
  | 'INSTAGRAM_FOLLOW_UP'
  | 'FACEBOOK_MESSENGER_RESPONSE';

export interface PolicyCheckContext {
  actionType: PolicyActionType;
  lastInteractionAt?: Date;
  commentCreatedAt?: Date;
  privateReplyCount?: number;
  isLiveComment?: boolean;
}

export interface PolicyDecision {
  allowed: boolean;
  code: string;
  reason?: string;
}

@Injectable()
export class InstagramPolicy {
  private readonly logger = new Logger(InstagramPolicy.name);

  validate24HourMessagingWindow(lastInteractionAt: Date = new Date()): { eligible: boolean; code: string; reason?: string } {
    const result = this.evaluatePolicy({ actionType: 'INSTAGRAM_DM_RESPONSE', lastInteractionAt });
    return {
      eligible: result.allowed,
      code: result.code,
      reason: result.reason,
    };
  }

  evaluatePolicy(context: PolicyCheckContext): PolicyDecision {
    switch (context.actionType) {
      case 'INSTAGRAM_DM_RESPONSE':
        return this.evaluateDmWindow(context.lastInteractionAt);

      case 'INSTAGRAM_PRIVATE_COMMENT_REPLY':
        return this.evaluatePrivateCommentReply(context.commentCreatedAt, context.privateReplyCount, context.isLiveComment);

      case 'INSTAGRAM_FOLLOW_UP':
        return this.evaluateFollowUp(context.lastInteractionAt);

      case 'FACEBOOK_MESSENGER_RESPONSE':
        return this.evaluateFacebookMessengerWindow(context.lastInteractionAt);

      default:
        this.logger.warn(`Unknown channel policy action type: ${context.actionType}`);
        return {
          allowed: false,
          code: 'POLICY_UNKNOWN',
          reason: `Action type '${context.actionType}' is unrecognised. Failing safely to prevent Meta policy penalty.`,
        };
    }
  }

  private evaluateDmWindow(lastInteractionAt?: Date): PolicyDecision {
    if (!lastInteractionAt) {
      return { allowed: false, code: 'MISSING_INTERACTION_TIMESTAMP', reason: 'No prior customer DM timestamp found.' };
    }
    const elapsedHours = (Date.now() - lastInteractionAt.getTime()) / (1000 * 60 * 60);
    if (elapsedHours <= 24) {
      return { allowed: true, code: 'INSTAGRAM_DM_WINDOW_ACTIVE' };
    }
    return {
      allowed: false,
      code: 'INSTAGRAM_DM_WINDOW_EXPIRED',
      reason: `Instagram 24-hour customer service window closed (${Math.round(elapsedHours)} hours elapsed).`,
    };
  }

  private evaluatePrivateCommentReply(commentCreatedAt?: Date, replyCount: number = 0, isLive: boolean = false): PolicyDecision {
    if (isLive) {
      return { allowed: false, code: 'INSTAGRAM_LIVE_NOT_SUPPORTED', reason: 'Private replies to Instagram Live comments are not supported by Meta Graph API.' };
    }
    if (replyCount >= 1) {
      return { allowed: false, code: 'PRIVATE_REPLY_LIMIT_EXCEEDED', reason: 'Meta limits Instagram comment private replies to exactly 1 private reply per comment.' };
    }
    if (!commentCreatedAt) {
      return { allowed: false, code: 'MISSING_COMMENT_TIMESTAMP', reason: 'Comment creation timestamp is required.' };
    }
    const elapsedDays = (Date.now() - commentCreatedAt.getTime()) / (1000 * 60 * 60 * 24);
    if (elapsedDays <= 7) {
      return { allowed: true, code: 'INSTAGRAM_PRIVATE_REPLY_ELIGIBLE' };
    }
    return {
      allowed: false,
      code: 'INSTAGRAM_PRIVATE_REPLY_EXPIRED',
      reason: `Instagram Comment Private Replies must be sent within 7 days of comment creation (${Math.round(elapsedDays)} days elapsed).`,
    };
  }

  private evaluateFollowUp(lastInteractionAt?: Date): PolicyDecision {
    if (!lastInteractionAt) {
      return { allowed: false, code: 'NO_CUSTOMER_ENGAGEMENT', reason: 'Cannot send outbound follow-up message without explicit customer initiation.' };
    }
    const elapsedHours = (Date.now() - lastInteractionAt.getTime()) / (1000 * 60 * 60);
    if (elapsedHours <= 24) {
      return { allowed: true, code: 'FOLLOW_UP_ALLOWED_WITHIN_WINDOW' };
    }
    return {
      allowed: false,
      code: 'FOLLOW_UP_BLOCKED_OUTSIDE_WINDOW',
      reason: 'Outbound follow-up messages outside 24-hour customer window require Meta Message Tag approval.',
    };
  }

  private evaluateFacebookMessengerWindow(lastInteractionAt?: Date): PolicyDecision {
    if (!lastInteractionAt) {
      return { allowed: false, code: 'FB_NO_INTERACTION', reason: 'No prior Messenger customer timestamp.' };
    }
    const elapsedHours = (Date.now() - lastInteractionAt.getTime()) / (1000 * 60 * 60);
    if (elapsedHours <= 24) {
      return { allowed: true, code: 'FB_24H_WINDOW_ACTIVE' };
    }
    return {
      allowed: false,
      code: 'FB_24H_WINDOW_EXPIRED',
      reason: 'Facebook Messenger 24-hour standard messaging window closed.',
    };
  }
}
