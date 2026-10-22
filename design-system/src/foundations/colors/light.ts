/**
 * Light Mode Color Mappings - FleekDash V2.2
 *
 * Maps semantic color names to specific token values for light mode.
 * Based on the Starter theme light mode colors.
 */

import { colorTokens } from "./tokens";

/**
 * Light mode semantic colors
 */
export const lightColors = {
  // Base colors
  background: colorTokens.special.white,
  "background-20": colorTokens.gray[50], // #f8f8fd
  foreground: colorTokens.gray[600], // #4b5675

  // Card colors
  card: colorTokens.special.white,
  "card-foreground": "#071437",

  // Primary colors
  primary: colorTokens.primary[600], // #6200ee
  "primary-rgb": "98, 0, 238",
  "primary-foreground": colorTokens.special.white,
  "primary-darker-10": colorTokens.primary[700], // #4f00c2
  "primary-darker-10-rgb": "79, 0, 194",
  "primary-darker-20": colorTokens.primary[800], // #3d0099
  "primary-darker-20-rgb": "61, 0, 153",

  // Secondary colors (uses color-mix in CSS)
  secondary: `color-mix(in srgb, var(--primary) ${colorTokens.transparency[6]}, transparent)`,
  "secondary-foreground": "var(--primary)",

  // Accent colors
  accent: colorTokens.accent[600], // #9d00ff
  "accent-rgb": "153, 60, 255",
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
  "muted-20": "#444d6430",
  "muted-foreground": `color-mix(in srgb, var(--foreground) ${colorTokens.transparency[80]}, transparent)`,

  // Border colors
  border: "#575F7321",
  input: "#444d643a",

  // Destructive colors
  destructive: colorTokens.error[500], // #fb2c36
  "destructive-foreground": colorTokens.special.white,

  // Popover colors (oklch format from original)
  popover: "oklch(1 0 0)",
  "popover-foreground": "oklch(0.141 0.005 285.823)",

  // Ring colors
  ring: "oklch(0.871 0.006 286.286)",
  "ring-focus": "var(--accent)",

  // Skeleton colors (computed from --background / --card in skeleton-tokens.css)
  "skeleton-base": "var(--skeleton-base)",
  "skeleton-highlight": "var(--skeleton-highlight)",

  // Sidebar colors
  "sidebar-bg": "var(--background)",
  "sidebar-text": "var(--foreground)",
  "sidebar-text-hover": "var(--primary)",
  "sidebar-item-bg-hover": "var(--accent)",
  "sidebar-item-bg-selected": "var(--accent)",
  "sidebar-icon": "var(--muted-foreground)",
  "sidebar-icon-hover": "var(--primary)",
  "sidebar-search-bg": "var(--muted)",
  "sidebar-search-text": "var(--foreground)",
  "sidebar-search-placeholder": "var(--muted-foreground)",
  "sidebar-search-border": "var(--border)",
  "sidebar-search-icon": "var(--muted-foreground)",
  "sidebar-scrollbar-track": colorTokens.special.transparent,
  "sidebar-scrollbar-thumb": "oklch(0.55 0.01 286 / 0.2)",
  "sidebar-scrollbar-thumb-hover": "oklch(0.55 0.01 286 / 0.5)",
  "sidebar-notification-bg": "oklch(0.488 0.243 264.376)",
  "sidebar-notification-text": "oklch(1 0 0)",

  // Chart colors
  "chart-1": "oklch(0.646 0.222 41.116)",
  "chart-2": "oklch(0.6 0.118 184.704)",
  "chart-3": "oklch(0.398 0.07 227.392)",
  "chart-4": "oklch(0.828 0.189 84.429)",
  "chart-5": "oklch(0.769 0.188 70.08)",

  // Illustrations - uses PHP-injected var for subfolder installs
  "illustration-success":
    'var(--fleekdash-illustration-success, url("/wp-content/plugins/fleekdash/public/images/illustrations/32.svg"))',
} as const;

/**
 * Type for light color keys
 */
export type LightColorKey = keyof typeof lightColors;

/**
 * Helper to generate CSS variables for light mode
 */
export function generateLightCSSVariables(): string {
  return Object.entries(lightColors)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join("\n");
}
