"use client"

import { SessionProvider } from "@/contexts/session-context"
import { AetherInterface } from "./aether-interface"

export function AetherUI() {
  return (
    <SessionProvider>
      <AetherInterface />
    </SessionProvider>
  )
}
