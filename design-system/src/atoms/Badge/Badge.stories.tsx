import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./index";

const meta = {
  title: "Components/Data Display/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Status badge with variant × appearance × size × shape matrix. Light appearances resolve the theme `--color-*-soft/accent` tokens.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "info",
        "outline",
        "destructive",
      ],
    },
    appearance: {
      control: "select",
      options: ["default", "light", "outline", "ghost"],
    },
    size: { control: "select", options: ["lg", "md", "sm", "xs"] },
    shape: { control: "select", options: ["default", "circle"] },
    disabled: { control: "boolean" },
  },
  args: {
    variant: "primary",
    appearance: "default",
    size: "md",
    shape: "default",
    disabled: false,
    children: "Badge",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      {(
        [
          "default",
          "primary",
          "secondary",
          "success",
          "warning",
          "info",
          "outline",
          "destructive",
        ] as const
      ).map((variant) => (
        <Badge key={variant} {...args} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};

export const LightAppearances: Story = {
  name: "Light appearances",
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      {(
        [
          "primary",
          "secondary",
          "success",
          "warning",
          "info",
          "destructive",
        ] as const
      ).map((variant) => (
        <Badge key={variant} {...args} variant={variant} appearance="light">
          {variant}
        </Badge>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <Badge key={size} {...args} size={size}>
          {size}
        </Badge>
      ))}
    </div>
  ),
};

export const CircleDot: Story = {
  name: "Circle (status dot)",
  args: { shape: "circle", children: "3", variant: "destructive" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
