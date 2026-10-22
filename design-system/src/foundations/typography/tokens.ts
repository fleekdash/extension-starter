/**
 * Typography Tokens - FleekDash V2.2 Design System
 *
 * Typography scale and settings for consistent text styling.
 */

/**
 * Font families
 */
export const fontFamily = {
  sans: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  mono: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
  heading: '"Inter", system-ui, sans-serif',
} as const;

/**
 * Font sizes
 * Based on FleekDash Starter theme
 */
export const fontSize = {
  xs: "0.75rem", // 12px
  sm: "0.8rem", // 12.8px
  base: "0.875rem", // 14px (default)
  md: "0.925rem", // 14.8px
  lg: "1rem", // 16px
  xl: "1.25rem", // 20px
  "2xl": "1.5rem", // 24px
  "3xl": "1.875rem", // 30px
  "4xl": "2.25rem", // 36px
  "5xl": "3rem", // 48px
  "6xl": "3.75rem", // 60px
} as const;

/**
 * Font weights
 */
export const fontWeight = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

/**
 * Line heights
 */
export const lineHeight = {
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

/**
 * Letter spacing
 */
export const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
} as const;

/**
 * Complete typography tokens
 */
export const typographyTokens = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
} as const;

/**
 * Text style presets
 * Combinations of size, weight, and line-height for common use cases
 */
export const textStyles = {
  // Headings
  h1: {
    fontSize: fontSize["4xl"],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  h4: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  h5: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  h6: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },

  // Body text
  body: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  "body-sm": {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  "body-lg": {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },

  // Special
  caption: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  },
  overline: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wider,
    textTransform: "uppercase" as const,
  },
  button: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  code: {
    fontFamily: fontFamily.mono,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
} as const;

/**
 * Types
 */
export type FontFamily = keyof typeof fontFamily;
export type FontSize = keyof typeof fontSize;
export type FontWeight = keyof typeof fontWeight;
export type LineHeight = keyof typeof lineHeight;
export type LetterSpacing = keyof typeof letterSpacing;
export type TextStyle = keyof typeof textStyles;

/**
 * Helper to generate CSS variables for typography
 */
export function generateTypographyCSSVariables(): string {
  const vars: string[] = [];

  // Font families
  Object.entries(fontFamily).forEach(([key, value]) => {
    vars.push(`  --font-family-${key}: ${value};`);
  });

  // Font sizes
  Object.entries(fontSize).forEach(([key, value]) => {
    vars.push(`  --text-${key}: ${value};`);
  });

  // Font weights
  Object.entries(fontWeight).forEach(([key, value]) => {
    vars.push(`  --font-weight-${key}: ${value};`);
  });

  // Line heights
  Object.entries(lineHeight).forEach(([key, value]) => {
    vars.push(`  --line-height-${key}: ${value};`);
  });

  // Letter spacing
  Object.entries(letterSpacing).forEach(([key, value]) => {
    vars.push(`  --letter-spacing-${key}: ${value};`);
  });

  return vars.join("\n");
}
