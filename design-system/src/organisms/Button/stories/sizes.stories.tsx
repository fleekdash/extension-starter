import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "..";

const meta = {
  title: "Components/Inputs/Button/Sizes",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const SizeVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Button size variants including the new extra small (xs) size for compact UI layouts with improved horizontal padding and vertical alignment.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <h3 className="mb-3 text-lg font-medium">Button Size Variants</h3>

      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col items-center gap-2">
          <Button size="xs">Extra Small</Button>
          <span className="font-mono text-xs">size="xs"</span>
          <span className="text-muted-foreground text-xs">
            h-7, text-xs, px-3, leading-tight
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="sm">Small</Button>
          <span className="font-mono text-xs">size="sm"</span>
          <span className="text-muted-foreground text-xs">
            h-9, px-4, leading-tight
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="default">Default</Button>
          <span className="font-mono text-xs">size="default"</span>
          <span className="text-muted-foreground text-xs">
            h-10, px-4, leading-tight
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="lg">Large</Button>
          <span className="font-mono text-xs">size="lg"</span>
          <span className="text-muted-foreground text-xs">
            h-11, px-8, leading-tight
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="xl">Extra Large</Button>
          <span className="font-mono text-xs">size="xl"</span>
          <span className="text-muted-foreground text-xs">
            h-12, px-12, leading-tight
          </span>
        </div>
      </div>

      <h4 className="text-md mt-6 mb-3 font-medium">With Icons</h4>
      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col items-center gap-2">
          <Button size="xs" icon="arrowRight">
            Extra Small
          </Button>
          <span className="font-mono text-xs">size="xs"</span>
          <span className="text-muted-foreground text-xs">
            Icon: h-3.5 w-3.5
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="sm" icon="arrowRight">
            Small
          </Button>
          <span className="font-mono text-xs">size="sm"</span>
          <span className="text-muted-foreground text-xs">Icon: h-4 w-4</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="default" icon="arrowRight">
            Default
          </Button>
          <span className="font-mono text-xs">size="default"</span>
          <span className="text-muted-foreground text-xs">Icon: h-5 w-5</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="lg" icon="arrowRight">
            Large
          </Button>
          <span className="font-mono text-xs">size="lg"</span>
          <span className="text-muted-foreground text-xs">Icon: h-5 w-5</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="xl" icon="arrowRight">
            Extra Large
          </Button>
          <span className="font-mono text-xs">size="xl"</span>
          <span className="text-muted-foreground text-xs">Icon: h-5 w-5</span>
        </div>
      </div>

      <h4 className="text-md mt-6 mb-3 font-medium">
        Size Comparison with Variants
      </h4>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end gap-3">
          <Button size="xs" variant="default">
            XS
          </Button>
          <Button size="sm" variant="default">
            SM
          </Button>
          <Button size="default" variant="default">
            Default
          </Button>
          <Button size="lg" variant="default">
            LG
          </Button>
          <Button size="xl" variant="default">
            XL
          </Button>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <Button size="xs" icon="add" variant="default">
            XS
          </Button>
          <Button size="sm" icon="add" variant="default">
            SM
          </Button>
          <Button size="default" icon="add" variant="default">
            Default
          </Button>
          <Button size="lg" icon="add" variant="default">
            LG
          </Button>
          <Button size="xl" icon="add" variant="default">
            XL
          </Button>
        </div>
      </div>

      <div className="bg-muted mt-6 rounded-lg p-4">
        <h4 className="text-md mb-2 font-medium">Sizes & Padding Comparison</h4>
        <p className="mb-2 text-sm">
          Button sizes with their corresponding measurements:
        </p>
        <div className="grid grid-cols-2 gap-4 text-xs md:grid-cols-5">
          <div>
            <p className="font-mono">xs:</p>
            <p className="text-muted-foreground">h-7, px-3, text-xs</p>
          </div>
          <div>
            <p className="font-mono">sm:</p>
            <p className="text-muted-foreground">h-9, px-4</p>
          </div>
          <div>
            <p className="font-mono">default:</p>
            <p className="text-muted-foreground">h-10, px-4</p>
          </div>
          <div>
            <p className="font-mono">lg:</p>
            <p className="text-muted-foreground">h-11, px-8</p>
          </div>
          <div>
            <p className="font-mono">xl:</p>
            <p className="text-muted-foreground">h-12, px-12</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SmallButtonVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Small and extra small buttons with improved lateral padding and vertical alignment for better readability and touch targets.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <h3 className="mb-3 text-lg font-medium">Small Button Variants</h3>

      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col items-center gap-2">
          <Button size="xs">Extra Small</Button>
          <span className="font-mono text-xs">size="xs"</span>
          <span className="text-muted-foreground text-xs">
            px-3, h-7, leading-tight
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="sm">Small Button</Button>
          <span className="font-mono text-xs">size="sm"</span>
          <span className="text-muted-foreground text-xs">
            px-4, h-9, leading-tight
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="default">Default Size</Button>
          <span className="font-mono text-xs">size="default"</span>
          <span className="text-muted-foreground text-xs">
            px-4, h-10, leading-tight
          </span>
        </div>
      </div>

      <h4 className="text-md mt-6 mb-3 font-medium">With Icons</h4>
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col items-center gap-2">
          <Button size="xs" icon="mail">
            Email
          </Button>
          <span className="font-mono text-xs">size="xs" with icon</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="sm" icon="mail">
            Email
          </Button>
          <span className="font-mono text-xs">size="sm" with icon</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="xs" icon="arrowRight" iconPosition="right">
            Next
          </Button>
          <span className="font-mono text-xs">Icon on right</span>
        </div>
      </div>

      <h4 className="text-md mt-6 mb-3 font-medium">Icon-only Buttons</h4>
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col items-center gap-2">
          <Button
            size="icon"
            icon="heart"
            aria-label="Like"
            className="h-6 w-6"
          />
          <span className="font-mono text-xs">Custom size: h-6 w-6</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="icon" icon="heart" aria-label="Like" />
          <span className="font-mono text-xs">Default icon button</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button
            size="icon"
            icon="heart"
            aria-label="Like"
            className="h-12 w-12"
          />
          <span className="font-mono text-xs">Custom size: h-12 w-12</span>
        </div>
      </div>

      <div className="bg-muted mt-6 rounded-lg p-4">
        <h4 className="text-md mb-2 font-medium">Size Adjustments</h4>
        <p className="mb-1 text-sm">Changes made to improve usability:</p>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
          <li>
            Extra Small buttons: increased horizontal padding from px-2 to px-3
          </li>
          <li>Small buttons: increased horizontal padding from px-3 to px-4</li>
          <li>
            Icon buttons: explicit p-0 to ensure no padding affects icon
            centering
          </li>
          <li>Improved vertical alignment with leading-tight and py-0</li>
          <li>
            Added wrapper spans with inline-flex for better text alignment
          </li>
        </ul>
      </div>
    </div>
  ),
};

