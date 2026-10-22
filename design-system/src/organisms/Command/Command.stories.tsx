import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./index";

const meta = {
  title: "Components/Inputs/Command",
  component: Command,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "cmdk command palette — input, grouped items, empty state and shortcut hints.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {
  render: () => (
    <Command className="border-border w-96 rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Widgets">
          <CommandItem>
            Add chart widget
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
          <CommandItem>Add KPI group</CommandItem>
          <CommandItem>Add table</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Dashboard">
          <CommandItem>
            Customize layout
            <CommandShortcut>⌘L</CommandShortcut>
          </CommandItem>
          <CommandItem>Toggle demo data</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const Empty: Story = {
  render: () => (
    <Command className="border-border w-96 rounded-lg border shadow-md">
      <CommandInput placeholder="Search connectors..." />
      <CommandList>
        <CommandEmpty>No connectors match.</CommandEmpty>
      </CommandList>
    </Command>
  ),
};
