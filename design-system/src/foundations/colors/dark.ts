/**
 * Dark Mode Color Mappings - FleekDash V2.2
 *
 * Maps semantic color names to specific token values for dark mode.
 * Based on the Starter theme dark mode colors.
 */

import { colorTokens } from "./tokens";

/**
 * Dark mode semantic colors
 */
export const darkColors = {
  // Base colors
  background: colorTokens.darkGray[500], // #1a2123
  "background-20": colorTokens.darkGray[400], // #1c2325
  "background-image":
    'url("/public/images/backgrounds/round-purple-blue2-0f1629.svg")',
  "background-size": "cover",
  "background-position": "center",
  "background-repeat": "no-repeat",
  "background-opacity": "0.15",
  foreground: "#acb7cdcf",

  // Card colors
  card: "#1a212330",
  "card-foreground": colorTokens.special.white,

  // Border colors
  border: "#815b831f",
  input: "#ba8bc432",

  // Primary colors
  primary: "#8c00ff",
  "primary-foreground": colorTokens.special.white,

  // Secondary colors (uses color-mix in CSS)
  secondary: `color-mix(in srgb, var(--primary) ${colorTokens.transparency[10]}, transparent)`,
  "secondary-foreground": "var(--primary)",

  // Accent colors
  accent: "#d700ff",
  "accent-foreground": colorTokens.special.white,

  // Success colors
  success: colorTokens.success[500], // #469f42
  "success-foreground": colorTokens.special.white,

  // Warning colors
  warning: colorTokens.warning[500], // #fe9a00
  "warning-foreground": colorTokens.special.white,

  // Error colors
  error: colorTokens.error[500], // #fb2c36
  "error-foreground": colorTokens.special.white,

  // Muted colors (uses color-mix in CSS)
  muted: `color-mix(in srgb, var(--foreground) ${colorTokens.transparency[6]}, transparent)`,
  "muted-foreground": `color-mix(in srgb, var(--foreground) ${colorTokens.transparency[80]}, transparent)`,

  // Destructive colors
  destructive: "#f43f5e",
  "destructive-foreground": colorTokens.special.white,

  // Popover colors
  popover: colorTokens.darkGray[500], // #1a2123
  "popover-foreground": colorTokens.special.white,

  // Ring colors
  ring: "#ffffff10",
  "ring-focus": "var(--accent)",

  // Skeleton colors (computed from --background / --card in skeleton-tokens.css)
  "skeleton-base": "var(--skeleton-base)",
  "skeleton-highlight": "var(--skeleton-highlight)",

  // Chart colors
  "chart-1": colorTokens.chart[1], // #ef4444
  "chart-2": colorTokens.chart[2], // #3858e9
  "chart-3": colorTokens.chart[3], // #2563eb
  "chart-4": colorTokens.chart[4], // #f59e0b

  // Sidebar colors
  sidebar: "var(--card)",
  "sidebar-foreground": "#f5f5f7",

  // Switch colors
  "switch-bg-unchecked": "var(--card-20)",
  "switch-bg-checked": "var(--primary)",
  "switch-thumb-bg-unchecked": "var(--card-50)",
  "switch-thumb-bg": "var(--primary-foreground)",

  // Illustrations
  "illustration-success":
    'var(--fleekdash-illustration-success-dark, url("/wp-content/plugins/fleekdash/public/images/illustrations/32-dark.svg"))',
} as const;

/**
 * Type for dark color keys
 */
export type DarkColorKey = keyof typeof darkColors;

/**
 * Helper to generate CSS variables for dark mode
 */
export function generateDarkCSSVariables(): string {
  return Object.entries(darkColors)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join("\n");
}
