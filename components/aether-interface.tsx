"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { ModelSelector } from "./model-selector"
import { PromptEditor } from "./prompt-editor"
import { ParametersPanel } from "./parameters-panel"
import { ChatArea } from "./chat-area"
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useAccessibility } from "./accessibility-provider"
import { Menu } from "lucide-react"

export function AetherInterface() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { announceMessage } = useAccessibility()

  const handleSidebarToggle = () => {
    const newState = !sidebarOpen
    setSidebarOpen(newState)
    announceMessage(newState ? "Sidebar opened" : "Sidebar closed")
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar className="border-r" aria-label="Navigation sidebar">
          <SidebarContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Aether UI</h2>
              <ThemeToggle />
            </div>
            <ModelSelector />
            <ParametersPanel />
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="border-b p-4 flex items-center justify-between" role="banner">
            <div className="flex items-center gap-4">
              <SidebarTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSidebarToggle}
                  aria-label="Toggle navigation sidebar"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SidebarTrigger>
              <h1 className="text-xl font-bold">Aether UI - AI Interface Prototype</h1>
            </div>
          </header>

          <main id="main-content" className="flex-1 flex flex-col lg:flex-row" role="main">
            <div className="flex-1 p-4">
              <ChatArea />
            </div>
            <aside className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l p-4" aria-label="Prompt editor">
              <PromptEditor />
            </aside>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
