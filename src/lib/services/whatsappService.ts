import { 
  WhatsAppTemplate, 
  WhatsAppCampaign, 
  WhatsAppFlow, 
  WhatsAppMetrics, 
  WhatsAppActivityItem, 
  WhatsAppBusinessSettings 
} from '../types/whatsapp';

export const INITIAL_WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: 'tpl-wa-1',
    workspaceId: 'ws-acme',
    name: 'order_status_update',
    category: 'UTILITY',
    language: 'en_US',
    status: 'approved',
    headerType: 'TEXT',
    headerContent: 'Order Status Notification',
    bodyText: 'Hello {{1}},\nYour order #{{2}} has been shipped via {{3}}. Track your delivery live with the link below.',
    footerText: 'PostPilot Verified Merchant',
    buttons: [
      { id: 'b1', type: 'URL', text: 'Track Shipment', url: 'https://track.postpilot.app/{{2}}' },
      { id: 'b2', type: 'QUICK_REPLY', text: 'Contact Support' }
    ],
    variables: ['{{1}}', '{{2}}', '{{3}}'],
    metaTemplateId: 'meta-hsm-9812903',
    usageCount: 3120,
    lastUpdated: '2026-09-18T10:30:00Z',
    createdAt: '2026-08-10T09:00:00Z'
  },
  {
    id: 'tpl-wa-2',
    workspaceId: 'ws-acme',
    name: 'welcome_discount_offer',
    category: 'MARKETING',
    language: 'en_US',
    status: 'approved',
    headerType: 'IMAGE',
    headerContent: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600',
    bodyText: 'Hi {{1}} 👋\nWelcome to Acme Studio! Use code {{2}} to get {{3}}% off on your first order.',
    footerText: 'Terms & conditions apply',
    buttons: [
      { id: 'b3', type: 'URL', text: 'Claim Offer', url: 'https://acmestudio.io/promo' },
      { id: 'b4', type: 'QUICK_REPLY', text: 'Stop Promotions' }
    ],
    variables: ['{{1}}', '{{2}}', '{{3}}'],
    metaTemplateId: 'meta-hsm-4458921',
    usageCount: 1840,
    lastUpdated: '2026-09-15T14:15:00Z',
    createdAt: '2026-08-12T11:20:00Z'
  },
  {
    id: 'tpl-wa-3',
    workspaceId: 'ws-acme',
    name: 'account_verification_otp',
    category: 'AUTHENTICATION',
    language: 'en_US',
    status: 'approved',
    headerType: 'NONE',
    bodyText: '{{1}} is your PostPilot verification code. For security reasons, do not share this code with anyone.',
    footerText: 'Expires in 10 minutes',
    buttons: [
      { id: 'b5', type: 'QUICK_REPLY', text: 'Copy Code' }
    ],
    variables: ['{{1}}'],
    metaTemplateId: 'meta-hsm-1102948',
    usageCount: 920,
    lastUpdated: '2026-09-17T08:00:00Z',
    createdAt: '2026-08-15T16:45:00Z'
  },
  {
    id: 'tpl-wa-4',
    workspaceId: 'ws-acme',
    name: 'flash_sale_vip_exclusive',
    category: 'MARKETING',
    language: 'en_US',
    status: 'pending',
    headerType: 'TEXT',
    headerContent: 'VIP Early Access',
    bodyText: 'Hi {{1}}, our VIP Autumn collection is now live. Shop before anyone else with code {{2}}.',
    footerText: 'Valid for next 24 hours',
    buttons: [
      { id: 'b6', type: 'URL', text: 'Shop Autumn VIP', url: 'https://acmestudio.io/autumn' }
    ],
    variables: ['{{1}}', '{{2}}'],
    usageCount: 0,
    lastUpdated: '2026-09-19T06:00:00Z',
    createdAt: '2026-09-19T06:00:00Z'
  }
];

export const INITIAL_WHATSAPP_CAMPAIGNS: WhatsAppCampaign[] = [
  {
    id: 'camp-1',
    workspaceId: 'ws-acme',
    name: 'Autumn VIP Members Broadcast',
    templateId: 'tpl-wa-2',
    templateName: 'welcome_discount_offer',
    audienceFilter: { allContacts: false, tags: ['VIP Buyer', 'High Intent'] },
    status: 'completed',
    totalRecipients: 2450,
    deliveredCount: 2418,
    readCount: 2190,
    repliesCount: 684,
    failedCount: 32,
    scheduledAt: '2026-09-16T10:00:00Z',
    completedAt: '2026-09-16T10:04:12Z',
    createdAt: '2026-09-15T18:00:00Z'
  },
  {
    id: 'camp-2',
    workspaceId: 'ws-acme',
    name: 'Weekly Order Status Reminders',
    templateId: 'tpl-wa-1',
    templateName: 'order_status_update',
    audienceFilter: { allContacts: false, tags: ['Pending Shipment'] },
    status: 'running',
    totalRecipients: 850,
    deliveredCount: 780,
    readCount: 620,
    repliesCount: 142,
    failedCount: 6,
    scheduledAt: '2026-09-19T08:00:00Z',
    createdAt: '2026-09-19T07:30:00Z'
  },
  {
    id: 'camp-3',
    workspaceId: 'ws-acme',
    name: 'Re-engagement Inactive Contacts (30d)',
    templateId: 'tpl-wa-2',
    templateName: 'welcome_discount_offer',
    audienceFilter: { allContacts: false, lastInteractionDays: 30 },
    status: 'scheduled',
    totalRecipients: 1200,
    deliveredCount: 0,
    readCount: 0,
    repliesCount: 0,
    failedCount: 0,
    scheduledAt: '2026-09-21T09:00:00Z',
    createdAt: '2026-09-18T12:00:00Z'
  }
];

