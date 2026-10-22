import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "./index";

const meta = {
  title: "Components/Inputs/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radix slider with optional value tooltip (`showTooltip` + `tooltipContent`). Supports single and range values.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    showTooltip: { control: "boolean" },
    min: { control: "number" },
    max: { control: "number" },
  },
  args: { min: 0, max: 100 },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: { defaultValue: [40] },
};

export const WithTooltip: Story = {
  args: {
    defaultValue: [65],
    showTooltip: true,
    tooltipContent: (value: number) => `${value}%`,
  },
};

export const Range: Story = {
  args: { defaultValue: [20, 80] },
};

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState([30]);
    return (
      <div className="space-y-3">
        <Slider value={value} onValueChange={setValue} max={100} />
        <p className="text-muted-foreground text-xs">Value: {value[0]}</p>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { defaultValue: [50], disabled: true },
};
