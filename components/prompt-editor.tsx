"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Loader2, Wand2 } from "lucide-react"
import { useSession } from "@/contexts/session-context"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { TemplateParameterForm } from "./template-parameter-form"
import { SavedPrompts } from "./saved-prompts"
import type { PromptTemplate, ChatMessage } from "@/types"

export function PromptEditor() {
  const { state, dispatch } = useSession()
  const [prompt, setPrompt] = useState("")
  const [templates, setTemplates] = useState<PromptTemplate[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [showTemplateForm, setShowTemplateForm] = useState(false)

  useKeyboardShortcuts([
    {
      key: "Enter",
      ctrlKey: true,
      callback: handleSendMessage,
    },
    {
      key: "Enter",
      metaKey: true,
      callback: handleSendMessage,
    },
    {
      key: "k",
      ctrlKey: true,
      callback: () => dispatch({ type: "CLEAR_MESSAGES" }),
    },
  ])

  useEffect(() => {
    async function fetchTemplates() {
      setLoading(true)
      try {
        const response = await fetch("/api/templates")
        const data = await response.json()
        setTemplates(data.templates)
      } catch (error) {
        console.error("Failed to fetch templates:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      setSelectedTemplate(templateId)
      dispatch({ type: "SET_TEMPLATE", payload: templateId })

      if (template.parameters.length > 0) {
        setShowTemplateForm(true)
      } else {
        setPrompt(template.content)
        setShowTemplateForm(false)
      }
    }
  }

  const handleTemplateApply = (processedContent: string) => {
    setPrompt(processedContent)
    setShowTemplateForm(false)
  }

  async function handleSendMessage() {
    if (!prompt.trim() || !state.selectedModel || sending) return

    setSending(true)

    // Add user message
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: prompt.trim(),
      timestamp: new Date(),
    }

    dispatch({ type: "ADD_MESSAGE", payload: userMessage })

    try {
      // Send to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...state.messages, userMessage],
          model: state.selectedModel,
          parameters: state.parameters,
        }),
      })

      const data = await response.json()
      if (data.message) {
        dispatch({ type: "ADD_MESSAGE", payload: data.message })
      }
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setSending(false)
      setPrompt("")
      setSelectedTemplate("")
      setShowTemplateForm(false)
    }
  }

  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center justify-between">
            Prompt Editor
            {selectedTemplateData && (
              <Button variant="ghost" size="sm" onClick={() => setShowTemplateForm(!showTemplateForm)}>
                <Wand2 className="h-3 w-3 mr-1" />
                Configure
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template-select" className="text-xs">
              Template
            </Label>
            <Select value={selectedTemplate} onValueChange={handleTemplateSelect} disabled={loading}>
              <SelectTrigger id="template-select">
                <SelectValue placeholder={loading ? "Loading templates..." : "Select a template"} />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    <div className="flex items-center gap-2">
                      <span>{template.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTemplateData && !showTemplateForm && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">{selectedTemplateData.description}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="prompt-textarea" className="text-xs">
              Prompt
            </Label>
            <Textarea
              id="prompt-textarea"
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-32 resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <p className="text-xs text-muted-foreground">Press Cmd/Ctrl + Enter to send • Ctrl + K to clear chat</p>
          </div>

          <Button
            onClick={handleSendMessage}
            disabled={!prompt.trim() || !state.selectedModel || sending}
            className="w-full"
          >
            {sending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {selectedTemplateData && showTemplateForm && (
        <TemplateParameterForm template={selectedTemplateData} onApply={handleTemplateApply} />
      )}

      <SavedPrompts onLoadPrompt={setPrompt} currentPrompt={prompt} />
    </div>
  )
}
