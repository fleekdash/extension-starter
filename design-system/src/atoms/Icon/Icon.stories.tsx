import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "./index";

const meta = {
  title: "Components/Data Display/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Iconify-backed icon resolved through the FleekDash icon library (Solar-style set). `name` takes any registered key; unknown names render nothing.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    className: { control: "text" },
  },
  args: { name: "home", className: "size-6" },
  render: (args) => <Icon name={args.name} className={args.className} />,
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CommonSet: Story = {
  name: "Common icons",
  render: (args) => (
    <div className="flex flex-wrap items-center gap-5">
      {[
        "home",
        "stat",
        "settings",
        "membership",
        "notification",
        "search",
        "event",
        "globe",
        "rocket",
        "verified",
      ].map((name) => (
        <div key={name} className="flex flex-col items-center gap-1">
          <Icon {...args} name={name} />
          <span className="text-muted-foreground text-[10px]">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-4">
      {["size-3", "size-4", "size-5", "size-6", "size-8", "size-10"].map(
        (cls) => (
          <Icon key={cls} {...args} className={cls} />
        ),
      )}
    </div>
  ),
};

export const Colored: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Icon {...args} className="text-primary size-8" />
      <Icon
        {...args}
        className="size-8 text-[var(--color-success-accent,var(--color-green-500))]"
      />
      <Icon {...args} className="text-destructive size-8" />
      <Icon {...args} className="text-muted-foreground size-8" />
    </div>
  ),
};
