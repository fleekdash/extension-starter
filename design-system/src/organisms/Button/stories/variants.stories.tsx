import { useTheme } from "@/theme-provider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "..";

const meta = {
  title: "Components/Inputs/Button/Variants",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

const ButtonThemeDemo = () => {
  const { isDark, currentTheme } = useTheme();

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="bg-card rounded-md border p-4">
        <h3 className="mb-3 text-lg font-medium">Current Theme</h3>
        <p className="mb-1">
          <span className="font-medium">Theme:</span> {currentTheme?.name}
        </p>
        <p className="mb-1">
          <span className="font-medium">Mode:</span> {isDark ? "dark" : "light"}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h3 className="mb-3 text-lg font-medium">Button Variants</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center gap-2">
              <Button variant="default">Default</Button>
              <span className="font-mono text-xs">default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button variant="secondary">Secondary</Button>
              <span className="font-mono text-xs">secondary</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button variant="destructive">Destructive</Button>
              <span className="font-mono text-xs">destructive</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button variant="outline">Outline</Button>
              <span className="font-mono text-xs">outline</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button variant="ghost">Ghost</Button>
              <span className="font-mono text-xs">ghost</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button variant="ghost-default">Ghost Default</Button>
              <span className="font-mono text-xs">ghost-default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button variant="link">Link</Button>
              <span className="font-mono text-xs">link</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-medium">Button Sizes</h3>
          <div className="flex items-end gap-3">
            <div className="flex flex-col items-center gap-2">
              <Button size="xs">Extra Small</Button>
              <span className="font-mono text-xs">xs</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="sm">Small</Button>
              <span className="font-mono text-xs">sm</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="default">Default</Button>
              <span className="font-mono text-xs">default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="lg">Large</Button>
              <span className="font-mono text-xs">lg</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="xl">Extra Large</Button>
              <span className="font-mono text-xs">xl</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Button size="icon">🔍</Button>
              <span className="font-mono text-xs">icon</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-medium">CSS Variables Used</h3>
          <div className="bg-muted grid grid-cols-2 gap-4 rounded-md p-3 text-sm">
            <div className="flex flex-col gap-1">
              <p className="font-mono">--primary</p>
              <p className="font-mono">--primary-foreground</p>
              <p className="font-mono">--secondary</p>
              <p className="font-mono">--secondary-foreground</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-mono">--destructive</p>
              <p className="font-mono">--destructive-foreground</p>
              <p className="font-mono">--accent</p>
              <p className="font-mono">--accent-foreground</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ThemeVariants: Story = {
  render: () => <ButtonThemeDemo />,
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="flex gap-4">
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="ghost-default">Ghost Default</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex items-end gap-4">
        <Button size="xs">XS</Button>
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" icon="search" aria-label="Search" />
      </div>
      <div className="flex gap-4">
        <Button radius="none">None</Button>
        <Button radius="sm">Small</Button>
        <Button radius="default">Default</Button>
        <Button radius="md">Medium</Button>
        <Button radius="lg">Large</Button>
        <Button radius="xl">XL</Button>
        <Button radius="2xl">2XL</Button>
        <Button radius="full">Full</Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button icon="mail">With Icon</Button>
        <Button icon="arrowRight" iconPosition="right">
          Icon Right
        </Button>
        <Button size="icon" icon="add" aria-label="Add" />
        <Button size="icon" icon="heart" radius="full" aria-label="Like" />
      </div>
      <div className="flex flex-wrap items-end gap-4">
        <Button size="xs" icon="settings">
          XS with Icon
        </Button>
        <Button size="sm" icon="settings">
          SM with Icon
        </Button>
        <Button
          size="icon"
          icon="settings"
          className="h-6 w-6"
          aria-label="Settings small"
        />
        <Button size="icon" icon="settings" aria-label="Settings default" />
        <Button
          size="icon"
          icon="settings"
          className="h-12 w-12"
          aria-label="Settings large"
        />
      </div>
    </div>
  ),
};

export const OutlineVariant: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Outline buttons that respect light and dark mode themes automatically using theme tokens.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <h3 className="mb-3 text-lg font-medium">Outline Buttons</h3>
      <div className="flex flex-wrap gap-4">
        <Button variant="outline">Standard Outline</Button>
        <Button variant="outline" icon="settings">
          With Icon
        </Button>
        <Button variant="outline" size="sm">
          Small Outline
        </Button>
        <Button variant="outline" size="lg">
          Large Outline
        </Button>
        <Button
          variant="outline"
          size="icon"
          icon="heart"
          aria-label="Favorite"
        />
      </div>

      <div className="bg-muted mt-4 rounded-lg p-4">
        <h4 className="text-md mb-2 font-medium">Dark Mode Compatible</h4>
        <p className="mb-2 text-sm">
          These buttons use CSS variables from your theme, ensuring they look
          good in both light and dark modes:
        </p>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
          <li>
            <span className="font-mono text-xs">border-input</span> - Border
            color from theme tokens
          </li>
          <li>
            <span className="font-mono text-xs">bg-background</span> -
            Background color from theme
          </li>
          <li>
            <span className="font-mono text-xs">text-foreground</span> - Text
            color from theme
          </li>
          <li>
            <span className="font-mono text-xs">hover:bg-muted</span> - Hover
            background color
          </li>
          <li>
            <span className="font-mono text-xs">
              hover:text-accent-foreground
            </span>{" "}
            - Hover text color
          </li>
        </ul>
      </div>
    </div>
  ),
};

export const LinkHover: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The Link button now has the same hover effect as the Ghost button, using hover:bg-muted.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <h3 className="mb-3 text-lg font-medium">
        Link and Ghost Hover Comparison
      </h3>
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col items-center gap-2">
          <Button variant="link">Link Button</Button>
          <span className="font-mono text-xs">variant="link"</span>
          <span className="text-muted-foreground text-xs">
            (Hover to see bg change)
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant="ghost">Ghost Button</Button>
          <span className="font-mono text-xs">variant="ghost"</span>
          <span className="text-muted-foreground text-xs">(Same hover bg)</span>
        </div>
      </div>
      <div className="bg-muted mt-4 rounded-lg p-4">
        <h4 className="text-md mb-2 font-medium">Updated Link Style</h4>
        <p className="mb-2 text-sm">
          The link button now has the same hover styles as the ghost button
          while maintaining its underline effect:
        </p>
        <pre className="overflow-auto rounded-sm bg-zinc-200 p-2 text-xs">
          {`"link": "underline-offset-4 hover:underline text-primary hover:bg-muted hover:text-primary"`}
        </pre>
      </div>
    </div>
  ),
};
