import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./index";

const meta = {
  title: "Components/Feedback/SkeletonBase",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Preset-shaped skeleton primitive (card/title/text/avatar/button) — the older sibling of `atoms/Skeleton`, kept because callers use its fixed presets. Prefer `atoms/Skeleton` for free-form sizing.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "card", "title", "text", "avatar", "button"],
    },
  },
  args: { variant: "text" },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Presets: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      {(["text", "title", "avatar", "button", "card", "default"] as const).map(
        (variant) => (
          <div key={variant} className="flex items-center gap-3">
            <Skeleton {...args} variant={variant} />
            <span className="text-muted-foreground text-xs">{variant}</span>
          </div>
        ),
      )}
    </div>
  ),
};

export const ComposedCard: Story = {
  name: "Composed card placeholder",
  render: () => (
    <div className="border-border w-64 space-y-3 rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="avatar" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="title" className="w-3/4" />
          <Skeleton variant="text" />
        </div>
      </div>
      <Skeleton variant="card" className="h-24" />
      <Skeleton variant="button" />
    </div>
  ),
};
