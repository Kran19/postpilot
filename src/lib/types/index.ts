export type ChannelType = 'instagram' | 'facebook' | 'whatsapp' | 'threads';

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'expired' | 'reauth_required';

export interface ConnectedAsset {
  id: string;
  workspaceId: string;
  channel: ChannelType;
  name: string;
  handleOrNumber: string;
  avatarUrl?: string;
  status: ConnectionStatus;
  lastSyncedAt: string;
  permissions: string[];
  followerCount?: number;
  tokenExpiresAt?: string;
  errorMessage?: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  plan: 'free' | 'pro' | 'business' | 'agency';
  memberCount: number;
  assetsCount: number;
  automationsCount: number;
  createdAt: string;
}

export type Role = 'owner' | 'admin' | 'manager' | 'agent';

export interface TeamMember {
  id: string;
  workspaceId: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: Role;
  status: 'active' | 'invited' | 'disabled';
  joinedAt: string;
}

export type TriggerType = 
  | 'ig_dm_received' 
  | 'ig_comment_created' 
  | 'fb_message_received' 
  | 'fb_comment_created'
  | 'wa_message_received'
  | 'threads_reply_received';

export type ConditionOperator = 'contains' | 'equals' | 'starts_with' | 'matches_regex' | 'any';

export interface AutomationCondition {
  id: string;
  field: 'message_text' | 'keyword' | 'sender_followers' | 'time_of_day';
  operator: ConditionOperator;
  value: string;
}

export type ActionType = 
  | 'send_reply_dm' 
  | 'send_comment_reply' 
  | 'send_wa_template' 
  | 'assign_to_agent' 
  | 'add_tag'
  | 'webhook_post';

export interface AutomationAction {
  id: string;
  type: ActionType;
  payload: {
    text?: string;
    templateId?: string;
    tag?: string;
    agentId?: string;
    url?: string;
  };
}

export type AutomationStatus = 'active' | 'paused' | 'draft' | 'error';

export interface AutomationRule {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  channel: ChannelType;
  status: AutomationStatus;
  triggerType: TriggerType;
  triggerLabel: string;
  conditions: AutomationCondition[];
  actions: AutomationAction[];
  executionCount: number;
  successRate: number;
  lastExecutedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExecutionLog {
  id: string;
  automationId: string;
  automationName: string;
  workspaceId: string;
  channel: ChannelType;
  customerHandle: string;
  customerName: string;
  status: 'success' | 'failed' | 'pending';
  steps: {
    timestamp: string;
    step: string;
    details: string;
    status: 'pass' | 'fail' | 'info';
  }[];
  errorMessage?: string;
  executedAt: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  handle: string;
  channel: ChannelType;
  avatarUrl?: string;
  email?: string;
  phone?: string;
  tags: string[];
  totalMessages: number;
  lastInteractionAt: string;
  notes?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: 'customer' | 'bot' | 'agent';
  senderName: string;
  text: string;
  timestamp: string;
  channel: ChannelType;
  automationName?: string;
  status?: 'sent' | 'delivered' | 'read' | 'failed';
}

export interface Conversation {
  id: string;
  workspaceId: string;
  channel: ChannelType;
  customer: CustomerProfile;
  lastMessage: string;
  lastMessageAt: string;
  unread: boolean;
  assignedAgent?: string;
  status: 'open' | 'automated' | 'resolved';
  tags: string[];
  messages: Message[];
}

export interface AnalyticsOverview {
  totalMessagesProcessed: number;
  automationsTriggered: number;
  successfulExecutions: number;
  failedExecutions: number;
  hoursSaved: number;
  averageResponseTimeSeconds: number;
  messagesProcessedChangePct: number;
  automationsTriggeredChangePct: number;
  channelBreakdown: {
    channel: ChannelType;
    count: number;
    pct: number;
  }[];
  dailyTrend: {
    date: string;
    processed: number;
    automated: number;
  }[];
}

export interface SubscriptionPlan {
  id: 'free' | 'pro' | 'business' | 'agency';
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  workspaceLimit: number;
  channelLimit: number;
  automationLimit: number;
  executionLimitMonthly: number;
  teamMemberLimit: number;
  isPopular?: boolean;
}

export interface MessageTemplate {
  id: string;
  workspaceId: string;
  name: string;
  channel: ChannelType;
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
  language: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  content: string;
  updatedAt: string;
}
