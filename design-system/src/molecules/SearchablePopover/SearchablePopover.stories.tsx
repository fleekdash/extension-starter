import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../organisms/Button";
import { SearchablePopover } from "./index";
import type { SearchablePopoverItem } from "./searchable-popover-types";

const WIDGET_ITEMS: SearchablePopoverItem[] = [
  { id: "chart", label: "Chart", icon: "stat", onClick: () => {} },
  { id: "kpi-group", label: "KPI group", icon: "stat", onClick: () => {} },
  { id: "table", label: "Table", icon: "stat", onClick: () => {} },
  { id: "map", label: "Map", icon: "globe", onClick: () => {} },
  { id: "embed", label: "Embed", icon: "home", onClick: () => {} },
  { id: "rich-text", label: "Rich text", icon: "settings", onClick: () => {} },
  {
    id: "achievements",
    label: "Achievements",
    icon: "verified",
    onClick: () => {},
  },
];

const meta = {
  title: "Components/Overlay/SearchablePopover",
  component: SearchablePopover,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Popover with a search field and filtered item list — auto-virtualizes past the scroll threshold, supports loading skeletons and external filtering via `onSearch`.",
      },
    },
  },
  tags: ["autodocs"],
  args: { items: WIDGET_ITEMS, width: "16rem" },
} satisfies Meta<typeof SearchablePopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { trigger: null, items: [] },
  render: (args) => (
    <SearchablePopover
      {...args}
      trigger={<Button variant="outline">Add widget</Button>}
    />
  ),
};

export const Loading: Story = {
  args: { trigger: null, items: [] },
  render: (args) => (
    <SearchablePopover
      {...args}
      isLoading
      loadingRows={4}
      trigger={<Button variant="outline">Loading items</Button>}
    />
  ),
};

export const Empty: Story = {
  args: { trigger: null, items: [] },
  render: (args) => (
    <SearchablePopover
      {...args}
      items={[]}
      trigger={<Button variant="outline">No results</Button>}
    />
  ),
};

export const MultiSelect: Story = {
  args: { trigger: null, items: [] },
  render: function Render(args) {
    const [checkedIds, setCheckedIds] = useState<string[]>(["chart"]);
    const items = WIDGET_ITEMS.map((item) => ({
      ...item,
      checked: checkedIds.includes(item.id),
      onClick: () =>
        setCheckedIds((ids) =>
          ids.includes(item.id)
            ? ids.filter((id) => id !== item.id)
            : [...ids, item.id],
        ),
    }));
    return (
      <SearchablePopover
        {...args}
        items={items}
        closeOnSelect={false}
        trigger={
          <Button variant="outline">Widgets ({checkedIds.length})</Button>
        }
      />
    );
  },
};

export const Virtualized: Story = {
  args: { trigger: null, items: [] },
  render: (args) => {
    const items = Array.from({ length: 200 }, (_, i) => ({
      id: `item-${i}`,
      label: `Post ${i + 1}`,
      onClick: () => {},
    }));
    return (
      <SearchablePopover
        {...args}
        items={items}
        enableVirtualization
        trigger={<Button variant="outline">200 items</Button>}
      />
    );
  },
};
