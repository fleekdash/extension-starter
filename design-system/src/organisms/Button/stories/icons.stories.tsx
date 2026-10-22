import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "..";

const meta = {
  title: "Components/Inputs/Button/Icons",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const IconButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Buttons with icons using the `icon` prop and icons-map keys (theme-aware Solar/Lucide). You can position the icon on either side of text or use icon-only buttons.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <h3 className="mb-3 text-lg font-medium">Icon Buttons</h3>

      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col items-center gap-2">
          <Button icon="mail">Email</Button>
          <span className="font-mono text-xs">icon="mail"</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button icon="settings" iconPosition="right">
            Settings
          </Button>
          <span className="font-mono text-xs">iconPosition="right"</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant="secondary" icon="add">
            Add New
          </Button>
          <span className="font-mono text-xs">variant="secondary"</span>
        </div>
      </div>

      <h4 className="text-md mt-6 mb-3 font-medium">Icon-Only Buttons</h4>
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col items-center gap-2">
          <Button size="icon" icon="search" aria-label="Search" />
          <span className="font-mono text-xs">size="icon"</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="icon" icon="add" variant="secondary" aria-label="Add" />
          <span className="font-mono text-xs">variant="secondary"</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button
            size="icon"
            icon="delete"
            variant="destructive"
            aria-label="Delete"
          />
          <span className="font-mono text-xs">variant="destructive"</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button
            size="icon"
            icon="heart"
            variant="outline"
            radius="full"
            aria-label="Like"
          />
          <span className="font-mono text-xs">radius="full"</span>
        </div>
      </div>

      <h4 className="text-md mt-6 mb-3 font-medium">Icon Sizes</h4>
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col items-center gap-2">
          <Button size="sm" icon="arrowRight">
            Small
          </Button>
          <span className="font-mono text-xs">size="sm"</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button icon="arrowRight">Default</Button>
          <span className="font-mono text-xs">default</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button size="lg" icon="arrowRight">
            Large
          </Button>
          <span className="font-mono text-xs">size="lg"</span>
        </div>
      </div>

      <div className="bg-muted mt-6 rounded-lg p-4">
        <h4 className="text-md mb-2 font-medium">How to Use Icon Prop</h4>
        <p className="mb-2 text-sm">
          Use keys from <code className="text-xs">icons-map.ts</code> (resolved
          per active theme):
        </p>
        <pre className="overflow-auto rounded-sm bg-zinc-200 p-2 text-xs">
          {`<Button icon="mail">Send Email</Button>
<Button icon="search" size="icon" aria-label="Search" />
<Button icon="arrowRight" iconPosition="right">Next</Button>`}
        </pre>
      </div>
    </div>
  ),
};

export const IconBalancing: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstração do equilíbrio visual do espaçamento em botões com ícones, com padding compensado do lado oposto ao ícone.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <h3 className="mb-3 text-lg font-medium">Equilíbrio Visual com Ícones</h3>

      <div className="flex flex-col gap-6">
        <div>
          <h4 className="text-md mb-2 font-medium">Comparação Lado a Lado</h4>
          <div className="bg-muted relative rounded-lg p-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center gap-2">
                <Button>Sem Ícone</Button>
                <span className="font-mono text-xs">Padding padrão</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button icon="mail">Com Ícone</Button>
                <span className="font-mono text-xs">Padding compensado</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button icon="arrowRight" iconPosition="right">
                  Ícone à Direita
                </Button>
                <span className="font-mono text-xs">Padding compensado</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-md mb-2 font-medium">Ajuste por Tamanho</h4>
          <div className="bg-muted rounded-lg p-4">
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex flex-col items-center gap-2">
                <Button size="xs" icon="settings">
                  XS Button
                </Button>
                <span className="font-mono text-xs">
                  Espaçamento menor (mr-1.5)
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button size="sm" icon="settings">
                  SM Button
                </Button>
                <span className="font-mono text-xs">
                  Espaçamento padrão (mr-2)
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button icon="settings">Default Button</Button>
                <span className="font-mono text-xs">
                  Espaçamento padrão (mr-2)
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button size="lg" icon="settings">
                  Large Button
                </Button>
                <span className="font-mono text-xs">
                  Espaçamento maior (mr-3)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-md mb-2 font-medium">Ícone em Botão Large</h4>
          <div className="bg-muted rounded-lg p-4">
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex flex-col items-center gap-2">
                <Button size="lg" icon="settings">
                  Tamanho do Ícone Ajustado
                </Button>
                <span className="font-mono text-xs">
                  h-5 w-5 (reduzido de h-6 w-6)
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button size="default" icon="settings">
                  Botão Default
                </Button>
                <span className="font-mono text-xs">h-5 w-5 (referência)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted mt-6 rounded-lg p-4">
        <h4 className="text-md mb-2 font-medium">
          Ajustes Finos Implementados
        </h4>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
          <li>
            Adicionado padding extra (pr-1/pl-1) no lado oposto ao ícone para
            equilibrar visualmente
          </li>
          <li>
            Espaçamento entre ícone e texto proporcional ao tamanho do botão
            (xs: 1.5, padrão: 2, lg: 3)
          </li>
          <li>
            Reduzido o tamanho do ícone em botões large de h-6 w-6 para h-5 w-5
          </li>
          <li>Padding maior em botões large (pr-1.5/pl-1.5 vs pr-1/pl-1)</li>
        </ul>
      </div>
    </div>
  ),
};
