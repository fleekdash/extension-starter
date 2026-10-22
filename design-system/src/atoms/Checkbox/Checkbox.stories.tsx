import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { Checkbox } from "./index";
import { Label } from "../Label";

const meta = {
  title: "Components/Inputs/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radix checkbox with FleekDash focus/invalid styling and three sizes. Supports checked, unchecked, indeterminate and disabled states.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    checked: {
      control: "select",
      options: [true, false, "indeterminate"],
    },
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
  },
  args: {
    size: "md",
    checked: false,
    disabled: false,
    onCheckedChange: action("checkedChanged"),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { checked: "indeterminate" },
};

export const Disabled: Story = {
  args: { disabled: true, checked: true },
};

export const Invalid: Story = {
  args: { "aria-invalid": true },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex items-center gap-2">
          <Checkbox {...args} size={size} checked />
          <span className="text-muted-foreground text-xs">{size}</span>
        </div>
      ))}
    </div>
  ),
};

function CheckboxWithLabelDemo(args: React.ComponentProps<typeof Checkbox>) {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        {...args}
        id="story-checkbox"
        checked={checked}
        onCheckedChange={(value) => {
          setChecked(value === true);
          action("checkedChanged")(value);
        }}
      />
      <Label htmlFor="story-checkbox">Accept terms</Label>
    </div>
  );
}

export const WithLabel: Story = {
  name: "With label (interactive)",
  render: (args) => <CheckboxWithLabelDemo {...args} />,
};
