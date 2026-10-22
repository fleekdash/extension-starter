import type { Meta, StoryObj } from "@storybook/react-vite";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./index";

const meta = {
  title: "Components/Overlay/HoverCard",
  component: HoverCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radix hover card — rich preview shown on hover/focus of the trigger.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger className="text-primary text-sm underline underline-offset-4">
        @fleekdash
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="space-y-1">
          <p className="text-sm font-semibold">FleekDash</p>
          <p className="text-muted-foreground text-xs">
            Dashboard builder — widgets, connectors and themes validated in
            Storybook.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="flex gap-8">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <HoverCard key={side}>
          <HoverCardTrigger className="border-border rounded-md border px-3 py-1.5 text-sm">
            {side}
          </HoverCardTrigger>
          <HoverCardContent side={side} className="w-40">
            <p className="text-xs">Card opens on the {side}.</p>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  ),
};
