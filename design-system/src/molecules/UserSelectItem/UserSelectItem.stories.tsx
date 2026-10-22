import type { Meta, StoryObj } from "@storybook/react-vite";
import { UserSelectItem } from "./index";

const meta = {
  title: "Components/Data Display/UserSelectItem",
  component: UserSelectItem,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "User picker row: avatar, name, email and role badge. Toggle each section with `showAvatar`/`showEmail`/`showRole`; `avatarSize` sm/md/lg.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
    avatarSize: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: {
    id: "7",
    name: "Daniel Rocha",
    email: "daniel@ltdhunt.com",
    avatarUrl: "https://i.pravatar.cc/80?img=12",
    role: "administrator",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UserSelectItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      <UserSelectItem id="1" name="Selected user" selected />
      <UserSelectItem id="2" name="Normal user" />
      <UserSelectItem id="3" name="Disabled user" disabled />
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      <UserSelectItem
        id="7"
        name="Daniel Rocha"
        email="daniel@ltdhunt.com"
        avatarUrl="https://i.pravatar.cc/80?img=12"
        role="administrator"
        selected
      />
      <UserSelectItem
        id="8"
        name="Maria Souza"
        email="maria@ltdhunt.com"
        role="editor"
      />
      <UserSelectItem
        id="9"
        name="Guest"
        roles={["subscriber"]}
        showEmail={false}
      />
    </div>
  ),
};
