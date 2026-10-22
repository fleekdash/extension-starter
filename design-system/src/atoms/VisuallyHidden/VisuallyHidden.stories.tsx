import type { Meta, StoryObj } from "@storybook/react-vite";
import { VisuallyHidden } from "./index";
import { Icon } from "../Icon";

const meta = {
  title: "Components/Utilities/VisuallyHidden",
  component: VisuallyHidden,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radix `VisuallyHidden` passthrough — content stays in the a11y tree but is clipped out of view. The canonical use is giving icon-only controls an accessible name.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconOnlyButton: Story = {
  name: "Icon-only button (accessible name)",
  render: () => (
    <button
      type="button"
      className="border-border hover:bg-secondary flex size-9 items-center justify-center rounded-md border">
      <Icon name="search" className="size-4" aria-hidden />
      <VisuallyHidden>Search</VisuallyHidden>
    </button>
  ),
};

export const InDom: Story = {
  name: "Hidden but in the DOM",
  render: () => (
    <div className="text-muted-foreground space-y-2 text-center text-xs">
      <p>
        Nothing visible below this line — inspect the DOM to find the hidden
        text.
      </p>
      <VisuallyHidden>Screen-reader only announcement</VisuallyHidden>
    </div>
  ),
};
