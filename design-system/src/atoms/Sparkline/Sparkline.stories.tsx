import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sparkline } from "./index";

const meta = {
  title: "Components/Data Display/Sparkline",
  component: Sparkline,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Inline SVG sparkline (line/area/bar) for KPI cards. `color`/`fillColor` are set as SVG attributes on purpose — a card `monotone` background forces `color: white !important` on descendants, so `currentColor` alone would lose to that rule.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["line", "area", "bar"] },
    values: { control: "object" },
    color: { control: "color" },
    fillColor: { control: "color" },
    fade: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    variant: "line",
    values: [4, 8, 5, 12, 9, 15, 11, 18, 14, 22, 19, 26],
    fade: false,
  },
} satisfies Meta<typeof Sparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = {};

export const Area: Story = {
  args: { variant: "area" },
};

export const Bar: Story = {
  args: { variant: "bar" },
};

export const CustomColor: Story = {
  name: "Custom color (attribute-painted)",
  args: { variant: "area", color: "#8b5cf6", fillColor: "#8b5cf6" },
};

export const Flat: Story = {
  name: "Flat / single value",
  args: { values: [5] },
};

export const WithGaps: Story = {
  name: "Non-finite values filtered",
  args: { values: [3, Number.NaN, 8, 6, Number.POSITIVE_INFINITY, 12, 9] },
};
