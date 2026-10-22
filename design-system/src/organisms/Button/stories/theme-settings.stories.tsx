import { useTheme } from "@/theme-provider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "..";

const meta = {
  title: "Components/Inputs/Button/Theme Settings",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

const squircleCssLabel = (value: string) => {
  if (value === "1") return "true";
  if (value === "0") return "false";
  return "unknown";
};

const ThemeSettingsPreview = () => {
  const { uiSettings, currentTheme, theme, isDark } = useTheme();
  const [key, setKey] = React.useState(0);
  const [cssSquircleValue, setCssSquircleValue] = React.useState("");

  React.useEffect(() => {
    const cssVar = getComputedStyle(document.documentElement)
      .getPropertyValue("--use-squircle-buttons")
      .trim();
    setCssSquircleValue(cssVar);

    setKey((prevKey) => prevKey + 1);
  }, [theme, currentTheme?.id, isDark]);

  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const cssVar = getComputedStyle(document.documentElement)
            .getPropertyValue("--use-squircle-buttons")
            .trim();
          setCssSquircleValue(cssVar);
          setKey((prevKey) => prevKey + 1);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 p-4">
      <h3 className="mb-3 text-lg font-medium">
        Configurações de Tema para Botões
      </h3>

      <div className="bg-card rounded-md border p-4">
        <h4 className="text-md mb-2 font-medium">
          Tema Atual: {currentTheme?.name}
        </h4>
        <p className="mb-2 text-sm">
          <strong>UI settings:</strong>
        </p>
        <ul className="mb-4 flex flex-col gap-1 text-sm">
          <li>
            <code className="rounded-sm bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
              useSquircleButtons:{" "}
              {uiSettings.useSquircleButtons ? "true" : "false"}
            </code>
            <span className="text-muted-foreground ml-2 text-xs">
              (Context API)
            </span>
          </li>
          <li>
            <code className="rounded-sm bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
              CSS --use-squircle-buttons: {cssSquircleValue || "not set"}
            </code>
            <span className="text-muted-foreground ml-2 text-xs">
              (CSS Variable: {squircleCssLabel(cssSquircleValue)})
            </span>
          </li>
          <li>
            <code className="rounded-sm bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
              defaultButtonRadius: "{uiSettings.defaultButtonRadius}"
            </code>
          </li>
          <li className="text-muted-foreground mt-2 text-xs">
            HTML class: <code>{document.documentElement.className}</code>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-6" key={key}>
        <div>
          <h4 className="text-md mb-2 font-medium">
            Botões com Configurações do Tema
          </h4>
          <div className="bg-muted rounded-lg p-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center gap-2">
                <Button>Botão Padrão</Button>
                <span className="font-mono text-xs">Usa configs do tema</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button variant="outline">Outline</Button>
                <span className="font-mono text-xs">Variante outline</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button icon="settings">Com Ícone</Button>
                <span className="font-mono text-xs">Com ícone</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-md mb-2 font-medium">
            Sobrescrevendo Configurações
          </h4>
          <div className="bg-muted rounded-lg p-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center gap-2">
                <Button squircle={!uiSettings.useSquircleButtons}>
                  Squircle Invertido
                </Button>
                <span className="font-mono text-xs">
                  squircle={!uiSettings.useSquircleButtons ? "true" : "false"}
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button radius="full">Botão Redondo</Button>
                <span className="font-mono text-xs">
                  radius="full" (sempre desativa squircle)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted mt-6 rounded-lg p-4">
        <h4 className="text-md mb-2 font-medium">Como Configurar no Tema</h4>
        <p className="mb-2 text-sm">
          Você pode configurar estas opções no objeto de tema:
        </p>
        <pre className="overflow-auto rounded-sm bg-zinc-200 p-2 text-xs">
          {`// In theme definition file
export const myTheme: ThemeConfig = {
  id: "my-theme",
  name: "Meu Tema",
  // ... other theme settings

  // UI settings
  uiSettings: {
    useSquircleButtons: true,  // true/false to enable/disable squircle buttons
    defaultButtonRadius: "md", // any valid radius value
  }
}`}
        </pre>
        <p className="text-muted-foreground mt-2 text-xs">
          Estas configurações são aplicadas a todos os botões por padrão, mas
          podem ser sobrescritas por props individuais em cada botão.
        </p>
      </div>
    </div>
  );
};

export const ThemeUISettings: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstração de como as configurações globais do tema afetam os botões, permitindo habilitar/desabilitar squircle e definir radius padrão a nível de tema.",
      },
    },
  },
  render: () => <ThemeSettingsPreview />,
};
