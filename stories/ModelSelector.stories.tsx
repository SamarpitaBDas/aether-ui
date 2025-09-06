"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface AIModel {
  id: string
  name: string
  provider: string
  description: string
  maxTokens: number
}

const mockModels: AIModel[] = [
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    description: "Most capable GPT-4 model with improved instruction following",
    maxTokens: 4096,
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    description: "Most powerful model for highly complex tasks",
    maxTokens: 4096,
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: "Google",
    description: "Advanced reasoning and code generation capabilities",
    maxTokens: 2048,
  },
]

interface ModelSelectorProps {
  selectedModel?: string
  onModelSelect?: (modelId: string) => void
  models?: AIModel[]
  loading?: boolean
}

const ModelSelector = ({ selectedModel, onModelSelect, models = mockModels, loading = false }: ModelSelectorProps) => {
  const [open, setOpen] = useState(false)

  const selected = models.find((model) => model.id === selectedModel)

  return (
    <div className="space-y-2 w-80">
      <label className="text-sm font-medium">AI Model</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-transparent"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Loading models...
              </div>
            ) : selected ? (
              <div className="flex items-center gap-2 truncate">
                <span className="truncate">{selected.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {selected.provider}
                </Badge>
              </div>
            ) : (
              "Select model..."
            )}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <Command>
            <CommandInput placeholder="Search models..." />
            <CommandList>
              <CommandEmpty>No models found.</CommandEmpty>
              <CommandGroup>
                {models.map((model) => (
                  <CommandItem
                    key={model.id}
                    value={model.id}
                    onSelect={() => {
                      onModelSelect?.(model.id)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", selectedModel === model.id ? "opacity-100" : "opacity-0")} />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{model.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {model.provider}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{model.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Max tokens: {model.maxTokens.toLocaleString()}</span>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

const meta = {
  title: "Components/ModelSelector",
  component: ModelSelector,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A dropdown component for selecting AI models with detailed information.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    loading: {
      control: "boolean",
    },
  },
  args: { onModelSelect: fn() },
} satisfies Meta<typeof ModelSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithSelection: Story = {
  args: {
    selectedModel: "gpt-4-turbo",
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const Interactive: Story = {
  render: () => {
    const [selectedModel, setSelectedModel] = useState<string>("")

    return (
      <div className="space-y-4">
        <ModelSelector selectedModel={selectedModel} onModelSelect={setSelectedModel} />
        {selectedModel && (
          <div className="text-sm text-muted-foreground">
            Selected: {mockModels.find((m) => m.id === selectedModel)?.name}
          </div>
        )}
      </div>
    )
  },
}
