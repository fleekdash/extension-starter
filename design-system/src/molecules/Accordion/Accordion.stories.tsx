import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./index";

const meta = {
  title: "Components/Layout/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radix accordion with FleekDash borders/chevron animation. `type=single` collapses siblings; `multiple` keeps several open.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const ITEMS = [
  {
    value: "item-1",
    trigger: "How are dashboard widgets validated?",
    content:
      "Every widget type ships a Storybook story exercising populated, empty and error states before it becomes an official dashboard component.",
  },
  {
    value: "item-2",
    trigger: "Where does demo data come from?",
    content:
      "The customize drawer's demo toggle exposes the DASHBOARD_DEMO_* synthetic dataset — the same path these stories use via the demoData control.",
  },
  {
    value: "item-3",
    trigger: "Can widgets be reordered?",
    content:
      "Yes — the kpi-group supports in-place drag reordering while its settings drawer is open.",
  },
];

export const Single: Story = {
  args: { type: "single" },
  render: () => (
    <div className="w-96">
      <Accordion type="single" collapsible defaultValue="item-1">
        {ITEMS.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
};

export const Multiple: Story = {
  args: { type: "multiple" },
  render: () => (
    <div className="w-96">
      <Accordion type="multiple" defaultValue={["item-1", "item-3"]}>
        {ITEMS.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
};
