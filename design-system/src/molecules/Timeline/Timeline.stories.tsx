import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "./index";

const meta = {
  title: "Components/Data Display/Timeline",
  component: Timeline,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Activity timeline — items with indicator, date, title and content, joined by a separator line. `value` marks the active step.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

const EVENTS = [
  {
    date: "Oct 20, 2026",
    title: "Widget published",
    content: "Chart widget promoted from Storybook to the dashboard catalog.",
  },
  {
    date: "Oct 18, 2026",
    title: "Palette applied",
    content: "Sunset Glow palette validated across light and dark modes.",
  },
  {
    date: "Oct 15, 2026",
    title: "Connector synced",
    content: "Overview connector resolved 4 query groups.",
  },
];

export const Vertical: Story = {
  render: () => (
    <Timeline defaultValue={1} className="w-96">
      {EVENTS.map((event, i) => (
        <TimelineItem key={event.title} step={i + 1}>
          <TimelineIndicator />
          <TimelineContent className="pb-6">
            <TimelineHeader>
              <TimelineDate>{event.date}</TimelineDate>
              <TimelineTitle>{event.title}</TimelineTitle>
            </TimelineHeader>
            <p className="text-muted-foreground text-sm">{event.content}</p>
          </TimelineContent>
          {i < EVENTS.length - 1 && <TimelineSeparator />}
        </TimelineItem>
      ))}
    </Timeline>
  ),
};
