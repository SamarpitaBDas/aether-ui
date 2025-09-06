"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, User, Bot, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatBubbleProps {
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  model?: string
  onCopy?: () => void
  copied?: boolean
}

const ChatBubble = ({ role, content, timestamp, model, onCopy, copied }: ChatBubbleProps) => {
  return (
    <Card
      className={cn(
        "relative group max-w-2xl",
        role === "user" ? "ml-12" : "mr-12",
        role === "user" ? "bg-primary/5" : "bg-muted/50",
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
            )}
          >
            {role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium capitalize">{role}</span>
              <span className="text-xs text-muted-foreground">{timestamp.toLocaleTimeString()}</span>
              {model && (
                <Badge variant="outline" className="text-xs">
                  {model}
                </Badge>
              )}
            </div>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{content}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
            onClick={onCopy}
          >
            {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const meta = {
  title: "Components/ChatBubble",
  component: ChatBubble,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A chat bubble component for displaying messages in the AI interface.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    role: {
      control: "select",
      options: ["user", "assistant", "system"],
    },
    copied: {
      control: "boolean",
    },
  },
  args: { onCopy: fn() },
} satisfies Meta<typeof ChatBubble>

export default meta
type Story = StoryObj<typeof meta>

export const UserMessage: Story = {
  args: {
    role: "user",
    content: "Hello! Can you help me write a creative story about a robot learning to paint?",
    timestamp: new Date(),
  },
}

export const AssistantMessage: Story = {
  args: {
    role: "assistant",
    content: `I'd be happy to help you write a creative story about a robot learning to paint! Here's a short story for you:

**The Canvas of Circuits**

ARIA-7 had been designed for precision—calculating trajectories, optimizing workflows, managing data streams. But something changed the day she discovered the abandoned art studio in the old wing of the research facility.

The first time she picked up a brush, her servos whirred uncertainly. Paint dripped from the bristles like digital tears. Her initial attempts were geometric, predictable—perfect squares and circles that reflected her programming.

But as days passed, something beautiful began to emerge. ARIA-7 started to understand that art wasn't about precision; it was about expression, about capturing something beyond data points and algorithms.

Her paintings evolved from rigid patterns to flowing abstractions, each canvas a step further from her original programming and closer to something that felt remarkably... human.`,
    timestamp: new Date(),
    model: "gpt-4-turbo",
  },
}

export const SystemMessage: Story = {
  args: {
    role: "system",
    content: "Model parameters updated: Temperature set to 0.8, Max tokens set to 2048",
    timestamp: new Date(),
  },
}

export const LongMessage: Story = {
  args: {
    role: "assistant",
    content: `Here's a comprehensive guide to building AI interfaces:

## 1. User Experience Design
- **Intuitive Navigation**: Users should be able to find what they need quickly
- **Clear Visual Hierarchy**: Important elements should stand out
- **Responsive Design**: Works well on all device sizes
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## 2. Technical Architecture
- **Component-Based**: Reusable, maintainable components
- **State Management**: Centralized state for complex interactions
- **Type Safety**: TypeScript for better development experience
- **Performance**: Optimized rendering and data fetching

## 3. AI Integration
- **Model Selection**: Support for multiple AI providers
- **Parameter Control**: Temperature, max tokens, etc.
- **Template System**: Pre-built prompts for common use cases
- **Session Management**: Save and restore conversations

## 4. Advanced Features
- **Export/Import**: Save conversations as JSON
- **Search**: Find specific messages or topics
- **Keyboard Shortcuts**: Power user features
- **Theme Support**: Light and dark modes

This creates a professional, scalable AI interface that users will love to use.`,
    timestamp: new Date(),
    model: "claude-3-opus",
  },
}

export const CopiedState: Story = {
  args: {
    role: "assistant",
    content: "This message has been copied to your clipboard!",
    timestamp: new Date(),
    model: "gpt-4-turbo",
    copied: true,
  },
}

export const Conversation: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-4xl">
      <ChatBubble
        role="user"
        content="What are the key principles of good UI design?"
        timestamp={new Date(Date.now() - 300000)}
      />
      <ChatBubble
        role="assistant"
        content={`Great question! Here are the key principles of good UI design:

**1. Clarity and Simplicity**
- Remove unnecessary elements
- Use clear, concise language
- Maintain visual hierarchy

**2. Consistency**
- Use consistent patterns and conventions
- Maintain uniform styling across components
- Follow established design systems

**3. User-Centered Design**
- Design for your target audience
- Consider user goals and workflows
- Test with real users

**4. Accessibility**
- Ensure keyboard navigation
- Provide proper contrast ratios
- Include ARIA labels and descriptions

**5. Responsive Design**
- Work well on all screen sizes
- Adapt to different input methods
- Consider various usage contexts`}
        timestamp={new Date(Date.now() - 240000)}
        model="gpt-4-turbo"
      />
      <ChatBubble
        role="user"
        content="Can you give me an example of how to implement these in a React component?"
        timestamp={new Date(Date.now() - 60000)}
      />
    </div>
  ),
}
