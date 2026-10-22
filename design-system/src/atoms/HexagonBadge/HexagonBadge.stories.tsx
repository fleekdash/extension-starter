import type { Meta, StoryObj } from "@storybook/react-vite";
import { HexagonBadge, HEXAGON_BADGE_ICON_SIZE_CLASS } from "./index";
import { Icon } from "../Icon";

const meta = {
  title: "Components/Data Display/HexagonBadge",
  component: HexagonBadge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Hexagonal shell used for feature/membership badges — outline and inner icon inherit one `shellColor`. Content goes in the `badge` slot.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "text" },
    shellColor: { control: "color" },
    fill: { control: "text" },
    stroke: { control: "text" },
  },
  args: { size: "size-11" },
} satisfies Meta<typeof HexagonBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    badge: <Icon name="rocket" className={HEXAGON_BADGE_ICON_SIZE_CLASS} />,
  },
};

export const Colors: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      {["#2563eb", "#16a34a", "#dc2626", "#9333ea", "#ea580c"].map((color) => (
        <HexagonBadge
          key={color}
          {...args}
          shellColor={color}
          badge={
            <Icon name="verified" className={HEXAGON_BADGE_ICON_SIZE_CLASS} />
          }
        />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-4">
      {["size-7", "size-11", "size-16"].map((size) => (
        <HexagonBadge
          key={size}
          {...args}
          size={size}
          badge={
            <Icon name="rocket" className={HEXAGON_BADGE_ICON_SIZE_CLASS} />
          }
        />
      ))}
    </div>
  ),
};

export const Filled: Story = {
  args: {
    fill: "fill-primary/10",
    badge: <Icon name="bolt" className={HEXAGON_BADGE_ICON_SIZE_CLASS} />,
  },
};
