/**
 * Spacing Foundations - FleekDash V2.2 Design System
 *
 * Spacing tokens and utilities for consistent layout.
 *
 * Usage:
 * ```typescript
 * import { spacing, borderRadius } from '@design-system/foundations/spacing';
 *
 * // Use spacing
 * const padding = spacing[4]; // 16px
 *
 * // Use border radius
 * const radius = borderRadius.lg; // 8px
 * ```
 */

export * from "./tokens";

/**
 * Re-export commonly used items for convenience
 */
export {
  spacingTokens,
  spacing,
  borderRadius,
  spacingPresets,
  generateSpacingCSSVariables,
} from "./tokens";

export type { Spacing, BorderRadius, SpacingPreset } from "./tokens";
