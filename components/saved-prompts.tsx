"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Trash2, Save } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface SavedPrompt {
  id: string
  name: string
  content: string
  category: string
  createdAt: Date
}

interface SavedPromptsProps {
  onLoadPrompt: (content: string) => void
  currentPrompt: string
}

export function SavedPrompts({ onLoadPrompt, currentPrompt }: SavedPromptsProps) {
  const [savedPrompts, setSavedPrompts] = useLocalStorage<SavedPrompt[]>("aether-saved-prompts", [])
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [promptName, setPromptName] = useState("")
  const [promptCategory, setPromptCategory] = useState("")

  const savePrompt = () => {
    if (!promptName.trim() || !currentPrompt.trim()) return

    const newPrompt: SavedPrompt = {
      id: `prompt-${Date.now()}`,
      name: promptName.trim(),
      content: currentPrompt,
      category: promptCategory.trim() || "General",
      createdAt: new Date(),
    }

    setSavedPrompts((prev) => [newPrompt, ...prev])
    setPromptName("")
    setPromptCategory("")
    setSaveDialogOpen(false)
  }

  const deletePrompt = (id: string) => {
    setSavedPrompts((prev) => prev.filter((prompt) => prompt.id !== id))
  }

  const loadPrompt = (prompt: SavedPrompt) => {
    onLoadPrompt(prompt.content)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center justify-between">
          Saved Prompts
          <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Save className="h-3 w-3" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Current Prompt</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prompt-name">Name</Label>
                  <Input
                    id="prompt-name"
                    value={promptName}
                    onChange={(e) => setPromptName(e.target.value)}
                    placeholder="Enter prompt name..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prompt-category">Category</Label>
                  <Input
                    id="prompt-category"
                    value={promptCategory}
                    onChange={(e) => setPromptCategory(e.target.value)}
                    placeholder="Enter category (optional)..."
                  />
                </div>
                <Button onClick={savePrompt} disabled={!promptName.trim() || !currentPrompt.trim()}>
                  Save Prompt
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {savedPrompts.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">No saved prompts yet</p>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {savedPrompts.map((prompt) => (
              <div
                key={prompt.id}
                className="flex items-center justify-between p-2 rounded border hover:bg-muted/50 cursor-pointer group"
                onClick={() => loadPrompt(prompt)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium truncate">{prompt.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {prompt.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{prompt.content}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    deletePrompt(prompt.id)
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
