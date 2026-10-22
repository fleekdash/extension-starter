import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../organisms/Button";
import { ConfirmationDrawer } from "./index";
import type { ConfirmationVariant } from "./index";

const meta = {
  title: "Components/Overlay/ConfirmationDrawer",
  component: ConfirmationDrawer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Pre-composed destructive/warning/info/success confirmation in a Vaul drawer — icon, title, description, confirm/cancel actions.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["destructive", "warning", "info", "success"],
    },
    isLoading: { control: "boolean" },
  },
} satisfies Meta<typeof ConfirmationDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

function ConfirmDemo(
  props: Readonly<
    Omit<
      React.ComponentProps<typeof ConfirmationDrawer>,
      "open" | "onOpenChange" | "onConfirm"
    >
  >,
) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("");
  return (
    <div className="flex flex-col items-center gap-3">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open {props.variant ?? "info"} confirmation
      </Button>
      <ConfirmationDrawer
        {...props}
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => {
          setResult("confirmed");
          setOpen(false);
        }}
        onCancel={() => setResult("cancelled")}
      />
      {result && (
        <p className="text-muted-foreground text-xs">Result: {result}</p>
      )}
    </div>
  );
}

export const Destructive: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
    title: "",
    description: "",
    onConfirm: () => {},
  },
  render: () => (
    <ConfirmDemo
      variant="destructive"
      title="Delete widget?"
      description="This removes the widget from the dashboard. This action cannot be undone."
      confirmLabel="Delete"
    />
  ),
};

export const Variants: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
    title: "",
    description: "",
    onConfirm: () => {},
  },
  render: () => (
    <div className="flex gap-4">
      {(["warning", "info", "success"] as ConfirmationVariant[]).map(
        (variant) => (
          <ConfirmDemo
            key={variant}
            variant={variant}
            title={`${variant} confirmation`}
            description="Confirm to continue."
          />
        ),
      )}
    </div>
  ),
};

export const Loading: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
    title: "",
    description: "",
    onConfirm: () => {},
  },
  render: () => (
    <ConfirmDemo
      variant="destructive"
      title="Deleting..."
      description="The confirm button shows a loading state."
      isLoading
    />
  ),
};
