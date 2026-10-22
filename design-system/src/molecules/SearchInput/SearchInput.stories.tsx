import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchInput } from "./index";

const meta = {
  title: "Components/Inputs/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Debounced search field with focus ring shell and optional close affordance. `onValueChange` fires after `debounceMs`.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    debounceMs: { control: { type: "number", min: 0, step: 50 } },
    compact: { control: "boolean" },
    autoFocus: { control: "boolean" },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledSearch(
  props: Readonly<React.ComponentProps<typeof SearchInput>>,
) {
  const [value, setValue] = useState(props.value ?? "");
  const [committed, setCommitted] = useState("");
  return (
    <div className="w-80 space-y-2">
      <SearchInput
        {...props}
        value={value}
        onValueChange={(v) => {
          setValue(v);
          setCommitted(v);
        }}
      />
      <p className="text-muted-foreground text-xs">
        Debounced value: {committed || "(empty)"}
      </p>
    </div>
  );
}

export const Basic: Story = {
  render: () => <ControlledSearch placeholder="Search widgets..." />,
};

export const Compact: Story = {
  render: () => <ControlledSearch compact placeholder="Filter..." />,
};

export const FastDebounce: Story = {
  render: () => (
    <ControlledSearch debounceMs={50} placeholder="50ms debounce..." />
  ),
};

export const WithClose: Story = {
  render: () => (
    <ControlledSearch
      placeholder="Search posts..."
      onClose={() => {}}
      value="dashboard"
    />
  ),
};
