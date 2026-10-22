import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./index";

const meta = {
  title: "Components/Inputs/Textarea (organism)",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Organism textarea — `FIELD_FOCUS_CONTROL` ring, fixed min-height, `resize-none`. Same contract as the atom build.",
      },
    },
  },
  tags: ["autodocs"],
  args: { placeholder: "Describe this dashboard..." },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Disabled: Story = {
  args: { disabled: true, value: "Read-only content" },
};

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "Too short" },
};