export const ExtraLarge: Story = {
  args: {
    children: "Extra Large Button",
    size: "xl",
  },
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <h3 className="mb-3 text-lg font-medium">Extra Large Button Styles</h3>

      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col items-center gap-2">
          <Button size="xl">Standard XL</Button>
          <span className="font-mono text-xs">size="xl"</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="xl" radius="full">
            Round XL
          </Button>
          <span className="font-mono text-xs">size="xl" radius="full"</span>
        </div>
      </div>

      <h4 className="text-md mt-6 mb-3 font-medium">XL Button Variants</h4>
      <div className="flex flex-wrap gap-4">
        <Button size="xl" variant="default">
          Default
        </Button>
        <Button size="xl" variant="secondary">
          Secondary
        </Button>
        <Button size="xl" variant="destructive">
          Destructive
        </Button>
        <Button size="xl" variant="outline">
          Outline
        </Button>
        <Button size="xl" variant="ghost">
          Ghost
        </Button>
        <Button size="xl" variant="ghost-default">
          Ghost Default
        </Button>
        <Button size="xl" variant="link">
          Link
        </Button>
      </div>

      <h4 className="text-md mt-6 mb-3 font-medium">XL with Radius Variants</h4>
      <div className="flex flex-wrap gap-4">
        <Button size="xl" radius="none">
          None
        </Button>
        <Button size="xl" radius="sm">
          Small
        </Button>
        <Button size="xl" radius="md">
          Medium
        </Button>
        <Button size="xl" radius="lg">
          Large
        </Button>
        <Button size="xl" radius="full">
          Full
        </Button>
      </div>

      <h4 className="text-md mt-6 mb-3 font-medium">XL with Icons</h4>
      <div className="flex flex-wrap gap-4">
        <Button size="xl" icon="arrowRight">
          With Icon
        </Button>
        <Button size="xl" icon="arrowRight" iconPosition="right">
          Icon Right
        </Button>
        <Button size="xl" icon="arrowRight" radius="full">
          Round with Icon
        </Button>
      </div>
    </div>
  ),
};

export const XLSizeComparison: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Comparação entre o botão Large (lg) e Extra Large (xl). O XL mantém o mesmo tamanho de fonte e ícone, mas com padding horizontal maior para ações de destaque.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <h3 className="mb-3 text-lg font-medium">
        Comparação: Large vs Extra Large
      </h3>

      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col items-center gap-2">
          <Button size="lg">Large Button</Button>
          <span className="font-mono text-xs">size="lg"</span>
          <span className="text-muted-foreground text-xs">
            h-11, px-8, leading-tight
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="xl">Extra Large Button</Button>
          <span className="font-mono text-xs">size="xl"</span>
          <span className="text-muted-foreground text-xs">
            h-12, px-12, leading-tight
          </span>
        </div>
      </div>

      <h4 className="text-md mt-6 mb-3 font-medium">Com Ícones</h4>
      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col items-center gap-2">
          <Button size="lg" icon="arrowRight">
            Large com Ícone
          </Button>
          <span className="font-mono text-xs">size="lg"</span>
          <span className="text-muted-foreground text-xs">Ícone: h-5 w-5</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="xl" icon="arrowRight">
            Extra Large com Ícone
          </Button>
          <span className="font-mono text-xs">size="xl"</span>
          <span className="text-muted-foreground text-xs">
            Mesmo ícone: h-5 w-5
          </span>
        </div>
      </div>

      <h4 className="text-md mt-6 mb-3 font-medium">Diferentes Variantes</h4>
      <div className="flex flex-wrap gap-3">
        <Button size="xl" variant="default">
          Default
        </Button>
        <Button size="xl" variant="secondary">
          Secondary
        </Button>
        <Button size="xl" variant="destructive">
          Destructive
        </Button>
        <Button size="xl" variant="outline">
          Outline
        </Button>
        <Button size="xl" variant="ghost">
          Ghost
        </Button>
        <Button size="xl" variant="ghost-default">
          Ghost Default
        </Button>
      </div>

      <div className="bg-muted mt-6 rounded-lg p-4">
        <h4 className="text-md mb-2 font-medium">Uso Recomendado</h4>
        <p className="text-sm">
          Use o botão Extra Large (xl) para ações principais que precisam de
          maior destaque visual sem necessariamente aumentar o tamanho da fonte.
          Ideal para CTAs primários em páginas de conversão, botões de compra, e
          ações que precisam atrair mais atenção.
        </p>
      </div>
    </div>
  ),
};
