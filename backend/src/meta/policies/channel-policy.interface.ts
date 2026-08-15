export interface EligibilityCheckResult {
  eligible: boolean;
  code: string;
  reason?: string;
}

export interface ChannelPolicy {
  validate24HourMessagingWindow(lastInteractionAt: Date): EligibilityCheckResult;
  validatePrivateReplyEligibility(commentCreatedAt: Date): EligibilityCheckResult;
}
