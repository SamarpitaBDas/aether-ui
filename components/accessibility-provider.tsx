"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AccessibilityContextType {
  reducedMotion: boolean
  highContrast: boolean
  fontSize: "small" | "medium" | "large"
  announceMessage: (message: string, priority?: "polite" | "assertive") => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    // Apply accessibility classes to document
    document.documentElement.classList.toggle("reduced-motion", reducedMotion)
    document.documentElement.classList.toggle("high-contrast", highContrast)
    document.documentElement.setAttribute("data-font-size", fontSize)
  }, [reducedMotion, highContrast, fontSize])

  const announceMessage = (message: string, priority: "polite" | "assertive" = "polite") => {
    const announcer = document.createElement("div")
    announcer.setAttribute("aria-live", priority)
    announcer.setAttribute("aria-atomic", "true")
    announcer.setAttribute("class", "sr-only")
    announcer.textContent = message

    document.body.appendChild(announcer)
    setTimeout(() => document.body.removeChild(announcer), 1000)
  }

  return (
    <AccessibilityContext.Provider
      value={{
        reducedMotion,
        highContrast,
        fontSize,
        announceMessage,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}
