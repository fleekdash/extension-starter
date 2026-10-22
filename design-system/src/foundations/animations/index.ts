/**
 * Animation Foundations - FleekDash V2.2 Design System
 *
 * Animation tokens and utilities for consistent motion.
 *
 * Usage:
 * ```typescript
 * import { duration, easing, animations } from '@design-system/foundations/animations';
 *
 * // Use duration
 * const transitionTime = duration.normal; // 250ms
 *
 * // Use easing
 * const curve = easing.easeOut;
 *
 * // Use animation preset
 * const fadeInAnimation = animations.fadeIn;
 * ```
 */

export * from "./tokens";

/**
 * Re-export commonly used items for convenience
 */
export {
  animationTokens,
  duration,
  easing,
  transitions,
  keyframes,
  animations,
  generateAnimationCSSVariables,
  generateKeyframesCSS,
} from "./tokens";

export type {
  Duration,
  Easing,
  Transition,
  Keyframe,
  Animation,
} from "./tokens";
