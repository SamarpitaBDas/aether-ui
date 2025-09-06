"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PromptTemplate } from "@/types"

interface TemplateParameterFormProps {
  template: PromptTemplate
  onApply: (processedContent: string) => void
}

export function TemplateParameterForm({ template, onApply }: TemplateParameterFormProps) {
  const [parameters, setParameters] = useState<Record<string, any>>({})

  useEffect(() => {
    // Initialize parameters with default values
    const initialParams: Record<string, any> = {}
    template.parameters.forEach((param) => {
      initialParams[param.name] = param.defaultValue
    })
    setParameters(initialParams)
  }, [template])

  const updateParameter = (name: string, value: any) => {
    setParameters((prev) => ({ ...prev, [name]: value }))
  }

  const processTemplate = () => {
    let processedContent = template.content

    // Replace template variables with actual values
    template.parameters.forEach((param) => {
      const value = parameters[param.name] || param.defaultValue
      const placeholder = `{${param.name}}`
      processedContent = processedContent.replace(new RegExp(placeholder, "g"), value)
    })

    onApply(processedContent)
  }

  if (template.parameters.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          Template Parameters
          <Badge variant="outline" className="text-xs">
            {template.category}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {template.parameters.map((param) => (
          <div key={param.name} className="space-y-2">
            <Label htmlFor={param.name} className="text-xs font-medium">
              {param.name}
            </Label>
            <Input
              id={param.name}
              type={param.type === "number" ? "number" : "text"}
              value={parameters[param.name] || ""}
              onChange={(e) => {
                const value = param.type === "number" ? Number(e.target.value) : e.target.value
                updateParameter(param.name, value)
              }}
              placeholder={param.description}
              className="text-sm"
            />
            <p className="text-xs text-muted-foreground">{param.description}</p>
          </div>
        ))}
        <Button onClick={processTemplate} size="sm" className="w-full">
          Apply Template
        </Button>
      </CardContent>
    </Card>
  )
}
