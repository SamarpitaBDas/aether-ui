"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

const meta = {
  title: "UI/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A slider component for selecting values within a range.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    min: {
      control: "number",
    },
    max: {
      control: "number",
    },
    step: {
      control: "number",
    },
    disabled: {
      control: "boolean",
    },
  },
  args: { onValueChange: fn() },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
  render: (args) => (
    <div className="w-80">
      <Slider {...args} />
    </div>
  ),
}

export const WithRange: Story = {
  args: {
    defaultValue: [25, 75],
    max: 100,
    step: 1,
  },
  render: (args) => (
    <div className="w-80">
      <Slider {...args} />
    </div>
  ),
}

export const Temperature: Story = {
  render: () => {
    const [temperature, setTemperature] = useState([0.7])

    return (
      <div className="w-80 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Temperature</Label>
            <span className="text-sm text-muted-foreground">{temperature[0]}</span>
          </div>
          <Slider value={temperature} onValueChange={setTemperature} min={0} max={2} step={0.1} />
          <p className="text-xs text-muted-foreground">Controls randomness in AI responses</p>
        </div>
      </div>
    )
  },
}

export const MaxTokens: Story = {
  render: () => {
    const [maxTokens, setMaxTokens] = useState([2048])

    return (
      <div className="w-80 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Max Tokens</Label>
            <span className="text-sm text-muted-foreground">{maxTokens[0]}</span>
          </div>
          <Slider value={maxTokens} onValueChange={setMaxTokens} min={1} max={4096} step={1} />
          <p className="text-xs text-muted-foreground">Maximum number of tokens to generate</p>
        </div>
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    disabled: true,
  },
  render: (args) => (
    <div className="w-80">
      <Slider {...args} />
    </div>
  ),
}

export const SmallStep: Story = {
  args: {
    defaultValue: [0.5],
    min: 0,
    max: 1,
    step: 0.01,
  },
  render: (args) => (
    <div className="w-80">
      <Slider {...args} />
    </div>
  ),
}
