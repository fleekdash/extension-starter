/**
 * Color Tokens - FleekDash V2.2 Design System
 *
 * Base color palette used across all themes.
 * These are the primitive colors that themes can use and override.
 */

/**
 * Primary color palette (Purple/Violet)
 * Used for primary actions, links, and brand identity
 */
export const primary = {
  50: "#f5f3ff",
  100: "#ede9fe",
  200: "#ddd6fe",
  300: "#c4b5fd",
  400: "#a78bfa",
  500: "#8b5cf6",
  600: "#6200ee", // Starter light primary
  700: "#4f00c2",
  800: "#3d0099",
  900: "#1e0066",
} as const;

/**
 * Accent color palette (Bright Purple/Magenta)
 * Used for highlights, notifications, and CTAs
 */
export const accent = {
  50: "#faf5ff",
  100: "#f3e8ff",
  200: "#e9d5ff",
  300: "#d8b4fe",
  400: "#c084fc",
  500: "#a855f7",
  600: "#9d00ff", // Starter light accent
  700: "#7c00cc",
  800: "#5e0099",
  900: "#3f0066",
} as const;

/**
 * Success color palette (Green)
 * Used for success states, confirmations
 */
export const success = {
  50: "#f0fdf4",
  100: "#dcfce7",
  200: "#bbf7d0",
  300: "#86efac",
  400: "#4ade80",
  500: "#469f42", // Starter success
  600: "#3a8135",
  700: "#2e6329",
  800: "#22451e",
  900: "#162713",
} as const;

/**
 * Warning color palette (Orange)
 * Used for warning states, alerts
 */
export const warning = {
  50: "#fff7ed",
  100: "#ffedd5",
  200: "#fed7aa",
  300: "#fdba74",
  400: "#fb923c",
  500: "#fe9a00", // Starter warning
  600: "#ca7b00",
  700: "#975c00",
  800: "#643d00",
  900: "#321f00",
} as const;

/**
 * Error/Destructive color palette (Red)
 * Used for error states, destructive actions
 */
export const error = {
  50: "#fef2f2",
  100: "#fee2e2",
  200: "#fecaca",
  300: "#fca5a5",
  400: "#f87171",
  500: "#fb2c36", // Starter error
  600: "#c9232b",
  700: "#971a21",
  800: "#641116",
  900: "#32090b",
} as const;

/**
 * Neutral/Gray color palette
 * Used for text, borders, backgrounds
 */
export const gray = {
  50: "#f8f8fd", // Starter light background-20
  100: "#f1f1f4",
  200: "#e5e7eb",
  300: "#d1d5db",
  400: "#9ca3af",
  500: "#6b7280",
  600: "#4b5675", // Starter light foreground
  700: "#374151",
  800: "#1f2937",
  900: "#111827",
} as const;

/**
 * Dark mode specific grays
 * Used for dark mode backgrounds
 */
export const darkGray = {
  50: "#2c3338",
  100: "#272c31",
  200: "#23282d",
  300: "#1e2327",
  400: "#1c2325", // Starter dark background-20
  500: "#1a2123", // Starter dark background
  600: "#171e20",
  700: "#14191b",
  800: "#111416",
  900: "#0e1113",
} as const;

/**
 * Transparent color utilities
 * Used for overlays, shadows, glass effects
 */
export const transparency = {
  0: "0%",
  5: "5%",
  6: "6%",
  10: "10%",
  12: "12%",
  15: "15%",
  20: "20%",
  30: "30%",
  40: "40%",
  50: "50%",
  60: "60%",
  70: "70%",
  80: "80%",
  90: "90%",
  95: "95%",
  100: "100%",
} as const;

/**
 * Chart colors
 * Used for data visualization
 */
export const chart = {
  1: "#ef4444",
  2: "#3858e9",
  3: "#2563eb",
  4: "#f59e0b",
  5: "#f97316",
} as const;

/**
 * Special colors
 */
export const special = {
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",
  current: "currentColor",
} as const;

/**
 * Export all color tokens
 */
export const colorTokens = {
  primary,
  accent,
  success,
  warning,
  error,
  gray,
  darkGray,
  transparency,
  chart,
  special,
} as const;

/**
 * Type for color token keys
 */
export type ColorToken = keyof typeof colorTokens;
export type PrimaryShade = keyof typeof primary;
export type AccentShade = keyof typeof accent;
export type SuccessShade = keyof typeof success;
export type WarningShade = keyof typeof warning;
export type ErrorShade = keyof typeof error;
export type GrayShade = keyof typeof gray;
export type DarkGrayShade = keyof typeof darkGray;
export type ChartColor = keyof typeof chart;
