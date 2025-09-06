"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Save, Upload } from "lucide-react"

const meta = {
  title: "UI/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A modal dialog component for displaying content over the main interface.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>This is a description of what this dialog is for.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>Dialog content goes here.</p>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const SavePrompt: Story = {
  render: () => {
    const [promptName, setPromptName] = useState("")
    const [promptCategory, setPromptCategory] = useState("")

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Prompt
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Current Prompt</DialogTitle>
            <DialogDescription>Save your current prompt as a template for future use.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
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
          </div>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button disabled={!promptName.trim()}>Save Prompt</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

export const ImportChat: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Import Chat
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Chat</DialogTitle>
          <DialogDescription>
            Select a JSON file exported from Aether UI to import a previous chat session.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <input
            type="file"
            accept=".json"
            className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Import</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const AIModelSettings: Story = {
  render: () => {
    const [apiKey, setApiKey] = useState("")
    const [endpoint, setEndpoint] = useState("")

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <Upload className="mr-2 h-4 w-4" />
            AI Model Settings
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>AI Model Settings</DialogTitle>
            <DialogDescription>Configure your AI model settings and preferences.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endpoint">Custom Endpoint</Label>
              <Input
                id="endpoint"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                placeholder="https://api.example.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}
