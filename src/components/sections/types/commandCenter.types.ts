export type ConversationRole = 'user' | 'ai';

export interface ConversationMessage {
  role: ConversationRole;
  content?: string;
  data?: any;
}

export interface RefinedResponse {
  summary: string;
  chartType: 'pie' | 'bar' | 'line' | null;
  chartData: any[];
  metrics?: Array<{
    label: string;
    value: string;
    trend: string;
    benchmark: string;
  }>;
  insights?: string[];
  suggestions?: string[];
}

export interface CategoryDefinition {
  key: string;
  label: string;
  icon: JSX.Element;
  userPrompt: string;
  initialAIResponse: RefinedResponse;
  refinedAIResponses: Record<string, RefinedResponse>;
}

export type AnimationPhase = 'initial' | 'dropping' | 'docking' | 'final'; 