export const INITIAL_WHATSAPP_FLOWS: WhatsAppFlow[] = [
  {
    id: 'flow-1',
    workspaceId: 'ws-acme',
    name: 'Appointment & Consultation Booking',
    description: 'Guides customers through date/time slot selection, collects contact details, and assigns an account manager.',
    status: 'published',
    category: 'booking',
    totalSessions: 1420,
    completionRate: 84.5,
    lastUpdated: '2026-09-18T15:20:00Z',
    createdAt: '2026-08-20T10:00:00Z',
    nodes: [
      { id: 'n1', title: 'Welcome & Service Selection', type: 'select', description: 'User selects Brand Strategy or Meta Setup' },
      { id: 'n2', title: 'Date & Time Selection', type: 'date_picker', description: 'Pick available consultation slot' },
      { id: 'n3', title: 'Customer Contact Info', type: 'text_input', description: 'Name, Company & Goal summary' },
      { id: 'n4', title: 'Booking Confirmation', type: 'confirmation', description: 'Sends calendar invite & assigns agent' }
    ]
  },
  {
    id: 'flow-2',
    workspaceId: 'ws-acme',
    name: 'Product Catalog & Pricing Inquiry',
    description: 'Interactive questionnaire allowing buyers to pick tier, seat count, and request custom enterprise quotes.',
    status: 'published',
    category: 'inquiry',
    totalSessions: 2310,
    completionRate: 91.2,
    lastUpdated: '2026-09-17T11:00:00Z',
    createdAt: '2026-08-25T14:30:00Z',
    nodes: [
      { id: 'n1', title: 'Plan Interest Selection', type: 'select', description: 'Starter vs Pro vs Enterprise' },
      { id: 'n2', title: 'Team Size Range', type: 'buttons', description: '1-5, 6-20, 20+' },
      { id: 'n3', title: 'Instant Quote Summary', type: 'confirmation', description: 'Calculates price and displays checkout CTA' }
    ]
  }
];

export const INITIAL_WHATSAPP_ACTIVITY: WhatsAppActivityItem[] = [
  {
    id: 'act-1',
    customerName: 'Rahul Verma',
    customerPhone: '+91 98765 43210',
    customerHandle: '+919876543210',
    automationName: 'Order Status Automation',
    timestamp: '2 mins ago',
    status: 'delivered',
    actionTaken: 'Sent order #9812 tracking link via Cloud API'
  },
  {
    id: 'act-2',
    customerName: 'Sarah Jenkins',
    customerPhone: '+1 (415) 555-0199',
    customerHandle: '+14155550199',
    automationName: 'Lead Qualification Bot',
    timestamp: '14 mins ago',
    status: 'read',
    actionTaken: 'Applied tag "VIP Buyer" and sent catalog flow'
  },
  {
    id: 'act-3',
    customerName: 'Elena Rostova',
    customerPhone: '+44 7911 123456',
    customerHandle: '+447911123456',
    automationName: 'Welcome Flow',
    timestamp: '42 mins ago',
    status: 'handoff',
    actionTaken: 'Transferred to Agent (Alex Morgan) due to custom billing request'
  },
  {
    id: 'act-4',
    customerName: 'Carlos Mendoza',
    customerPhone: '+52 55 1234 5678',
    customerHandle: '+525512345678',
    automationName: 'Order Status Automation',
    timestamp: '1 hour ago',
    status: 'delivered',
    actionTaken: 'Delivered HSM Template: order_status_update'
  }
];

