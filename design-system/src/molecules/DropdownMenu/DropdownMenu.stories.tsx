import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../organisms/Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./index";

const meta = {
  title: "Components/Overlay/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dropdown menu with items, checkbox/radio groups, shortcuts, labels and sub-menus.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Widget actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Edit
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Size</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Cluster</DropdownMenuItem>
            <DropdownMenuItem>Rail</DropdownMenuItem>
            <DropdownMenuItem>Hero</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const CheckboxesAndRadio: Story = {
  render: function Render() {
    const [showGrid, setShowGrid] = useState(true);
    const [density, setDensity] = useState("comfortable");
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">View options</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Display</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={showGrid}
            onCheckedChange={setShowGrid}>
            Show grid lines
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Density</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
            <DropdownMenuRadioItem value="compact">
              Compact
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="comfortable">
              Comfortable
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="spacious">
              Spacious
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};
