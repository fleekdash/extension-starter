import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./Spinner";

const meta = {
  title: "Components/Feedback/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Traditional loading spinner with muted theme colors. Matches FleekDash design aesthetic.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
  },
};

export const Centered: Story = {
  render: () => (
    <div className="border-border h-64 w-full rounded-lg border">
      <Spinner.Centered text="Loading data..." />
    </div>
  ),
};

export const CenteredWithoutText: Story = {
  render: () => (
    <div className="border-border h-64 w-full rounded-lg border">
      <Spinner.Centered />
    </div>
  ),
};

export const Inline: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Spinner.Inline />
      <span>Loading...</span>
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <button
      disabled
      className="bg-primary text-primary-foreground flex items-center gap-2 rounded-md px-4 py-2">
      <Spinner.Inline />
      Loading...
    </button>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Spinner size="sm" />
        <span className="text-muted-foreground text-sm">Small (16px)</span>
      </div>
      <div className="flex items-center gap-4">
        <Spinner size="md" />
        <span className="text-muted-foreground text-sm">Medium (32px)</span>
      </div>
      <div className="flex items-center gap-4">
        <Spinner size="lg" />
        <span className="text-muted-foreground text-sm">Large (48px)</span>
      </div>
      <div className="flex items-center gap-4">
        <Spinner size="xl" />
        <span className="text-muted-foreground text-sm">
          Extra Large (64px)
        </span>
      </div>
    </div>
  ),
};
