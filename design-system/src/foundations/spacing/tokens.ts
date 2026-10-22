/**
 * Spacing Tokens - FleekDash V2.2 Design System
 *
 * Consistent spacing scale for margins, padding, and gaps.
 * Based on 4px base unit (0.25rem).
 */

/**
 * Spacing scale
 * Follows 4px base unit system
 */
export const spacing = {
  0: "0",
  0.5: "0.125rem", // 2px
  1: "0.25rem", // 4px
  1.5: "0.375rem", // 6px
  2: "0.5rem", // 8px
  2.5: "0.625rem", // 10px
  3: "0.75rem", // 12px
  3.5: "0.875rem", // 14px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  7: "1.75rem", // 28px
  8: "2rem", // 32px
  9: "2.25rem", // 36px
  10: "2.5rem", // 40px
  11: "2.75rem", // 44px
  12: "3rem", // 48px
  14: "3.5rem", // 56px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  28: "7rem", // 112px
  32: "8rem", // 128px
  36: "9rem", // 144px
  40: "10rem", // 160px
  44: "11rem", // 176px
  48: "12rem", // 192px
  52: "13rem", // 208px
  56: "14rem", // 224px
  60: "15rem", // 240px
  64: "16rem", // 256px
  72: "18rem", // 288px
  80: "20rem", // 320px
  96: "24rem", // 384px
} as const;

/**
 * Border radius scale
 */
export const borderRadius = {
  none: "0",
  sm: "0.125rem", // 2px
  base: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px", // Fully rounded
} as const;

/**
 * Common spacing presets
 * Semantic names for common spacing patterns
 */
export const spacingPresets = {
  // Component padding
  "component-xs": spacing[2], // 8px
  "component-sm": spacing[3], // 12px
  "component-md": spacing[4], // 16px
  "component-lg": spacing[6], // 24px
  "component-xl": spacing[8], // 32px

  // Section spacing
  "section-sm": spacing[8], // 32px
  "section-md": spacing[12], // 48px
  "section-lg": spacing[16], // 64px
  "section-xl": spacing[24], // 96px

  // Grid gaps
  "gap-xs": spacing[1], // 4px
  "gap-sm": spacing[2], // 8px
  "gap-md": spacing[4], // 16px
  "gap-lg": spacing[6], // 24px
  "gap-xl": spacing[8], // 32px

  // Container padding
  "container-sm": spacing[4], // 16px
  "container-md": spacing[6], // 24px
  "container-lg": spacing[8], // 32px
  "container-xl": spacing[12], // 48px
} as const;

/**
 * Complete spacing tokens
 */
export const spacingTokens = {
  spacing,
  borderRadius,
  spacingPresets,
} as const;

/**
 * Types
 */
export type Spacing = keyof typeof spacing;
export type BorderRadius = keyof typeof borderRadius;
export type SpacingPreset = keyof typeof spacingPresets;

/**
 * Helper to generate CSS variables for spacing
 */
export function generateSpacingCSSVariables(): string {
  const vars: string[] = [];

  // Spacing
  Object.entries(spacing).forEach(([key, value]) => {
    vars.push(`  --spacing-${key}: ${value};`);
  });

  // Border radius
  Object.entries(borderRadius).forEach(([key, value]) => {
    vars.push(`  --radius-${key}: ${value};`);
  });

  // Spacing presets
  Object.entries(spacingPresets).forEach(([key, value]) => {
    vars.push(`  --spacing-${key}: ${value};`);
  });

  return vars.join("\n");
}
