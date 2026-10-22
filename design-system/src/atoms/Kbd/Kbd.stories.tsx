import type { Meta, StoryObj } from "@storybook/react-vite";
import { Kbd } from "./index";

const meta = {
  title: "Components/Data Display/Kbd",
  component: Kbd,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Keyboard shortcut hint. Predefined keys (cmd, ctrl, shift, alt, enter, space, esc) render icons/labels; any other string renders uppercase text.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    keys: { control: "object" },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: { keys: ["cmd", "k"], size: "md" },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PredefinedKeys: Story = {
  name: "Predefined keys",
  render: (args) => (
    <div className="flex flex-col items-start gap-2">
      <Kbd {...args} keys={["cmd", "shift", "f"]} />
      <Kbd {...args} keys={["ctrl", "k"]} />
      <Kbd {...args} keys={["alt", "enter"]} />
      <Kbd {...args} keys={["esc"]} />
      <Kbd {...args} keys={["space"]} />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Kbd key={size} {...args} size={size} keys={["cmd", "k"]} />
      ))}
    </div>
  ),
};

export const CustomLabels: Story = {
  args: { keys: ["tab", "then", "?"] },
};
