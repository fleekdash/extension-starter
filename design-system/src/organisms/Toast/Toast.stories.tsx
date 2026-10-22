import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../organisms/Button";
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./index";

const meta = {
  title: "Components/Feedback/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radix toast primitives — provider, viewport, title/description, action and close. Variants `default` and `destructive`.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

function ToastDemo({ destructive }: Readonly<{ destructive?: boolean }>) {
  const [open, setOpen] = useState(false);
  return (
    <ToastProvider>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Show toast
      </Button>
      <Toast
        open={open}
        onOpenChange={setOpen}
        variant={destructive ? "destructive" : "default"}>
        <div className="grid gap-1">
          <ToastTitle>
            {destructive ? "Sync failed" : "Widget saved"}
          </ToastTitle>
          <ToastDescription>
            {destructive
              ? "The connector returned an error."
              : "Your dashboard layout was updated."}
          </ToastDescription>
        </div>
        <ToastAction altText="Undo">Undo</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}

export const Default: Story = {
  render: () => <ToastDemo />,
};

export const Destructive: Story = {
  render: () => <ToastDemo destructive />,
};