export const INITIAL_WHATSAPP_SETTINGS: WhatsAppBusinessSettings = {
  wabaId: 'waba-89210492810',
  phoneNumberId: 'phone-901823901',
  displayPhoneNumber: '+1 (800) 555-0199',
  verifiedName: 'Acme Support WhatsApp',
  qualityRating: 'GREEN',
  messagingLimitTier: 'TIER_100K',
  connectionStatus: 'connected',
  webhookSla: '99.98%',
  webhookLatencyMs: 42,
  businessHours: {
    enabled: true,
    timezone: 'America/New_York (UTC-5)',
    schedule: [
      { day: 'Monday', start: '09:00', end: '18:00', isOpen: true },
      { day: 'Tuesday', start: '09:00', end: '18:00', isOpen: true },
      { day: 'Wednesday', start: '09:00', end: '18:00', isOpen: true },
      { day: 'Thursday', start: '09:00', end: '18:00', isOpen: true },
      { day: 'Friday', start: '09:00', end: '18:00', isOpen: true },
      { day: 'Saturday', start: '10:00', end: '16:00', isOpen: false },
      { day: 'Sunday', start: '10:00', end: '16:00', isOpen: false }
    ],
    offlineMessage: 'Our live support team is currently offline. We have logged your request and our automated assistant is standing by to help with order tracking and FAQs!'
  },
  defaultAssigneeId: 'usr-alex',
  fallbackToHuman: true,
  rateLimitPerMinute: 600
};

class WhatsAppService {
  private templates: WhatsAppTemplate[] = [...INITIAL_WHATSAPP_TEMPLATES];
  private campaigns: WhatsAppCampaign[] = [...INITIAL_WHATSAPP_CAMPAIGNS];
  private flows: WhatsAppFlow[] = [...INITIAL_WHATSAPP_FLOWS];
  private activity: WhatsAppActivityItem[] = [...INITIAL_WHATSAPP_ACTIVITY];
  private settings: WhatsAppBusinessSettings = { ...INITIAL_WHATSAPP_SETTINGS };

  // ==========================================
  // Metrics & Overview
  // ==========================================
  async getMetrics(workspaceId: string): Promise<WhatsAppMetrics> {
    try {
      const res = await fetch(`http://localhost:4000/api/v1/workspaces/${workspaceId}/whatsapp/metrics`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Backend fallback
    }

    return {
      messagesToday: 12482,
      automationRuns: 4820,
      messagesDelivered: 12320,
      deliveryRate: 98.7,
      messagesRead: 10890,
      readRate: 87.2,
      customerReplies: 1248,
      replyRate: 10.0,
      humanHandoffs: 84,
      handoffRate: 1.7,
      isDemoData: true
    };
  }

  async getRecentActivity(workspaceId: string): Promise<WhatsAppActivityItem[]> {
    return [...this.activity];
  }

  // ==========================================
  // Templates
  // ==========================================
  async getTemplates(workspaceId: string): Promise<WhatsAppTemplate[]> {
    return [...this.templates];
  }

  async getTemplateById(id: string): Promise<WhatsAppTemplate | undefined> {
    return this.templates.find(t => t.id === id);
  }

  async createTemplate(templateData: Omit<WhatsAppTemplate, 'id' | 'createdAt' | 'lastUpdated' | 'usageCount'>): Promise<WhatsAppTemplate> {
    const newTemplate: WhatsAppTemplate = {
      ...templateData,
      id: `tpl-wa-${Date.now()}`,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    this.templates.unshift(newTemplate);
    return newTemplate;
  }

  async deleteTemplate(id: string): Promise<boolean> {
    this.templates = this.templates.filter(t => t.id !== id);
    return true;
  }

  // ==========================================
  // Campaigns
  // ==========================================
  async getCampaigns(workspaceId: string): Promise<WhatsAppCampaign[]> {
    return [...this.campaigns];
  }

  async createCampaign(campaignData: Omit<WhatsAppCampaign, 'id' | 'createdAt' | 'deliveredCount' | 'readCount' | 'repliesCount' | 'failedCount'>): Promise<WhatsAppCampaign> {
    const newCampaign: WhatsAppCampaign = {
      ...campaignData,
      id: `camp-${Date.now()}`,
      deliveredCount: 0,
      readCount: 0,
      repliesCount: 0,
      failedCount: 0,
      createdAt: new Date().toISOString()
    };
    this.campaigns.unshift(newCampaign);
    return newCampaign;
  }

  // ==========================================
  // Flows
  // ==========================================
  async getFlows(workspaceId: string): Promise<WhatsAppFlow[]> {
    return [...this.flows];
  }

  async createFlow(flowData: Omit<WhatsAppFlow, 'id' | 'createdAt' | 'lastUpdated' | 'totalSessions' | 'completionRate'>): Promise<WhatsAppFlow> {
    const newFlow: WhatsAppFlow = {
      ...flowData,
      id: `flow-${Date.now()}`,
      totalSessions: 0,
      completionRate: 100,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    this.flows.unshift(newFlow);
    return newFlow;
  }

  // ==========================================
  // Settings
  // ==========================================
  async getSettings(workspaceId: string): Promise<WhatsAppBusinessSettings> {
    return { ...this.settings };
  }

  async updateSettings(workspaceId: string, updates: Partial<WhatsAppBusinessSettings>): Promise<WhatsAppBusinessSettings> {
    this.settings = { ...this.settings, ...updates };
    return { ...this.settings };
  }
}

export const whatsappService = new WhatsAppService();
