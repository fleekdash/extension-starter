import type { Meta, StoryObj } from "@storybook/react-vite";
import { StackedThumbnailGroup } from "./index";

const ITEMS = [
  { key: "1", src: "https://i.pravatar.cc/40?img=1", alt: "Member 1" },
  { key: "2", src: "https://i.pravatar.cc/40?img=2", alt: "Member 2" },
  { key: "3", src: "https://i.pravatar.cc/40?img=3", alt: "Member 3" },
  { key: "4", src: "https://i.pravatar.cc/40?img=4", alt: "Member 4" },
  { key: "5", src: "https://i.pravatar.cc/40?img=5", alt: "Member 5" },
];

const meta = {
  title: "Components/Data Display/StackedThumbnailGroup",
  component: StackedThumbnailGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Overlapping (`stacked`) or side-by-side (`inline`) thumbnail group with `maxVisible` overflow count and `totalCount` override.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    layout: { control: "select", options: ["stacked", "inline"] },
    size: { control: "select", options: ["xs", "sm"] },
    maxVisible: { control: { type: "number", min: 1, max: 8 } },
    showOverflowCount: { control: "boolean" },
  },
  args: { items: ITEMS, maxVisible: 3, totalCount: 12 },
} satisfies Meta<typeof StackedThumbnailGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Stacked: Story = {};

export const Inline: Story = {
  args: { layout: "inline", maxVisible: 4 },
};

export const WithoutOverflowCount: Story = {
  args: { showOverflowCount: false },
};

export const NoImages: Story = {
  args: {
    items: [
      { key: "a", alt: "Fallback A" },
      { key: "b", alt: "Fallback B" },
    ],
    maxVisible: 2,
    totalCount: 2,
  },
};
