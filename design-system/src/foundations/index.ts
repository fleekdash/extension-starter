/**
 * Design System Foundations - FleekDash V2.2
 *
 * Core design tokens that form the foundation of the design system.
 * All components and themes are built on top of these primitives.
 *
 * Usage:
 * ```typescript
 * import { colorTokens, typographyTokens, spacing } from '@design-system/foundations';
 *
 * // Or import specific foundation
 * import { lightColors } from '@design-system/foundations/colors';
 * import { textStyles } from '@design-system/foundations/typography';
 * ```
 */

// Re-export all foundations
export * from "./colors";
export * from "./typography";
export * from "./spacing";
export * from "./animations";
export * from "./responsive";
export * from "./focus";

/**
 * Convenience exports for commonly used tokens
 */
export { colorTokens, lightColors, darkColors } from "./colors";

export {
  typographyTokens,
  fontSize,
  fontWeight,
  textStyles,
} from "./typography";

export { spacingTokens, spacing, borderRadius } from "./spacing";

export {
  animationTokens,
  duration,
  easing,
  transitions,
  animations,
} from "./animations";

export { responsiveTokens, breakpoints, mediaQueries } from "./responsive";
