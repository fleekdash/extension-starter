import type { Meta, StoryObj } from "@storybook/react-vite";
import { MasonryGrid } from "./index";

const meta = {
  title: "Components/Layout/MasonryGrid",
  component: MasonryGrid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "CSS-columns masonry — `columns` 2–6 (responsive ramps), `gap` 4/6/8. Children keep natural heights.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    columns: { control: "select", options: [2, 3, 4, 5, 6] },
    gap: { control: "select", options: [4, 6, 8] },
  },
  args: { columns: 4, gap: 4 },
} satisfies Meta<typeof MasonryGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const HEIGHTS = [96, 140, 80, 120, 100, 160, 88, 132, 104, 76, 148, 92];

export const Basic: Story = {
  args: { children: null },
  render: (args) => (
    <MasonryGrid {...args}>
      {HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="bg-muted/50 border-border mb-4 flex break-inside-avoid items-center justify-center rounded-md border"
          style={{ height: h }}>
          <span className="text-muted-foreground text-xs">{h}px</span>
        </div>
      ))}
    </MasonryGrid>
  ),
};
