/**
 * Animation Tokens - FleekDash V2.2 Design System
 *
 * Animation timing, easing, and presets for consistent motion.
 */

/**
 * Animation durations
 */
export const duration = {
  instant: "0ms",
  fast: "150ms",
  normal: "250ms",
  slow: "350ms",
  slower: "500ms",
  slowest: "750ms",
} as const;

/**
 * Easing functions
 */
export const easing = {
  linear: "linear",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
} as const;

/**
 * Transition presets
 * Common transition combinations for different use cases
 */
export const transitions = {
  // Basic transitions
  all: `all ${duration.normal} ${easing.easeInOut}`,
  colors: `background-color ${duration.fast} ${easing.easeOut}, border-color ${duration.fast} ${easing.easeOut}, color ${duration.fast} ${easing.easeOut}`,
  opacity: `opacity ${duration.normal} ${easing.easeInOut}`,
  shadow: `box-shadow ${duration.normal} ${easing.easeOut}`,
  transform: `transform ${duration.normal} ${easing.easeOut}`,

  // Component-specific
  button: `background-color ${duration.fast} ${easing.easeOut}, border-color ${duration.fast} ${easing.easeOut}, transform ${duration.fast} ${easing.easeOut}`,
  input: `border-color ${duration.fast} ${easing.easeOut}, box-shadow ${duration.fast} ${easing.easeOut}`,
  modal: `opacity ${duration.normal} ${easing.easeOut}, transform ${duration.normal} ${easing.easeOut}`,
  drawer: `transform ${duration.slow} ${easing.easeInOut}`,
  tooltip: `opacity ${duration.fast} ${easing.easeOut}, transform ${duration.fast} ${easing.easeOut}`,

  // Navigation
  page: `opacity ${duration.slower} ${easing.easeInOut}, transform ${duration.slower} ${easing.easeInOut}`,
  slide: `transform ${duration.normal} ${easing.easeOut}`,
  fade: `opacity ${duration.normal} ${easing.easeInOut}`,
} as const;

/**
 * Keyframe animations
 */
export const keyframes = {
  // Fade
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  fadeOut: `
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `,

  // Slide
  slideInUp: `
    @keyframes slideInUp {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `,
  slideInDown: `
    @keyframes slideInDown {
      from { transform: translateY(-100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `,
  slideInLeft: `
    @keyframes slideInLeft {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `,
  slideInRight: `
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `,

  // Scale
  scaleIn: `
    @keyframes scaleIn {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `,
  scaleOut: `
    @keyframes scaleOut {
      from { transform: scale(1); opacity: 1; }
      to { transform: scale(0.9); opacity: 0; }
    }
  `,

  // Spin
  spin: `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,

  // Pulse
  pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `,

  // Bounce
  bounce: `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-25%); }
    }
  `,

  // Shake
  shake: `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
      20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
  `,

  // Skeleton shimmer
  shimmer: `
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
  `,
} as const;

/**
 * Animation presets
 * Ready-to-use animation declarations
 */
export const animations = {
  fadeIn: `fadeIn ${duration.normal} ${easing.easeOut}`,
  fadeOut: `fadeOut ${duration.normal} ${easing.easeIn}`,
  slideInUp: `slideInUp ${duration.normal} ${easing.easeOut}`,
  slideInDown: `slideInDown ${duration.normal} ${easing.easeOut}`,
  slideInLeft: `slideInLeft ${duration.normal} ${easing.easeOut}`,
  slideInRight: `slideInRight ${duration.normal} ${easing.easeOut}`,
  scaleIn: `scaleIn ${duration.fast} ${easing.easeOut}`,
  scaleOut: `scaleOut ${duration.fast} ${easing.easeIn}`,
  spin: `spin ${duration.slowest} ${easing.linear} infinite`,
  pulse: `pulse ${duration.slower} ${easing.easeInOut} infinite`,
  bounce: `bounce ${duration.slowest} ${easing.easeInOut} infinite`,
  shake: `shake ${duration.slow} ${easing.easeInOut}`,
  shimmer: `shimmer 2s ${easing.linear} infinite`,
} as const;

/**
 * Complete animation tokens
 */
export const animationTokens = {
  duration,
  easing,
  transitions,
  keyframes,
  animations,
} as const;

/**
 * Types
 */
export type Duration = keyof typeof duration;
export type Easing = keyof typeof easing;
export type Transition = keyof typeof transitions;
export type Keyframe = keyof typeof keyframes;
export type Animation = keyof typeof animations;

/**
 * Helper to generate CSS variables for animations
 */
export function generateAnimationCSSVariables(): string {
  const vars: string[] = [];

  // Durations
  Object.entries(duration).forEach(([key, value]) => {
    vars.push(`  --duration-${key}: ${value};`);
  });

  // Easing
  Object.entries(easing).forEach(([key, value]) => {
    vars.push(`  --easing-${key}: ${value};`);
  });

  // Transitions
  Object.entries(transitions).forEach(([key, value]) => {
    vars.push(`  --transition-${key}: ${value};`);
  });

  return vars.join("\n");
}

/**
 * Helper to generate keyframes CSS
 */
export function generateKeyframesCSS(): string {
  return Object.values(keyframes).join("\n\n");
}
