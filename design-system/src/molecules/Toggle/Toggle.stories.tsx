import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../../atoms/Icon";
import { Toggle } from "./index";

const meta = {
  title: "Components/Inputs/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radix toggle button — pressed state flips to the primary surface. Variants `default`/`outline`, sizes `sm`/`default`/`lg`.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["sm", "default", "lg"] },
    pressed: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { children: "Toggle me" },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Toggle variant="default" defaultPressed>
        Default on
      </Toggle>
      <Toggle variant="outline" defaultPressed>
        Outline on
      </Toggle>
      <Toggle variant="outline">Outline off</Toggle>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Toggle key={size} size={size} variant="outline">
          {size}
        </Toggle>
      ))}
    </div>
  ),
};

export const IconToggle: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="Toggle notifications">
      <Icon name="notification" />
    </Toggle>
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [pressed, setPressed] = useState(true);
    return (
      <div className="flex items-center gap-3">
        <Toggle
          variant="outline"
          pressed={pressed}
          onPressedChange={setPressed}>
          {pressed ? "Following" : "Follow"}
        </Toggle>
        <span className="text-muted-foreground text-xs">
          pressed: {String(pressed)}
        </span>
      </div>
    );
  },
};
