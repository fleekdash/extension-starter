import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, AlertDescription, AlertMessage, AlertTitle } from "./index";

const meta = {
  title: "Components/Feedback/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Alert box (default/destructive/info) plus the pre-composed `AlertMessage` — `inline` stacked layout or `banner` row with hexagon icon and action slot.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "info"],
    },
  },
  args: { variant: "default" },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args} className="w-96">
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>
        Widget configurations are validated against the theme tokens before they
        ship to the dashboard.
      </AlertDescription>
    </Alert>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex w-96 flex-col gap-3">
      <Alert {...args} variant="default">
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>Neutral informational alert.</AlertDescription>
      </Alert>
      <Alert {...args} variant="info">
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>Primary-tinted guidance.</AlertDescription>
      </Alert>
      <Alert {...args} variant="destructive">
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>Something needs attention.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const MessageInline: Story = {
  name: "AlertMessage — inline",
  render: () => (
    <div className="w-96">
      <AlertMessage variant="info" icon={<span>ℹ️</span>}>
        <strong>Connector ready.</strong> The overview connector resolved all
        query groups.
      </AlertMessage>
    </div>
  ),
};

export const MessageBanner: Story = {
  name: "AlertMessage — banner",
  render: () => (
    <div className="w-[520px]">
      <AlertMessage
        layout="banner"
        variant="error"
        icon={<span>⚠️</span>}
        action={
          <button className="border-border rounded-md border px-3 py-1 text-xs">
            Retry
          </button>
        }>
        <strong>Sync failed.</strong> The last connector sync returned an error.
      </AlertMessage>
    </div>
  ),
};
