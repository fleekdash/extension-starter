import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./index";

const meta = {
  title: "Components/Overlay/ContextMenu",
  component: ContextMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Right-click context menu with items, labels, separators and nested sub-menus.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="border-border text-muted-foreground flex h-32 w-72 items-center justify-center rounded-md border border-dashed text-sm">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Widget</ContextMenuLabel>
        <ContextMenuItem>Edit settings</ContextMenuItem>
        <ContextMenuItem>Duplicate</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>Move to</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Hero slot</ContextMenuItem>
            <ContextMenuItem>Rail slot</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-destructive">Remove</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
