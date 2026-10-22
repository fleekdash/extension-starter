/**
 * Typography Foundations - FleekDash V2.2 Design System
 *
 * Typography tokens and utilities for consistent text styling.
 *
 * Usage:
 * ```typescript
 * import { typographyTokens, textStyles } from '@design-system/foundations/typography';
 *
 * // Use tokens
 * const fontSize = typographyTokens.fontSize.base;
 *
 * // Use text styles
 * const headingStyle = textStyles.h1;
 * ```
 */

export * from "./tokens";

/**
 * Re-export commonly used items for convenience
 */
export {
  typographyTokens,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  textStyles,
  generateTypographyCSSVariables,
} from "./tokens";

export type {
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  LetterSpacing,
  TextStyle,
} from "./tokens";
