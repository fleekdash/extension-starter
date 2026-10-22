/**
 * Responsive Tokens - FleekDash V2.2 Design System
 *
 * Breakpoints and responsive utilities for mobile-first design.
 */

/**
 * Breakpoint scale
 * Mobile-first approach: min-width media queries
 */
export const breakpoints = {
  sm: "640px", // Small devices (phones)
  md: "768px", // Medium devices (tablets)
  lg: "1024px", // Large devices (laptops)
  xl: "1280px", // Extra large (desktops)
  "2xl": "1536px", // 2X extra large (large desktops)
} as const;

/**
 * Media queries
 * Ready-to-use media query strings
 */
export const mediaQueries = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  "2xl": `@media (min-width: ${breakpoints["2xl"]})`,

  // Max-width queries (for special cases)
  maxSm: `@media (max-width: ${breakpoints.sm})`,
  maxMd: `@media (max-width: ${breakpoints.md})`,
  maxLg: `@media (max-width: ${breakpoints.lg})`,
  maxXl: `@media (max-width: ${breakpoints.xl})`,
  max2xl: `@media (max-width: ${breakpoints["2xl"]})`,

  // Between queries
  smToMd: `@media (min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.md})`,
  mdToLg: `@media (min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg})`,
  lgToXl: `@media (min-width: ${breakpoints.lg}) and (max-width: ${breakpoints.xl})`,

  // Orientation
  portrait: "@media (orientation: portrait)",
  landscape: "@media (orientation: landscape)",

  // Motion preference
  reducedMotion: "@media (prefers-reduced-motion: reduce)",
  noPreference: "@media (prefers-reduced-motion: no-preference)",

  // Color scheme preference
  lightMode: "@media (prefers-color-scheme: light)",
  darkMode: "@media (prefers-color-scheme: dark)",

  // High contrast
  highContrast: "@media (prefers-contrast: high)",

  // Pointer capability
  fine: "@media (pointer: fine)", // Mouse, trackpad
  coarse: "@media (pointer: coarse)", // Touch
  none: "@media (pointer: none)", // Keyboard only

  // Hover capability
  hover: "@media (hover: hover)",
  noHover: "@media (hover: none)",
} as const;

/**
 * Container max widths
 * Matching breakpoints
 */
export const containerMaxWidth = {
  sm: breakpoints.sm,
  md: breakpoints.md,
  lg: breakpoints.lg,
  xl: breakpoints.xl,
  "2xl": breakpoints["2xl"],
} as const;

/**
 * Complete responsive tokens
 */
export const responsiveTokens = {
  breakpoints,
  mediaQueries,
  containerMaxWidth,
} as const;

/**
 * Types
 */
export type Breakpoint = keyof typeof breakpoints;
export type MediaQuery = keyof typeof mediaQueries;

/**
 * Helper to generate CSS variables for responsive
 */
export function generateResponsiveCSSVariables(): string {
  const vars: string[] = [];

  // Breakpoints
  Object.entries(breakpoints).forEach(([key, value]) => {
    vars.push(`  --breakpoint-${key}: ${value};`);
  });

  // Container max widths
  Object.entries(containerMaxWidth).forEach(([key, value]) => {
    vars.push(`  --container-max-${key}: ${value};`);
  });

  return vars.join("\n");
}

/**
 * Hook-like helper for responsive queries (use in JS)
 */
export function useResponsive() {
  if (typeof window === "undefined") return {};

  return {
    isSm: window.matchMedia(`(min-width: ${breakpoints.sm})`).matches,
    isMd: window.matchMedia(`(min-width: ${breakpoints.md})`).matches,
    isLg: window.matchMedia(`(min-width: ${breakpoints.lg})`).matches,
    isXl: window.matchMedia(`(min-width: ${breakpoints.xl})`).matches,
    is2xl: window.matchMedia(`(min-width: ${breakpoints["2xl"]})`).matches,
    isTouch: window.matchMedia("(pointer: coarse)").matches,
    isDesktop: window.matchMedia("(pointer: fine)").matches,
    prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches,
    prefersDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  };
}
