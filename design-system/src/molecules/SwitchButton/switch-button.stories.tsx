import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import SwitchButton from "./switch-button";

const meta = {
  title: "Components/Inputs/SwitchButton",
  component: SwitchButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "The controlled state of the switch",
    },
    onCheckedChange: {
      action: "checked changed",
    },
    label: {
      control: "text",
      description: "The label text for the switch button",
    },
    description: {
      control: "text",
      description: "Optional description text below the label",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch button is disabled",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the switch button container",
    },
    switchSize: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the actual switch component",
    },
    variant: {
      control: "select",
      options: ["default", "ghost", "outline"],
      description: "Visual variant of the switch button",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SwitchButton>;

export default meta;
type Story = StoryObj<typeof SwitchButton>;

// Interactive wrapper for stories
type SwitchButtonStoryProps = React.ComponentProps<typeof SwitchButton>;

const InteractiveWrapper = (args: SwitchButtonStoryProps) => {
  const [checked, setChecked] = useState(args.checked || false);
  return (
    <SwitchButton {...args} checked={checked} onCheckedChange={setChecked} />
  );
};

const MultipleSwitchesExample: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    analytics: false,
  });

  const handleChange = (key: keyof typeof settings) => (checked: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="w-80 space-y-3">
      <SwitchButton
        label="Push notifications"
        description="Receive notifications for important updates"
        checked={settings.notifications}
        onCheckedChange={handleChange("notifications")}
      />
      <SwitchButton
        label="Dark mode"
        description="Switch to dark theme"
        checked={settings.darkMode}
        onCheckedChange={handleChange("darkMode")}
      />
      <SwitchButton
        label="Auto-save"
        description="Automatically save changes"
        checked={settings.autoSave}
        onCheckedChange={handleChange("autoSave")}
      />
      <SwitchButton
        label="Analytics"
        description="Help improve the app by sharing usage data"
        checked={settings.analytics}
        onCheckedChange={handleChange("analytics")}
        variant="ghost"
      />
    </div>
  );
};

export const Default: Story = {
  render: InteractiveWrapper,
  args: {
    label: "Enable notifications",
    checked: false,
  },
};

export const WithDescription: Story = {
  render: InteractiveWrapper,
  args: {
    label: "Dark mode",
    description: "Switch between light and dark themes",
    checked: true,
  },
};

export const Small: Story = {
  render: InteractiveWrapper,
  args: {
    label: "Compact mode",
    size: "sm",
    switchSize: "sm",
    checked: false,
  },
};

export const Large: Story = {
  render: InteractiveWrapper,
  args: {
    label: "Advanced settings",
    description: "Enable advanced configuration options",
    size: "lg",
    switchSize: "md",
    checked: true,
  },
};

export const Disabled: Story = {
  render: InteractiveWrapper,
  args: {
    label: "Disabled option",
    description: "This option is currently disabled",
    checked: false,
    disabled: true,
  },
};

export const Ghost: Story = {
  render: InteractiveWrapper,
  args: {
    label: "Ghost variant",
    variant: "ghost",
    checked: true,
  },
};

export const Outline: Story = {
  render: InteractiveWrapper,
  args: {
    label: "Outline variant",
    variant: "outline",
    checked: false,
  },
};

export const Multiple: Story = {
  render: () => <MultipleSwitchesExample />,
};
