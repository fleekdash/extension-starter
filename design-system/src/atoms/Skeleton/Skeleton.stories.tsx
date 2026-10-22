import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton, WidgetSkeleton } from "./index";

const meta = {
  title: "Components/Feedback/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Loading placeholder primitives (`skeleton-bg` token surface) plus the dashboard/widget composite skeletons. Variants: default, circular, rounded; animations: pulse, shimmer, none.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "circular", "rounded"],
    },
    animation: { control: "select", options: ["pulse", "shimmer", "none"] },
    width: { control: "text" },
    height: { control: "text" },
  },
  args: { variant: "rounded", animation: "pulse", width: 200, height: 20 },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-end gap-6">
      <div className="space-y-2 text-center">
        <Skeleton {...args} variant="default" width={160} height={20} />
        <p className="text-muted-foreground text-xs">default</p>
      </div>
      <div className="space-y-2 text-center">
        <Skeleton {...args} variant="rounded" width={160} height={20} />
        <p className="text-muted-foreground text-xs">rounded</p>
      </div>
      <div className="space-y-2 text-center">
        <Skeleton {...args} variant="circular" width={48} height={48} />
        <p className="text-muted-foreground text-xs">circular</p>
      </div>
    </div>
  ),
};

export const Shimmer: Story = {
  args: { animation: "shimmer", width: 280, height: 16 },
};

export const TextBlock: Story = {
  name: "Composed text block",
  render: (args) => (
    <div className="w-72 space-y-2">
      <Skeleton {...args} width="80%" height={18} variant="rounded" />
      <Skeleton {...args} width="100%" height={12} variant="rounded" />
      <Skeleton {...args} width="95%" height={12} variant="rounded" />
      <Skeleton {...args} width="60%" height={12} variant="rounded" />
    </div>
  ),
};

export const WidgetStats: Story = {
  name: "WidgetSkeleton — stats",
  render: () => (
    <div className="w-64">
      <WidgetSkeleton type="stats" />
    </div>
  ),
};

export const WidgetChart: Story = {
  name: "WidgetSkeleton — chart",
  render: () => (
    <div className="w-80">
      <WidgetSkeleton type="chart" />
    </div>
  ),
};
