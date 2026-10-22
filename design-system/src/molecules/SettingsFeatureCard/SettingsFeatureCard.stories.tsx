import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../../atoms/Icon";
import { SettingsCategoryHeader, SettingsFeatureToggleCard } from "./index";

const meta = {
  title: "Components/Settings/SettingsFeatureToggleCard",
  component: SettingsFeatureToggleCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Settings row card: tinted icon thumb (auto color from `iconColorSeed`), title/description, switch, and slots for `settingsContent`, `auxiliaryContent` and `trailingContent`. `SettingsCategoryHeader` groups sections.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    enabled: { control: "boolean" },
    disabled: { control: "boolean" },
    switchHidden: { control: "boolean" },
  },
} satisfies Meta<typeof SettingsFeatureToggleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

type FeatureCardProps = Omit<
  React.ComponentProps<typeof SettingsFeatureToggleCard>,
  "enabled" | "onToggle" | "onCheckedChange"
> & { enabled?: boolean };

function FeatureCard(props: Readonly<FeatureCardProps>) {
  const [enabled, setEnabled] = useState(props.enabled ?? false);
  return (
    <div className="w-[420px]">
      <SettingsFeatureToggleCard
        {...props}
        enabled={enabled}
        onToggle={() => setEnabled((v) => !v)}
        onCheckedChange={setEnabled}
      />
    </div>
  );
}

export const Basic: Story = {
  args: {
    enabled: false,
    toggleAriaLabel: "Toggle",
    icon: null,
    title: "",
    onToggle: () => {},
    onCheckedChange: () => {},
  },
  render: () => (
    <FeatureCard
      enabled
      toggleAriaLabel="Toggle revenue widget"
      icon={<Icon name="stat" className="size-4" />}
      iconColorSeed="revenue"
      title="Revenue chart"
      description="Shows sales revenue over the selected period."
    />
  ),
};

export const AutoTintedThumbs: Story = {
  args: {
    enabled: false,
    toggleAriaLabel: "Toggle",
    icon: null,
    title: "",
    onToggle: () => {},
    onCheckedChange: () => {},
  },
  render: () => (
    <div className="flex w-[420px] flex-col gap-3">
      <SettingsCategoryHeader title="Widgets" />
      {[
        { seed: "chart", title: "Chart widget", icon: "stat" },
        { seed: "map", title: "Map widget", icon: "globe" },
        { seed: "table", title: "Table widget", icon: "home" },
      ].map((item, i) => (
        <FeatureCard
          key={item.seed}
          enabled={i !== 2}
          toggleAriaLabel={`Toggle ${item.title}`}
          icon={<Icon name={item.icon} className="size-4" />}
          iconColorSeed={item.seed}
          title={item.title}
          description="Tint derived from the seed — stable across locales."
        />
      ))}
    </div>
  ),
};

export const WithSettingsContent: Story = {
  args: {
    enabled: false,
    toggleAriaLabel: "Toggle",
    icon: null,
    title: "",
    onToggle: () => {},
    onCheckedChange: () => {},
  },
  render: () => (
    <FeatureCard
      enabled
      toggleAriaLabel="Toggle notifications"
      icon={<Icon name="notification" className="size-4" />}
      iconTintColor="#f59e0b"
      title="Notifications"
      description="Email me when a connector sync fails."
      settingsContent={
        <p className="text-muted-foreground text-xs">
          Expanded settings render inside the card when enabled.
        </p>
      }
    />
  ),
};

export const DisabledAndHidden: Story = {
  args: {
    enabled: false,
    toggleAriaLabel: "Toggle",
    icon: null,
    title: "",
    onToggle: () => {},
    onCheckedChange: () => {},
  },
  render: () => (
    <div className="flex w-[420px] flex-col gap-3">
      <FeatureCard
        enabled={false}
        disabled
        toggleAriaLabel="Disabled card"
        icon={<Icon name="settings" className="size-4" />}
        title="Disabled"
        description="Entire card is non-interactive."
      />
      <FeatureCard
        enabled
        switchHidden
        toggleAriaLabel="Hidden switch"
        icon={<Icon name="verified" className="size-4" />}
        title="Switch hidden"
        description="on/off state is driven by a dedicated control."
      />
    </div>
  ),
};
