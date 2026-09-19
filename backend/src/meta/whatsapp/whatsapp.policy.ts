import { Injectable } from '@nestjs/common';

export interface PolicyEvaluationResult {
  isAllowed: boolean;
  reason?: string;
  isInside24hWindow: boolean;
  requiresTemplate: boolean;
}

@Injectable()
export class WhatsAppPolicyValidator {
  /**
   * Evaluates whether an outbound WhatsApp message is allowed under Meta's 24-hour customer care messaging window.
   */
  evaluateMessagingEligibility(
    lastUserMessageTimestamp?: Date | string | null,
    isTemplateMessage: boolean = false,
  ): PolicyEvaluationResult {
    if (isTemplateMessage) {
      // Pre-approved HSM templates can be dispatched outside the 24-hour window
      return {
        isAllowed: true,
        isInside24hWindow: false,
        requiresTemplate: true,
      };
    }

    if (!lastUserMessageTimestamp) {
      return {
        isAllowed: false,
        reason: 'No user interaction recorded. Outbound free-form messages require an active 24-hour messaging window or pre-approved HSM template.',
        isInside24hWindow: false,
        requiresTemplate: true,
      };
    }

    const lastInteraction = new Date(lastUserMessageTimestamp).getTime();
    const now = Date.now();
    const window24HoursMs = 24 * 60 * 60 * 1000;
    const isInsideWindow = now - lastInteraction <= window24HoursMs;

    if (!isInsideWindow) {
      return {
        isAllowed: false,
        reason: 'Outside Meta 24-hour customer care window. Must use pre-approved WhatsApp Template (HSM).',
        isInside24hWindow: false,
        requiresTemplate: true,
      };
    }

    return {
      isAllowed: true,
      isInside24hWindow: true,
      requiresTemplate: false,
    };
  }
}
