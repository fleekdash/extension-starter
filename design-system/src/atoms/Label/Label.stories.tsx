import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../../organisms/Input";
import { Label } from "./index";

const meta = {
  title: "Components/Inputs/Label",
  component: Label,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radix form label. Dims automatically when its peer input is disabled (`peer-disabled:`).",
      },
    },
  },
  tags: ["autodocs"],
  args: { children: "Field label" },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInput: Story = {
  name: "Associated with input",
  render: (args) => (
    <div className="w-64 space-y-2">
      <Label {...args} htmlFor="story-label-input">
        Email
      </Label>
      <Input id="story-label-input" placeholder="name@example.com" />
    </div>
  ),
};

export const DisabledPeer: Story = {
  name: "Disabled peer (dimmed)",
  render: (args) => (
    <div className="flex w-64 items-center gap-2">
      <Input
        id="story-label-disabled"
        disabled
        className="peer"
        placeholder="Unavailable"
      />
      {/* Label renders AFTER the peer sibling — Tailwind peer-* variants
          only look at preceding siblings, which is why the shadcn
          convention puts Label after the control. */}
      <Label {...args} htmlFor="story-label-disabled">
        Disabled field
      </Label>
    </div>
  ),
};
