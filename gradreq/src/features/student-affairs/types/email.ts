export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmailRecipient {
  id: string;
  email: string;
  name: string;
  department?: string;
  faculty?: string;
}

export interface EmailFormData {
  recipients: EmailRecipient[];
  subject: string;
  content: string;
  templateId?: string;
}

export interface EmailSendResponse {
  success: boolean;
  message: string;
  sentCount: number;
  failedCount: number;
  failedRecipients?: EmailRecipient[];
} 