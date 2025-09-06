"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from "@/contexts/session-context"

export function ParametersPanel() {
  const { state, dispatch } = useSession()
  const { parameters } = state

  const updateParameter = (key: keyof typeof parameters, value: number) => {
    dispatch({
      type: "UPDATE_PARAMETERS",
      payload: { [key]: value },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Model Parameters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="temperature" className="text-xs">
              Temperature
            </Label>
            <span className="text-xs text-muted-foreground">{parameters.temperature}</span>
          </div>
          <Slider
            id="temperature"
            min={0}
            max={2}
            step={0.1}
            value={[parameters.temperature]}
            onValueChange={([value]) => updateParameter("temperature", value)}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">Controls randomness in responses</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="maxTokens" className="text-xs">
              Max Tokens
            </Label>
            <Input
              id="maxTokens"
              type="number"
              value={parameters.maxTokens}
              onChange={(e) => updateParameter("maxTokens", Number.parseInt(e.target.value) || 0)}
              className="w-20 h-6 text-xs"
              min={1}
              max={8192}
            />
          </div>
          <Slider
            min={1}
            max={4096}
            step={1}
            value={[parameters.maxTokens]}
            onValueChange={([value]) => updateParameter("maxTokens", value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="topP" className="text-xs">
              Top P
            </Label>
            <span className="text-xs text-muted-foreground">{parameters.topP}</span>
          </div>
          <Slider
            id="topP"
            min={0}
            max={1}
            step={0.01}
            value={[parameters.topP]}
            onValueChange={([value]) => updateParameter("topP", value)}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">Controls diversity via nucleus sampling</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="frequencyPenalty" className="text-xs">
              Frequency Penalty
            </Label>
            <span className="text-xs text-muted-foreground">{parameters.frequencyPenalty}</span>
          </div>
          <Slider
            id="frequencyPenalty"
            min={-2}
            max={2}
            step={0.1}
            value={[parameters.frequencyPenalty]}
            onValueChange={([value]) => updateParameter("frequencyPenalty", value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="presencePenalty" className="text-xs">
              Presence Penalty
            </Label>
            <span className="text-xs text-muted-foreground">{parameters.presencePenalty}</span>
          </div>
          <Slider
            id="presencePenalty"
            min={-2}
            max={2}
            step={0.1}
            value={[parameters.presencePenalty]}
            onValueChange={([value]) => updateParameter("presencePenalty", value)}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  )
}
