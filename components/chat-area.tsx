"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Copy, Download, Trash2, User, Bot, Upload, Search, Check } from "lucide-react"
import { useSession } from "@/contexts/session-context"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { useAccessibility } from "./accessibility-provider"
import { cn } from "@/lib/utils"
import type { ChatMessage } from "@/types"

export function ChatArea() {
  const { state, dispatch } = useSession()
  const { announceMessage } = useAccessibility()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const [importDialogOpen, setImportDialogOpen] = useState(false)

  useKeyboardShortcuts([
    {
      key: "k",
      ctrlKey: true,
      callback: () => {
        dispatch({ type: "CLEAR_MESSAGES" })
        announceMessage("Chat cleared")
      },
    },
    {
      key: "s",
      ctrlKey: true,
      callback: downloadChat,
    },
  ])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [state.messages])

  const copyMessage = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedMessageId(messageId)
      announceMessage("Message copied to clipboard")
      setTimeout(() => setCopiedMessageId(null), 2000)
    } catch (error) {
      console.error("Failed to copy message:", error)
      announceMessage("Failed to copy message")
    }
  }

  function downloadChat() {
    const chatData = {
      model: state.selectedModel,
      parameters: state.parameters,
      messages: state.messages,
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(chatData, null, 2)], {
      type: "application/json",
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `aether-chat-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    announceMessage("Chat exported successfully")
  }

  const importChat = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const chatData = JSON.parse(e.target?.result as string)
        if (chatData.messages && Array.isArray(chatData.messages)) {
          // Clear existing messages and import new ones
          dispatch({ type: "CLEAR_MESSAGES" })
          chatData.messages.forEach((message: ChatMessage) => {
            dispatch({
              type: "ADD_MESSAGE",
              payload: {
                ...message,
                timestamp: new Date(message.timestamp),
              },
            })
          })

          // Set model and parameters if available
          if (chatData.model) {
            dispatch({ type: "SET_MODEL", payload: chatData.model })
          }
          if (chatData.parameters) {
            dispatch({ type: "UPDATE_PARAMETERS", payload: chatData.parameters })
          }

          announceMessage(`Imported chat with ${chatData.messages.length} messages`)
        }
        setImportDialogOpen(false)
      } catch (error) {
        console.error("Failed to import chat:", error)
        announceMessage("Failed to import chat file")
      }
    }
    reader.readAsText(file)
  }

  const clearMessages = () => {
    dispatch({ type: "CLEAR_MESSAGES" })
    setSearchQuery("")
    announceMessage("Chat cleared")
  }

  const filteredMessages = state.messages.filter(
    (message) =>
      searchQuery === "" ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (state.messages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
            <Bot className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Start a conversation</h3>
            <p className="text-muted-foreground text-sm max-w-md">
              Select a model and enter a prompt to begin chatting with AI. You can use templates to get started quickly.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Chat</h2>
          {state.selectedModel && (
            <Badge variant="secondary" className="text-xs">
              {state.selectedModel}
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            {state.messages.length} messages
          </Badge>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-7 h-8 w-40 text-xs"
              aria-label="Search chat messages"
            />
          </div>

          <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" aria-label="Import chat from file">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
            </DialogTrigger>
            <DialogContent aria-labelledby="import-dialog-title">
              <DialogHeader>
                <DialogTitle id="import-dialog-title">Import Chat</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Select a JSON file exported from Aether UI to import a previous chat session.
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={importChat}
                  className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  aria-label="Select chat file to import"
                />
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="ghost" size="sm" onClick={downloadChat} aria-label="Export chat to file">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="ghost" size="sm" onClick={clearMessages} aria-label="Clear all messages">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2" role="log" aria-live="polite" aria-label="Chat messages">
        {filteredMessages.map((message, index) => (
          <Card
            key={message.id}
            className={cn(
              "relative group",
              message.role === "user" ? "ml-12" : "mr-12",
              message.role === "user" ? "bg-primary/5" : "bg-muted/50",
            )}
            role="article"
            aria-label={`${message.role} message ${index + 1}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                  aria-hidden="true"
                >
                  {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium capitalize">{message.role}</span>
                    <time className="text-xs text-muted-foreground" dateTime={message.timestamp.toISOString()}>
                      {message.timestamp.toLocaleTimeString()}
                    </time>
                    {message.model && (
                      <Badge variant="outline" className="text-xs">
                        {message.model}
                      </Badge>
                    )}
                  </div>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                  onClick={() => copyMessage(message.content, message.id)}
                  aria-label={`Copy ${message.role} message to clipboard`}
                >
                  {copiedMessageId === message.id ? (
                    <Check className="w-3 h-3 text-green-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        <div ref={messagesEndRef} aria-hidden="true" />
      </div>

      {searchQuery && (
        <div className="text-xs text-muted-foreground text-center py-2" role="status">
          Showing {filteredMessages.length} of {state.messages.length} messages
        </div>
      )}
    </div>
  )
}
