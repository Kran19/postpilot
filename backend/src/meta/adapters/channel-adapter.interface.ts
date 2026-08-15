export interface OutboundResult {
  success: boolean;
  externalMessageId?: string;
  errorMessage?: string;
  timestamp: string;
}

export interface ChannelAdapter {
  readonly channelName: 'instagram' | 'facebook' | 'whatsapp' | 'threads';
  sendDirectMessage(token: string, recipientId: string, text: string): Promise<OutboundResult>;
  sendCommentReply(token: string, commentId: string, text: string): Promise<OutboundResult>;
}
