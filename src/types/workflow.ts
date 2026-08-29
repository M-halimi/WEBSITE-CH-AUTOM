export interface StepInput {
  id?: string;
  order: number;
  name: string;
  type: string;
  appName?: string | null;
  description?: string | null;
  icon?: string | null;
}

export interface WorkflowFormData {
  id?: string;
  title: string;
  slug?: string;
  summary: string;
  description: string;
  difficulty: string;
  estimatedTime: string;
  status: string; // DRAFT, PUBLISHED, ARCHIVED
  featured: boolean;
  price?: string;
  imageUrl?: string | null;
  categoryId?: string;
  triggersDescription?: string;
  outcomesDescription?: string;
  platformIds?: string[];
  tagIds?: string[];
  steps: StepInput[];
}

