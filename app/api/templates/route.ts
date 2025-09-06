import { NextResponse } from "next/server"
import type { PromptTemplate } from "@/types"

const mockTemplates: PromptTemplate[] = [
  {
    id: "creative-writing",
    name: "Creative Writing Assistant",
    description: "Help with creative writing tasks and storytelling",
    category: "Creative",
    content:
      "You are a creative writing assistant. Help the user with their writing project: {topic}. Consider the tone: {tone} and target audience: {audience}.",
    parameters: [
      { name: "topic", type: "string", defaultValue: "", description: "Writing topic or theme" },
      {
        name: "tone",
        type: "string",
        defaultValue: "neutral",
        description: "Writing tone (formal, casual, humorous, etc.)",
      },
      { name: "audience", type: "string", defaultValue: "general", description: "Target audience" },
    ],
  },
  {
    id: "code-review",
    name: "Code Review Assistant",
    description: "Analyze and provide feedback on code",
    category: "Development",
    content:
      "Please review the following {language} code and provide feedback on:\n1. Code quality and best practices\n2. Potential bugs or issues\n3. Performance optimizations\n4. Security considerations\n\nCode:\n{code}",
    parameters: [
      { name: "language", type: "string", defaultValue: "JavaScript", description: "Programming language" },
      { name: "code", type: "string", defaultValue: "", description: "Code to review" },
    ],
  },
  {
    id: "data-analysis",
    name: "Data Analysis Helper",
    description: "Assist with data analysis and interpretation",
    category: "Analytics",
    content:
      "Analyze the following dataset and provide insights:\n\nDataset: {dataset}\nAnalysis focus: {focus}\nOutput format: {format}",
    parameters: [
      { name: "dataset", type: "string", defaultValue: "", description: "Dataset description or sample" },
      { name: "focus", type: "string", defaultValue: "trends", description: "Analysis focus area" },
      { name: "format", type: "string", defaultValue: "summary", description: "Desired output format" },
    ],
  },
  {
    id: "learning-tutor",
    name: "Learning Tutor",
    description: "Educational assistant for learning new topics",
    category: "Education",
    content:
      "Act as a tutor for {subject}. Explain {topic} at a {level} level. Use examples and break down complex concepts into digestible parts.",
    parameters: [
      { name: "subject", type: "string", defaultValue: "", description: "Subject area" },
      { name: "topic", type: "string", defaultValue: "", description: "Specific topic to learn" },
      {
        name: "level",
        type: "string",
        defaultValue: "beginner",
        description: "Learning level (beginner, intermediate, advanced)",
      },
    ],
  },
  {
    id: "business-strategy",
    name: "Business Strategy Advisor",
    description: "Strategic business planning and analysis",
    category: "Business",
    content:
      "Provide strategic advice for a {industry} business facing {challenge}. Consider market conditions, competitive landscape, and growth opportunities. Focus on {timeframe} planning.",
    parameters: [
      { name: "industry", type: "string", defaultValue: "", description: "Industry or business sector" },
      { name: "challenge", type: "string", defaultValue: "", description: "Current business challenge" },
      { name: "timeframe", type: "string", defaultValue: "short-term", description: "Planning timeframe" },
    ],
  },
]

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json({
    templates: mockTemplates,
    total: mockTemplates.length,
  })
}
