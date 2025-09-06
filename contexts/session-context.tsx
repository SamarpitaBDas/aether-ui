"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { SessionState, ModelParameters, ChatMessage } from "@/types"

interface SessionContextType {
  state: SessionState
  dispatch: React.Dispatch<SessionAction>
}

type SessionAction =
  | { type: "SET_MODEL"; payload: string }
  | { type: "UPDATE_PARAMETERS"; payload: Partial<ModelParameters> }
  | { type: "ADD_MESSAGE"; payload: ChatMessage }
  | { type: "CLEAR_MESSAGES" }
  | { type: "SET_TEMPLATE"; payload: string | null }
  | { type: "RESET_SESSION" }

const initialState: SessionState = {
  selectedModel: null,
  parameters: {
    temperature: 0.7,
    maxTokens: 2048,
    topP: 1.0,
    frequencyPenalty: 0,
    presencePenalty: 0,
  },
  messages: [],
  currentTemplate: null,
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case "SET_MODEL":
      return { ...state, selectedModel: action.payload }
    case "UPDATE_PARAMETERS":
      return {
        ...state,
        parameters: { ...state.parameters, ...action.payload },
      }
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }
    case "CLEAR_MESSAGES":
      return { ...state, messages: [] }
    case "SET_TEMPLATE":
      return { ...state, currentTemplate: action.payload }
    case "RESET_SESSION":
      return initialState
    default:
      return state
  }
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sessionReducer, initialState)

  return <SessionContext.Provider value={{ state, dispatch }}>{children}</SessionContext.Provider>
}

export function useSession() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider")
  }
  return context
}
