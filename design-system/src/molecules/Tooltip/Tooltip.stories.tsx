import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../organisms/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./index";

const meta = {
  title: "Components/Overlay/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radix tooltip with dark surface + arrow. `TooltipProvider` controls the shared `delayDuration`.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={150}>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Refresh this widget</TooltipContent>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="flex gap-6 pt-2">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">
              {side}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

export const NoArrow: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">No arrow</Button>
      </TooltipTrigger>
      <TooltipContent showArrow={false}>Flat tooltip</TooltipContent>
    </Tooltip>
  ),
};
