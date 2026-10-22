import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectButton } from "./index";

const OPTIONS = [
  { value: "line", label: "Line chart", icon: "stat" as const },
  { value: "area", label: "Area chart", icon: "stat" as const },
  { value: "bar", label: "Bar chart", icon: "stat" as const },
  { value: "donut", label: "Donut", icon: "stat" as const },
];

const meta = {
  title: "Components/Inputs/SelectButton",
  component: SelectButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dropdown-backed select rendered as a `Button` — options carry label + optional icon; supports label, variants and sizes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    buttonVariant: {
      control: "select",
      options: ["default", "outline", "ghost", "ghost-default"],
    },
    buttonSize: {
      control: "select",
      options: ["xs", "sm", "default", "lg", "xl"],
    },
  },
  args: { options: OPTIONS, defaultValue: "area" },
} satisfies Meta<typeof SelectButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithLabel: Story = {
  args: { label: "Chart type", buttonVariant: "outline" },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-3">
      {(["default", "outline", "ghost", "ghost-default"] as const).map(
        (variant) => (
          <SelectButton
            key={variant}
            label={variant}
            options={OPTIONS}
            defaultValue="bar"
            buttonVariant={variant}
          />
        ),
      )}
    </div>
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState("line");
    return (
      <div className="space-y-2">
        <SelectButton
          options={OPTIONS}
          defaultValue={value}
          onValueChange={setValue}
          buttonVariant="outline"
        />
        <p className="text-muted-foreground text-xs">Selected: {value}</p>
      </div>
    );
  },
};
