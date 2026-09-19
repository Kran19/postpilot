export type WhatsAppTemplateStatus = 'draft' | 'pending' | 'approved' | 'rejected';
export type WhatsAppTemplateCategory = 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
export type WhatsAppHeaderType = 'NONE' | 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
export type WhatsAppButtonType = 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER' | 'FLOW' | 'CATALOG';

export interface WhatsAppTemplateButton {
  id: string;
  type: WhatsAppButtonType;
  text: string;
  url?: string;
  phoneNumber?: string;
  flowId?: string;
}

export interface WhatsAppTemplate {
  id: string;
  workspaceId: string;
  name: string;
  category: WhatsAppTemplateCategory;
  language: string; // e.g. 'en_US', 'es', 'pt_BR'
  status: WhatsAppTemplateStatus;
  rejectionReason?: string;
  headerType: WhatsAppHeaderType;
  headerContent?: string;
  bodyText: string;
  footerText?: string;
  buttons: WhatsAppTemplateButton[];
  variables: string[]; // e.g. ['{{1}}', '{{2}}']
  metaTemplateId?: string;
  usageCount: number;
  lastUpdated: string;
  createdAt: string;
}

export type WhatsAppCampaignStatus = 'draft' | 'scheduled' | 'running' | 'completed' | 'paused' | 'failed';

export interface WhatsAppCampaignAudienceFilter {
  allContacts: boolean;
  tags?: string[];
  status?: string[];
  lastInteractionDays?: number;
  city?: string;
}

export interface WhatsAppCampaign {
  id: string;
  workspaceId: string;
  name: string;
  templateId: string;
  templateName: string;
  audienceFilter: WhatsAppCampaignAudienceFilter;
  status: WhatsAppCampaignStatus;
  totalRecipients: number;
  deliveredCount: number;
  readCount: number;
  repliesCount: number;
  failedCount: number;
  scheduledAt?: string;
  completedAt?: string;
  createdAt: string;
}

export type WhatsAppFlowNodeType = 
  | 'screen' 
  | 'text_input' 
  | 'select' 
  | 'date_picker' 
  | 'time_picker' 
  | 'buttons' 
  | 'confirmation' 
  | 'api_lookup' 
  | 'create_lead' 
  | 'assign_agent' 
  | 'end';

export interface WhatsAppFlowNode {
  id: string;
  title: string;
  type: WhatsAppFlowNodeType;
  description?: string;
  fields?: {
    id: string;
    label: string;
    type: 'text' | 'number' | 'email' | 'phone' | 'date' | 'select';
    required: boolean;
    options?: string[];
  }[];
  nextStepId?: string;
}

export interface WhatsAppFlow {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  category: 'booking' | 'inquiry' | 'feedback' | 'lead_gen' | 'custom';
  nodes: WhatsAppFlowNode[];
  totalSessions: number;
  completionRate: number;
  lastUpdated: string;
  createdAt: string;
}

export interface WhatsAppMetrics {
  messagesToday: number;
  automationRuns: number;
  messagesDelivered: number;
  deliveryRate: number;
  messagesRead: number;
  readRate: number;
  customerReplies: number;
  replyRate: number;
  humanHandoffs: number;
  handoffRate: number;
  isDemoData?: boolean;
}

export interface WhatsAppActivityItem {
  id: string;
  customerName: string;
  customerPhone: string;
  customerHandle: string;
  automationName: string;
  timestamp: string;
  status: 'delivered' | 'read' | 'failed' | 'handoff' | 'running';
  actionTaken: string;
}

export interface WhatsAppBusinessSettings {
  wabaId: string;
  phoneNumberId: string;
  displayPhoneNumber: string;
  verifiedName: string;
  qualityRating: 'GREEN' | 'YELLOW' | 'RED' | 'UNKNOWN';
  messagingLimitTier: 'TIER_50K' | 'TIER_100K' | 'TIER_UNLIMITED';
  connectionStatus: 'connected' | 'reauth_required' | 'disconnected';
  webhookSla: string;
  webhookLatencyMs: number;
  businessHours: {
    enabled: boolean;
    timezone: string;
    schedule: { day: string; start: string; end: string; isOpen: boolean }[];
    offlineMessage: string;
  };
  defaultAssigneeId?: string;
  fallbackToHuman: boolean;
  rateLimitPerMinute: number;
}
