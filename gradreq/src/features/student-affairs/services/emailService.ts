import type { EmailTemplate, EmailFormData, EmailSendResponse, EmailRecipient } from '../types/email';

// Mock data for development
const mockTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Graduation Process Start',
    subject: 'Graduation Process Information',
    content: 'Dear {name},\n\nThis email is to inform you about the graduation process...',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Document Submission Reminder',
    subject: 'Required Documents for Graduation',
    content: 'Dear {name},\n\nPlease submit the following documents...',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockRecipients: EmailRecipient[] = [
  {
    id: '1',
    email: 'secretary1@iyte.edu.tr',
    name: 'Department Secretary 1',
    department: 'Computer Engineering',
    faculty: 'Engineering',
  },
  {
    id: '2',
    email: 'secretary2@iyte.edu.tr',
    name: 'Department Secretary 2',
    department: 'Mechanical Engineering',
    faculty: 'Engineering',
  },
];

export const emailService = {
  // Template management
  getTemplates: async (): Promise<EmailTemplate[]> => {
    // In a real application, this would be an API call
    return mockTemplates;
  },

  getTemplate: async (id: string): Promise<EmailTemplate | null> => {
    const template = mockTemplates.find(t => t.id === id);
    return template || null;
  },

  createTemplate: async (template: Omit<EmailTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<EmailTemplate> => {
    const newTemplate: EmailTemplate = {
      ...template,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockTemplates.push(newTemplate);
    return newTemplate;
  },

  updateTemplate: async (id: string, template: Partial<EmailTemplate>): Promise<EmailTemplate | null> => {
    const index = mockTemplates.findIndex(t => t.id === id);
    if (index === -1) return null;

    const updatedTemplate = {
      ...mockTemplates[index],
      ...template,
      updatedAt: new Date().toISOString(),
    };
    mockTemplates[index] = updatedTemplate;
    return updatedTemplate;
  },

  deleteTemplate: async (id: string): Promise<boolean> => {
    const index = mockTemplates.findIndex(t => t.id === id);
    if (index === -1) return false;
    mockTemplates.splice(index, 1);
    return true;
  },

  // Recipient management
  getRecipients: async (): Promise<EmailRecipient[]> => {
    // In a real application, this would be an API call
    return mockRecipients;
  },

  // Email sending
  sendEmail: async (data: EmailFormData): Promise<EmailSendResponse> => {
    // In a real application, this would be an API call
    console.log('Sending email:', data);
    
    // Simulate some failures
    const failedCount = Math.floor(Math.random() * 2); // 0 or 1
    const sentCount = data.recipients.length - failedCount;
    
    return {
      success: true,
      message: `Email sent successfully to ${sentCount} recipients`,
      sentCount,
      failedCount,
      failedRecipients: failedCount > 0 ? [data.recipients[0]] : undefined,
    };
  },
};

// Mock function to send emails
export const sendAutomatedEmails = async (
  recipients: EmailRecipient[],
  template: EmailTemplate,
  customContent?: string
): Promise<boolean> => {
  try {
    // Simulate API call
    console.log('Sending emails to:', recipients);
    console.log('Using template:', template);
    console.log('Custom content:', customContent);

    // In a real implementation, this would make an API call to your backend
    // which would then use a service like SendGrid, AWS SES, etc.
    
    return true;
  } catch (error) {
    console.error('Error sending emails:', error);
    return false;
  }
};

// Function to send bulk emails to all secretaries
export const sendBulkEmailsToSecretaries = async (
  template: EmailTemplate,
  customContent?: string
): Promise<boolean> => {
  try {
    // Get all secretaries (in real implementation, this would come from your backend)
    const allSecretaries: EmailRecipient[] = [
      {
        id: '1',
        email: 'secretary1@iyte.edu.tr',
        name: 'Bölüm Sekreteri 1',
        department: 'Bilgisayar Mühendisliği',
        faculty: 'Mühendislik',
      },
      {
        id: '2',
        email: 'secretary2@iyte.edu.tr',
        name: 'Bölüm Sekreteri 2',
        department: 'Makine Mühendisliği',
        faculty: 'Mühendislik',
      },
      // Add more secretaries as needed
    ];

    return await sendAutomatedEmails(allSecretaries, template, customContent);
  } catch (error) {
    console.error('Error sending bulk emails:', error);
    return false;
  }
}; 