import type { Meta, StoryObj } from "@storybook/react-vite";
import { Shimmer } from "./index";

const meta = {
  title: "Components/Feedback/Shimmer",
  component: Shimmer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Absolute-positioned shimmer sweep for loading overlays — drop inside a `relative` container to cover it.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    show: { control: "boolean" },
    duration: { control: { type: "range", min: 0.3, max: 4, step: 0.1 } },
  },
  args: { show: true, duration: 1.5 },
} satisfies Meta<typeof Shimmer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="bg-muted/40 relative h-24 w-72 overflow-hidden rounded-md">
      <Shimmer {...args} />
    </div>
  ),
};

export const OverContent: Story = {
  name: "Overlaying content",
  render: (args) => (
    <div className="relative w-72 space-y-2 overflow-hidden rounded-md">
      <p className="text-sm font-medium">Revenue this month</p>
      <p className="text-2xl font-bold">$84,210</p>
      <p className="text-muted-foreground text-xs">+12% vs last month</p>
      <Shimmer {...args} />
    </div>
  ),
};

export const Slow: Story = {
  args: { duration: 3 },
  render: (args) => (
    <div className="bg-muted/40 relative h-24 w-72 overflow-hidden rounded-md">
      <Shimmer {...args} />
    </div>
  ),
};
