export interface AIModel {
  id: string
  name: string
  provider: string
  description: string
  maxTokens: number
  supportedFeatures: string[]
}

export interface PromptTemplate {
  id: string
  name: string
  description: string
  content: string
  category: string
  parameters: TemplateParameter[]
}

export interface TemplateParameter {
  name: string
  type: "string" | "number" | "boolean"
  defaultValue: any
  description: string
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  model?: string
}

export interface ModelParameters {
  temperature: number
  maxTokens: number
  topP: number
  frequencyPenalty: number
  presencePenalty: number
}

export interface SessionState {
  selectedModel: string | null
  parameters: ModelParameters
  messages: ChatMessage[]
  currentTemplate: string | null
}
