/**
 * Color Foundations - FleekDash V2.2 Design System
 *
 * Centralized color system for the entire application.
 *
 * Usage:
 * ```typescript
 * import { colorTokens, lightColors, darkColors } from '@design-system/foundations/colors';
 *
 * // Use tokens directly
 * const primaryColor = colorTokens.primary[600];
 *
 * // Use semantic colors
 * const bgColor = lightColors.background;
 * ```
 */

export * from "./tokens";
export * from "./light";
export * from "./dark";

/**
 * Re-export commonly used items for convenience
 */
export { colorTokens } from "./tokens";
export { lightColors, generateLightCSSVariables } from "./light";
export { darkColors, generateDarkCSSVariables } from "./dark";
