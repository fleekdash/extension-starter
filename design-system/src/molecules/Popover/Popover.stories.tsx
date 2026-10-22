import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../organisms/Button";
import { Popover, PopoverContent, PopoverTrigger } from "./index";

const meta = {
  title: "Components/Overlay/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radix popover — anchored floating panel for settings, pickers and small forms.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-2">
          <p className="text-sm font-medium">Dimensions</p>
          <p className="text-muted-foreground text-xs">
            Set the widget footprint on the dashboard grid.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Alignments: Story = {
  render: () => (
    <div className="flex gap-4">
      {(["start", "center", "end"] as const).map((align) => (
        <Popover key={align}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              align={align}
            </Button>
          </PopoverTrigger>
          <PopoverContent align={align} className="w-48">
            <p className="text-xs">Aligned to the {align} of the trigger.</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};
