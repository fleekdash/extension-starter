import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { Textarea } from "./index";
import { Label } from "../Label";

const meta = {
  title: "Components/Inputs/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Base textarea with the shared FIELD_FOCUS_CONTROL ring and disabled styling.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    rows: { control: "number" },
  },
  args: {
    placeholder: "Write something…",
    rows: 4,
    disabled: false,
    onChange: action("changed"),
  },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  name: "With value",
  args: {
    defaultValue:
      "Release notes draft:\n- Storybook catalog now covers all 7 widget types\n- KPI group populates from demo data",
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Disabled content" },
};

export const WithLabel: Story = {
  name: "With label",
  render: (args) => (
    <div className="w-80 space-y-2">
      <Label htmlFor="story-textarea">Description</Label>
      <Textarea {...args} id="story-textarea" />
    </div>
  ),
};
