import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../../organisms/Input";
import { Field } from "./index";

const meta = {
  title: "Components/Inputs/Field",
  component: Field,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Label + control + hint composition wrapper. Use for plain form rows that do not need react-hook-form wiring.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithHint: Story = {
  args: { children: null },
  render: () => (
    <div className="w-80">
      <Field
        label="Widget title"
        htmlFor="widget-title"
        hint="Shown in the widget header and customize drawer.">
        <Input id="widget-title" placeholder="Monthly revenue" />
      </Field>
    </div>
  ),
};

export const LabelOnly: Story = {
  args: { children: null },
  render: () => (
    <div className="w-80">
      <Field label="Slug" htmlFor="slug">
        <Input id="slug" placeholder="monthly-revenue" />
      </Field>
    </div>
  ),
};

export const NoLabel: Story = {
  args: { children: null },
  render: () => (
    <div className="w-80">
      <Field hint="Plain field group without a label.">
        <Input placeholder="Unlabeled input" />
      </Field>
    </div>
  ),
};
