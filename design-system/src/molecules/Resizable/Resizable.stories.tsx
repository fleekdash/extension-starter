import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./index";

const meta = {
  title: "Components/Layout/Resizable",
  component: ResizablePanelGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "react-resizable-panels group — drag the handle to resize panels. `withHandle` renders the grab affordance.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="border-border h-48 w-[560px] rounded-md border">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

function Panel({ label }: Readonly<{ label: string }>) {
  return (
    <div className="bg-muted/30 flex h-full items-center justify-center">
      <span className="text-muted-foreground text-xs">{label}</span>
    </div>
  );
}

export const Horizontal: Story = {
  args: { direction: "horizontal" },
  render: () => (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={30}>
        <Panel label="Sidebar (30%)" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <Panel label="Content (70%)" />
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Vertical: Story = {
  args: { direction: "vertical" },
  render: () => (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={40}>
        <Panel label="Top (40%)" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60}>
        <Panel label="Bottom (60%)" />
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const ThreePanels: Story = {
  args: { direction: "horizontal" },
  render: () => (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={25}>
        <Panel label="Nav" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <Panel label="Canvas" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25}>
        <Panel label="Inspector" />
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
