import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./index";

const meta = {
  title: "Components/Navigation/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radix tabs with FleekDash list/trigger styling for settings panels and segmented views.",
      },
    },
  },
  tags: ["autodocs"],
  args: { defaultValue: "data" },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Tabs {...args} className="w-96">
      <TabsList>
        <TabsTrigger value="data">Data</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="advanced" disabled>
          Advanced
        </TabsTrigger>
      </TabsList>
      <TabsContent value="data" className="pt-3">
        <p className="text-muted-foreground text-sm">
          Connector, query group and date-range settings.
        </p>
      </TabsContent>
      <TabsContent value="appearance" className="pt-3">
        <p className="text-muted-foreground text-sm">
          Chart type, palette overrides and legend placement.
        </p>
      </TabsContent>
      <TabsContent value="advanced" className="pt-3">
        <p className="text-muted-foreground text-sm">Raw JSON editing.</p>
      </TabsContent>
    </Tabs>
  ),
};
