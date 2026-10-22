import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "..";

const meta = {
  title: "Components/Inputs/Button/Shapes",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const SquircleVariant: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Buttons with squircle shape for modern, smoother corners. Squircle combines square and circle shapes to create more natural looking UI elements. This feature can be enabled/disabled globally at the theme level.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <h3 className="mb-3 text-lg font-medium">Squircle Buttons</h3>

      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col items-center gap-2">
          <Button>Default Squircle</Button>
          <span className="font-mono text-xs">squircle=true (default)</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button squircle={false}>Regular Button</Button>
          <span className="font-mono text-xs">squircle=false</span>
        </div>
      </div>

      <h4 className="text-md mt-6 mb-3 font-medium">
        Automatic Radius Handling
      </h4>
      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col items-center gap-2">
          <Button>Standard Button</Button>
          <span className="font-mono text-xs">Uses squircle</span>
          <span className="text-muted-foreground text-xs">
            16px border radius
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button radius="full">Full Radius Button</Button>
          <span className="font-mono text-xs">radius="full"</span>
          <span className="text-muted-foreground text-xs">
            Disables squircle automatically
          </span>
        </div>
      </div>

      <h4 className="text-md mt-6 mb-3 font-medium">Smoothing Comparison</h4>
      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col items-center gap-2">
          <Button squircleSmoothing="sm">Subtle</Button>
          <span className="font-mono text-xs">squircleSmoothing="sm"</span>
          <span className="text-muted-foreground text-xs">Less curve</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button squircleSmoothing="md">Medium</Button>
          <span className="font-mono text-xs">
            squircleSmoothing="md" (default)
          </span>
          <span className="text-muted-foreground text-xs">Balanced</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button squircleSmoothing="lg">Strong</Button>
          <span className="font-mono text-xs">squircleSmoothing="lg"</span>
          <span className="text-muted-foreground text-xs">iOS-like</span>
        </div>
      </div>

      <h4 className="text-md mt-6 mb-3 font-medium">With Different Sizes</h4>
      <div className="flex flex-wrap items-end gap-3">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" icon="heart" aria-label="Like" />
      </div>

      <h4 className="text-md mt-6 mb-3 font-medium">With Different Variants</h4>
      <div className="flex flex-wrap gap-3">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>

      <h4 className="text-md mt-6 mb-3 font-medium">With Outline Variant</h4>
      <div className="flex flex-wrap gap-4">
        <Button variant="outline">Outline + Squircle</Button>
        <Button variant="outline" icon="settings">
          With Icon
        </Button>
        <Button variant="outline" squircle={false}>
          Outline Only
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-muted flex h-40 flex-col items-center justify-center rounded-md p-4">
          <Button className="h-32 w-32" size="lg">
            Square
          </Button>
          <span className="mt-2 font-mono text-xs">Equal width/height</span>
        </div>
        <div className="bg-muted flex h-40 flex-col items-center justify-center rounded-md p-4">
          <Button className="h-16 w-32" size="lg">
            Rectangle
          </Button>
          <span className="mt-2 font-mono text-xs">Different width/height</span>
        </div>
      </div>

      <div className="bg-muted mt-6 rounded-lg p-4">
        <h4 className="text-md mb-2 font-medium">About Squircle</h4>
        <p className="mb-2 text-sm">
          Squircles are shapes with perfectly smooth corners that adapt to the
          element's dimensions. Unlike regular border-radius, squircles maintain
          a consistent appearance regardless of size and aspect ratio, similar
          to iOS app icons.
        </p>
        <h5 className="mt-3 mb-1 text-sm font-medium">Smart Behavior:</h5>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
          <li>
            When squircle is enabled, a border-radius of 16px is automatically
            applied for proper rendering
          </li>
          <li>
            If you use <code>radius="full"</code>, squircle is automatically
            disabled to allow perfect circles
          </li>
          <li>
            Can be enabled/disabled globally at the theme level via{" "}
            <code>uiSettings.useSquircleButtons</code>
          </li>
        </ul>
        <h5 className="mt-3 mb-1 text-sm font-medium">Implementation:</h5>
        <p className="mb-2 text-sm">
          This implementation uses dynamic SVG masks that are calculated based
          on each button's dimensions. The squircle shape is generated at
          runtime using cubic Bézier curves, ensuring perfect proportions
          regardless of size.
        </p>
        <h5 className="mt-3 mb-1 text-sm font-medium">Usage:</h5>
        <pre className="overflow-auto rounded-sm bg-zinc-200 p-2 text-xs">
          {`// Enabled by default (with 16px border radius)
<Button>Default Button</Button>

// Disable squircle
<Button squircle={false}>Regular Button</Button>

// Automatically disables squircle
<Button radius="full">Round Button</Button>

// Adjust smoothing
<Button squircleSmoothing="lg">Strong Smoothing</Button>

// Global theme setting
myTheme.uiSettings = { useSquircleButtons: true }`}
        </pre>
      </div>
    </div>
  ),
};

export const VerticalAlignment: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrando o alinhamento vertical aprimorado para texto e ícones nos botões.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <h3 className="mb-3 text-lg font-medium">Alinhamento Vertical</h3>

      <div className="flex flex-col gap-6">
        <div>
          <h4 className="text-md mb-2 font-medium">Comparação por Tamanho</h4>
          <div className="bg-muted relative rounded-lg p-4">
            <div className="absolute top-1/2 right-0 left-0 z-10 h-px -translate-y-1/2 bg-red-400" />

            <div className="flex items-start gap-3">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" icon="heart" aria-label="Like" />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-md mb-2 font-medium">Alinhamento com Ícones</h4>
          <div className="bg-muted relative rounded-lg p-4">
            <div className="absolute top-1/2 right-0 left-0 z-10 h-px -translate-y-1/2 bg-red-400" />

            <div className="flex items-start gap-3">
              <Button size="xs" icon="mail">
                Email
              </Button>
              <Button size="sm" icon="mail">
                Email
              </Button>
              <Button icon="mail">Email</Button>
              <Button size="lg" icon="mail">
                Email
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-md mb-2 font-medium">Diferentes Variantes</h4>
          <div className="bg-muted relative rounded-lg p-4">
            <div className="absolute top-1/2 right-0 left-0 z-10 h-px -translate-y-1/2 bg-red-400" />

            <div className="flex items-start gap-3">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="ghost-default">Ghost Default</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted mt-6 rounded-lg p-4">
        <h4 className="text-md mb-2 font-medium">Melhorias de Alinhamento</h4>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
          <li>
            Definido <code>leading-none</code> para todos os botões
          </li>
          <li>
            Substituído o padding vertical por altura fixa (<code>py-0</code> +
            altura definida)
          </li>
          <li>
            Adicionado <code>leading-tight</code> para cada tamanho de botão
          </li>
          <li>
            Envolvido o conteúdo do botão em{" "}
            <code>inline-flex items-center</code>
          </li>
          <li>
            Estilos CSS globais para garantir consistência em todos os
            navegadores
          </li>
        </ul>
      </div>
    </div>
  ),
};
