import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "./index";

const meta = {
  title: "Components/Layout/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radix separator painted with `--border`. Horizontal and vertical orientations.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    decorative: { control: "boolean" },
  },
  args: { orientation: "horizontal", decorative: true },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <div className="w-64 space-y-3">
      <p className="text-sm">Section above</p>
      <Separator {...args} />
      <p className="text-sm">Section below</p>
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div className="flex h-10 items-center gap-3">
      <span className="text-sm">Left</span>
      <Separator {...args} />
      <span className="text-sm">Right</span>
    </div>
  ),
};
