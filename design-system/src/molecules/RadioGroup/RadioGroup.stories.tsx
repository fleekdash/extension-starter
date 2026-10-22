import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "../../atoms/Label";
import { RadioGroup, RadioGroupItem } from "./index";

const meta = {
  title: "Components/Inputs/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radix radio group with FleekDash ring styling. Pair each `RadioGroupItem` with a `Label`.",
      },
    },
  },
  tags: ["autodocs"],
  args: { defaultValue: "split-top" },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const LAYOUTS = [
  { value: "split-top", label: "Split top" },
  { value: "split-bottom", label: "Split bottom" },
  { value: "three-row", label: "Three row" },
];

export const Basic: Story = {
  render: (args) => (
    <RadioGroup {...args} className="space-y-2">
      {LAYOUTS.map((layout) => (
        <div key={layout.value} className="flex items-center gap-2">
          <RadioGroupItem value={layout.value} id={layout.value} />
          <Label htmlFor={layout.value}>{layout.label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState("body");
    return (
      <div className="space-y-3">
        <RadioGroup
          value={value}
          onValueChange={setValue}
          className="space-y-2">
          {["cluster", "rail", "hero", "body", "banner"].map((size) => (
            <div key={size} className="flex items-center gap-2">
              <RadioGroupItem value={size} id={`size-${size}`} />
              <Label htmlFor={`size-${size}`}>{size}</Label>
            </div>
          ))}
        </RadioGroup>
        <p className="text-muted-foreground text-xs">Selected: {value}</p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="a" className="space-y-2">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="a" id="ra" disabled />
        <Label htmlFor="ra">Disabled selected</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="b" id="rb" />
        <Label htmlFor="rb">Enabled</Label>
      </div>
    </RadioGroup>
  ),
};
