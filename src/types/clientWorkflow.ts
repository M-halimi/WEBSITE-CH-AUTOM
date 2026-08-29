export interface WorkflowStepInput {
  order: number;
  phase: "CURRENT" | "DESIRED";
  title: string;
  description?: string;
  tool?: string;
  responsiblePerson?: string;
  expectedResult?: string;
}

export interface WorkflowIntegrationInput {
  toolName: string;
  toolCategory?: string;
  purpose?: string;
  websiteUrl?: string;
  accountInfo?: string;
  hasApi?: boolean;
}

export interface WorkflowFileInput {
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

export interface WorkflowRequestFormData {
  id?: string;
  title: string;
  businessName?: string;
  businessType?: string;
  industry?: string;
  businessDescription?: string;
  targetCustomers?: string;
  customerChannels?: string;
  
  problemDescription?: string;
  frequency?: string;
  estimatedTime?: string;
  costOfFailure?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  
  desiredAutomationDesc?: string;
  expectedResult?: string;
  successCriteria?: string;
  expectedDeadline?: string;
  budgetRange?: string;
  additionalNotes?: string;
  
  currentSteps?: WorkflowStepInput[];
  desiredSteps?: WorkflowStepInput[];
  integrations?: WorkflowIntegrationInput[];
  files?: WorkflowFileInput[];
}

