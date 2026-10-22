/**
 * Responsive Foundations - FleekDash V2.2 Design System
 *
 * Breakpoints and responsive utilities.
 *
 * Usage:
 * ```typescript
 * import { breakpoints, mediaQueries } from '@design-system/foundations/responsive';
 *
 * // In CSS-in-JS
 * const styles = {
 *   [mediaQueries.md]: {
 *     fontSize: '1rem',
 *   },
 * };
 *
 * // Check responsive state
 * const { isMd, isTouch } = useResponsive();
 * ```
 */

export * from "./tokens";

/**
 * Re-export commonly used items for convenience
 */
export {
  responsiveTokens,
  breakpoints,
  mediaQueries,
  containerMaxWidth,
  generateResponsiveCSSVariables,
  useResponsive,
} from "./tokens";

export type { Breakpoint, MediaQuery } from "./tokens";
