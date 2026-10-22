import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea } from "./index";

const meta = {
  title: "Components/Layout/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radix scroll area with the FleekDash scrollbar styling. Bound the root with a fixed height/width; the viewport scrolls inside it.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="border-border h-48 w-64 rounded-md border p-3">
      <div className="space-y-2">
        {Array.from({ length: 24 }, (_, i) => (
          <p key={i} className="text-sm">
            Scrollable item {i + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const InCard: Story = {
  name: "Inside a card",
  render: () => (
    <div className="border-border bg-card w-72 rounded-lg border p-4">
      <h3 className="mb-2 text-sm font-medium">Notifications</h3>
      <ScrollArea className="h-40">
        <div className="space-y-3">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="text-muted-foreground text-xs">
              Update {i + 1} — a dashboard widget changed state.
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
};
