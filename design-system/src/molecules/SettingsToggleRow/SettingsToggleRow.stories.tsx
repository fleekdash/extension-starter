import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SettingsToggleRow } from "./index";

const meta = {
  title: "Components/Settings/SettingsToggleRow",
  component: SettingsToggleRow,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Compact settings row: title, description and a switch. `optimistic` uses the OptimisticSwitch for instant visual feedback; `pending` shows the busy state.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    pending: { control: "boolean" },
    optimistic: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SettingsToggleRow>;

export default meta;
type Story = StoryObj<typeof meta>;

type ToggleRowProps = Omit<
  React.ComponentProps<typeof SettingsToggleRow>,
  "checked" | "onCheckedChange"
> & { checked?: boolean };

function ToggleRow(props: Readonly<ToggleRowProps>) {
  const [checked, setChecked] = useState(props.checked ?? false);
  return (
    <SettingsToggleRow
      {...props}
      checked={checked}
      onCheckedChange={setChecked}
    />
  );
}

export const Basic: Story = {
  args: { id: "row", title: "Row", checked: false, onCheckedChange: () => {} },
  render: () => (
    <ToggleRow
      id="auto-refresh"
      title="Auto refresh"
      description="Refresh widget data on the dashboard interval."
      checked
    />
  ),
};

export const Group: Story = {
  args: { id: "row", title: "Row", checked: false, onCheckedChange: () => {} },
  render: () => (
    <div className="divide-border divide-y">
      <ToggleRow
        id="row-1"
        title="Show legend"
        description="Display the chart legend below the plot."
        checked
      />
      <ToggleRow
        id="row-2"
        title="Compact numbers"
        description="Format large values as 1.2K / 3.4M."
        checked={false}
      />
      <ToggleRow
        id="row-3"
        title="Optimistic save"
        description="Instant toggle feedback via OptimisticSwitch."
        checked
        optimistic
      />
    </div>
  ),
};

export const PendingAndDisabled: Story = {
  args: { id: "row", title: "Row", checked: false, onCheckedChange: () => {} },
  render: () => (
    <div className="divide-border divide-y">
      <ToggleRow
        id="p1"
        title="Saving..."
        description="Pending state while the request runs."
        checked
        pending
      />
      <ToggleRow
        id="p2"
        title="Locked setting"
        description="Managed by the workspace admin."
        checked={false}
        disabled
      />
    </div>
  ),
};
