import { NextResponse } from "next/server"
import type { AIModel } from "@/types"

const mockModels: AIModel[] = [
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    description: "Most capable GPT-4 model with improved instruction following",
    maxTokens: 4096,
    supportedFeatures: ["chat", "completion", "function-calling"],
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    description: "Most powerful model for highly complex tasks",
    maxTokens: 4096,
    supportedFeatures: ["chat", "completion", "analysis"],
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: "Google",
    description: "Advanced reasoning and code generation capabilities",
    maxTokens: 2048,
    supportedFeatures: ["chat", "completion", "multimodal"],
  },
  {
    id: "llama-2-70b",
    name: "Llama 2 70B",
    provider: "Meta",
    description: "Open-source large language model",
    maxTokens: 4096,
    supportedFeatures: ["chat", "completion"],
  },
  {
    id: "mistral-large",
    name: "Mistral Large",
    provider: "Mistral AI",
    description: "High-performance model for complex reasoning",
    maxTokens: 8192,
    supportedFeatures: ["chat", "completion", "function-calling"],
  },
]

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({
    models: mockModels,
    total: mockModels.length,
  })
}
