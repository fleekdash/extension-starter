import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InlineEditableTitle } from "./index";

const meta = {
  title: "Components/Inputs/InlineEditableTitle",
  component: InlineEditableTitle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Click-to-edit title: text swaps to an input, `onCommit`/`onCancel` on blur/Enter/Escape. `isEditable={false}` renders plain text.",
      },
    },
  },
  tags: ["autodocs"],
  args: { value: "Monthly revenue" },
} satisfies Meta<typeof InlineEditableTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

function EditableTitle(
  props: Readonly<React.ComponentProps<typeof InlineEditableTitle>>,
) {
  const [value, setValue] = useState(props.value);
  const [lastCommit, setLastCommit] = useState("");
  return (
    <div className="w-96 space-y-2">
      <InlineEditableTitle
        {...props}
        value={value}
        onChange={setValue}
        onCommit={(v) => setLastCommit(v)}
      />
      <p className="text-muted-foreground text-xs">
        Last commit: {lastCommit || "(none)"}
      </p>
    </div>
  );
}

export const Basic: Story = {
  args: { value: "Monthly revenue", onChange: () => {} },
  render: (args) => <EditableTitle {...args} />,
};

export const Empty: Story = {
  args: { value: "", onChange: () => {} },
  render: (args) => (
    <EditableTitle {...args} value="" placeholder="Untitled dashboard" />
  ),
};

export const ReadOnly: Story = {
  args: { value: "Monthly revenue", onChange: () => {} },
  render: (args) => <EditableTitle {...args} isEditable={false} />,
};

export const MaxLength: Story = {
  args: { value: "Monthly revenue", onChange: () => {} },
  render: (args) => <EditableTitle {...args} maxLength={20} />,
};
