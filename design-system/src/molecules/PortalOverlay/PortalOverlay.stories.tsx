import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../organisms/Button";
import { PortalOverlay } from "./index";

const meta = {
  title: "Components/Overlay/PortalOverlay",
  component: PortalOverlay,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Scrim + centered content shell for custom overlays. `onBackdropMouseDown` fires only when the press starts on the scrim — safe click-outside-to-close.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PortalOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ClickOutsideToClose: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <div className="relative h-64 w-full">
        <Button onClick={() => setOpen(true)}>Open overlay</Button>
        {open && (
          <PortalOverlay
            onBackdropMouseDown={() => setOpen(false)}
            className="absolute inset-0">
            <div className="bg-card border-border w-64 rounded-lg border p-4 shadow-lg">
              <p className="text-sm font-medium">Overlay content</p>
              <p className="text-muted-foreground mt-1 text-xs">
                Press the scrim to close. Dragging from inside the card does not
                close it.
              </p>
            </div>
          </PortalOverlay>
        )}
      </div>
    );
  },
};
