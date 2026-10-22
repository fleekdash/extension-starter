import type { Meta, StoryObj } from "@storybook/react-vite";
import { EmptyState } from "./index";

const meta = {
  title: "Components/Feedback/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Empty-state panel: single icon or a 3-icon fanned stack (passing exactly 3 `icons` triggers the stacked treatment), title, description and optional action button.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    icon: { control: "text" },
    title: { control: "text" },
    description: { control: "text" },
  },
  args: {
    title: "No widgets yet",
    description: "Add your first widget to start building this dashboard.",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleIcon: Story = {
  args: { icon: "stat" },
};

export const StackedIcons: Story = {
  args: {
    icons: ["stat", "notification", "settings"],
    title: "Nothing to review",
    description: "Pending items across all connectors appear here.",
  },
};

export const WithAction: Story = {
  args: {
    icon: "rocket",
    action: {
      label: "Add widget",
      onClick: () => {},
    },
  },
};

export const NoIcon: Story = {
  args: {
    title: "All caught up",
    description: "There is nothing left in this queue.",
  },
};
