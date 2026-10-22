import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PressHoldDeleteButton } from "./index";

const meta = {
  title: "Components/Inputs/PressHoldDeleteButton",
  component: PressHoldDeleteButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Destructive action gated by a press-and-hold progress ring — releasing early cancels. `holdDuration` (ms) tunes the hold time; `showTooltip={false}` for use inside other popovers.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: {
      control: "select",
      options: ["ghost", "destructive", "outline"],
    },
    holdDuration: { control: { type: "number", min: 300, step: 100 } },
    disabled: { control: "boolean" },
  },
  args: { holdDuration: 1500 },
} satisfies Meta<typeof PressHoldDeleteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

type HoldToDeleteProps = Omit<
  React.ComponentProps<typeof PressHoldDeleteButton>,
  "onDelete"
>;

function HoldToDelete(props: Readonly<HoldToDeleteProps>) {
  const [deleted, setDeleted] = useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <PressHoldDeleteButton {...props} onDelete={() => setDeleted(true)} />
      <p className="text-muted-foreground text-xs">
        {deleted ? "Deleted!" : "Press and hold the button"}
      </p>
    </div>
  );
}

export const Basic: Story = {
  args: { onDelete: () => {} },
  render: (args) => <HoldToDelete {...args} />,
};

export const VariantsAndSizes: Story = {
  args: { onDelete: () => {} },
  render: () => (
    <div className="flex items-center gap-4">
      {(["ghost", "destructive", "outline"] as const).map((variant) => (
        <HoldToDelete key={variant} variant={variant} size="md" />
      ))}
      {(["sm", "md", "lg"] as const).map((size) => (
        <HoldToDelete key={size} size={size} />
      ))}
    </div>
  ),
};

export const QuickHold: Story = {
  args: { onDelete: () => {} },
  render: () => <HoldToDelete holdDuration={400} tooltipText="Quick hold" />,
};
