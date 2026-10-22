import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../organisms/Button";
import { AutoSavedChangesHint, UnsavedChangesBadge } from "./index";

const meta = {
  title: "Components/Feedback/FormPersistStatus",
  component: UnsavedChangesBadge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Form persistence indicators: `UnsavedChangesBadge` marks dirty state; `AutoSavedChangesHint` reassures that changes persist automatically.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UnsavedChangesBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Badge: Story = {
  args: { visible: false },
  name: "UnsavedChangesBadge",
  render: () => (
    <div className="flex items-center gap-4">
      <UnsavedChangesBadge visible={false} />
      <UnsavedChangesBadge visible />
      <span className="text-muted-foreground text-xs">hidden → visible</span>
    </div>
  ),
};

export const Hint: Story = {
  args: { visible: false },
  name: "AutoSavedChangesHint",
  render: () => <AutoSavedChangesHint />,
};

export const Interactive: Story = {
  args: { visible: false },
  render: function Render() {
    const [dirty, setDirty] = useState(false);
    return (
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => setDirty(true)}>
          Make a change
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={!dirty}
          onClick={() => setDirty(false)}>
          Save
        </Button>
        <UnsavedChangesBadge visible={dirty} />
        <AutoSavedChangesHint />
      </div>
    );
  },
};
