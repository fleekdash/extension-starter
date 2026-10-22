import { Label } from "../../organisms/Label";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Switch from "./switch";

const meta = {
  title: "Components/Inputs/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "The controlled state of the switch",
    },
    defaultChecked: {
      control: "boolean",
      description: "The default state when uncontrolled",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
    },
    onCheckedChange: {
      action: "checked changed",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof Switch>;

// Wrapper component for stories that need a label
const SwitchWithLabel = ({
  label,
  ...props
}: { label: string } & React.ComponentProps<typeof Switch>) => (
  <div className="flex items-center gap-2">
    <Switch {...props} id="airplane-mode" />
    <Label htmlFor="airplane-mode">{label}</Label>
  </div>
);

export const Default: Story = {
  render: () => <Switch />,
};

export const WithLabel: Story = {
  render: () => <SwitchWithLabel label="Airplane Mode" />,
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

// ThemeSwitch Stories
