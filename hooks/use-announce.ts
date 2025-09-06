"use client"

import { useCallback } from "react"

export function useAnnounce() {
  const announce = useCallback((message: string, priority: "polite" | "assertive" = "polite") => {
    const announcer = document.createElement("div")
    announcer.setAttribute("aria-live", priority)
    announcer.setAttribute("aria-atomic", "true")
    announcer.setAttribute("class", "sr-only")
    announcer.textContent = message

    document.body.appendChild(announcer)

    setTimeout(() => {
      document.body.removeChild(announcer)
    }, 1000)
  }, [])

  return announce
}
