import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../../organisms/Input";
import { Label } from "./index";

const meta = {
  title: "Components/Inputs/Label (organism)",
  component: Label,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radix label — organism build with the same contract as the atom; paired here with the organism Input.",
      },
    },
  },
  tags: ["autodocs"],
  args: { children: "Widget title" },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInput: Story = {
  render: (args) => (
    <div className="w-72 space-y-2">
      <Input id="org-label-input" placeholder="Monthly revenue" />
      <Label {...args} htmlFor="org-label-input" />
    </div>
  ),
};
