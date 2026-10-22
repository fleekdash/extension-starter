import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../../atoms/Icon";
import { Input, InputAddon, InputGroup } from "./index";

const meta = {
  title: "Components/Inputs/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Text input (sm/md/lg) with `InputGroup`/`InputWrapper`/`InputAddon` composition for leading/trailing slots.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    type: { control: "text" },
  },
  args: { placeholder: "Widget title" },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Input variant="sm" placeholder="Small (sm)" />
      <Input variant="md" placeholder="Medium (md)" />
      <Input variant="lg" placeholder="Large (lg)" />
    </div>
  ),
};

export const WithAddons: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <InputGroup>
        <InputAddon>
          <Icon name="search" />
        </InputAddon>
        <Input placeholder="Search widgets..." />
      </InputGroup>
      <InputGroup>
        <Input placeholder="https://" />
        <InputAddon mode="icon">
          <Icon name="globe" />
        </InputAddon>
      </InputGroup>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Input placeholder="Normal" />
      <Input placeholder="Disabled" disabled />
      <Input defaultValue="Invalid value" aria-invalid />
    </div>
  ),
};
