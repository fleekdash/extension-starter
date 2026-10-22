import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";

import { IconPicker } from "./index";

const meta: Meta<typeof IconPicker> = {
  title: "Components/Inputs/IconPicker",
  component: IconPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "Selected icons-map key",
    },
    onChange: {
      action: "changed",
    },
    placeholder: {
      control: "text",
    },
    triggerVariant: {
      control: "select",
      options: ["default", "icon-only"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

type IconPickerStoryProps = React.ComponentProps<typeof IconPicker>;

const ControlledIconPicker = (args: Partial<IconPickerStoryProps>) => {
  const [value, setValue] = useState(args.value ?? "");

  const handleChange = (next: string) => {
    setValue(next);
    args.onChange?.(next);
  };

  return (
    <div className="w-80">
      <IconPicker {...args} value={value} onChange={handleChange} />
      <p className="text-muted-foreground mt-2 text-xs">
        Selected key: {value || "(none)"}
      </p>
    </div>
  );
};

const ControlledIconPickerWithClear = (args: Partial<IconPickerStoryProps>) => {
  const [value, setValue] = useState(args.value ?? "users");

  return (
    <div className="w-80">
      <IconPicker
        {...args}
        value={value}
        onChange={setValue}
        onClear={() => setValue("")}
      />
      <p className="text-muted-foreground mt-2 text-xs">
        Selected key: {value || "(none)"}
      </p>
    </div>
  );
};

const IconPickerFormExample: React.FC = () => {
  const [icon, setIcon] = useState("settings");

  return (
    <div className="w-80 space-y-2">
      <label className="text-sm font-medium" htmlFor="icon-picker-demo">
        Menu icon
      </label>
      <IconPicker
        value={icon}
        onChange={setIcon}
        placeholder="Pick a menu icon"
      />
      <p className="text-muted-foreground text-xs">icons-map key: {icon}</p>
    </div>
  );
};

export const Default: Story = {
  render: ControlledIconPicker,
  args: {
    placeholder: "Select an icon",
  },
};

export const WithValue: Story = {
  render: ControlledIconPicker,
  args: {
    value: "users",
    placeholder: "Select an icon",
  },
};

export const IconOnlyTrigger: Story = {
  render: ControlledIconPicker,
  args: {
    value: "home",
    triggerVariant: "icon-only",
    emptyPreviewName: "home",
    title: "Change icon",
  },
};

export const WithClearAction: Story = {
  render: ControlledIconPickerWithClear,
  args: {
    value: "users",
    triggerVariant: "icon-only",
    emptyPreviewName: "home",
    title: "Change icon",
  },
};

export const InForm: Story = {
  render: () => <IconPickerFormExample />,
};
