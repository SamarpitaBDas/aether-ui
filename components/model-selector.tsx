"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { useSession } from "@/contexts/session-context"
import type { AIModel } from "@/types"
import { cn } from "@/lib/utils"

export function ModelSelector() {
  const { state, dispatch } = useSession()
  const [open, setOpen] = useState(false)
  const [models, setModels] = useState<AIModel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchModels() {
      try {
        const response = await fetch("/api/models")
        const data = await response.json()
        setModels(data.models)
      } catch (error) {
        console.error("Failed to fetch models:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchModels()
  }, [])

  const selectedModel = models.find((model) => model.id === state.selectedModel)

  return (
    <div className="space-y-2">
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
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading models...
              </div>
            ) : selectedModel ? (
              <div className="flex items-center gap-2 truncate">
                <span className="truncate">{selectedModel.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {selectedModel.provider}
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
                      dispatch({ type: "SET_MODEL", payload: model.id })
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", state.selectedModel === model.id ? "opacity-100" : "opacity-0")}
                    />
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
