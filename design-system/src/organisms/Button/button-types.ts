import type { HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import type { VariantProps } from "tailwind-variants";
import type { button } from "./button-variants";

export type ButtonState = "success" | "error" | "loading" | "disabled" | null;

export type { MutableRef, ReadonlyRef } from "../../internal";

export type ButtonSizeProp = VariantProps<typeof button>["size"];

/** Horizontal alignment of icon + label (main axis for `inline-flex` row). */
export type ButtonContentAlign = "left" | "center" | "right";

export interface ButtonProps
  extends Omit<
      HTMLMotionProps<"button">,
      keyof VariantProps<typeof button> | "children"
    >,
    Omit<VariantProps<typeof button>, "state"> {
  children?: ReactNode;
  /** Render as child element (polymorphic button) */
  asChild?: boolean;
  icon?: string;
  iconClassName?: string;
  iconPosition?: "left" | "right";
  /** Enable squircle shape with soft corners instead of regular border-radius */
  squircle?: boolean;
  /** Smoothing strength for squircle effect (sm, md, lg) */
  squircleSmoothing?: "sm" | "md" | "lg";
  /** Enable ripple effect on click */
  enableRipple?: boolean;
  /** Custom ripple color (defaults to white for dark buttons, black for light buttons) */
  rippleColor?: string;
  /** Duration of ripple animation (default: 600ms) */
  rippleDuration?: string;
  /** Enable zoom effect on hover - options: true (default zoom), "elastic" (for elastic zoom), or false */
  hoverZoom?: boolean | "elastic";
  /** Enable zoom effect on click (default: true) */
  clickZoom?: boolean;
  /** Shiny effect mode: "hover" (default), "permanent", or false */
  shiny?: false | "hover" | "permanent";
  /** Override the primary color for brand buttons */
  brandColor?: string;
  /** Button state */
  state?: ButtonState;
  /** Loading spinner type */
  loadingSpinner?: "default" | "alt" | "infinity" | "twist";
  /** Loading text to show (defaults to "Loading...") */
  loadingText?: string;
  /** Success text to show (defaults to "Success!") */
  successText?: string;
  /** Error text to show (defaults to "Error!") */
  errorText?: string;
  /** Enable instant loading state on click */
  instantLoading?: boolean;
  /** Timeout in milliseconds for loading state before showing error (default: 10000) */
  loadingTimeout?: number;
  /** Custom error message when loading timeout is reached */
  timeoutErrorText?: string;
  /** Callback when loading timeout is reached */
  onLoadingTimeout?: () => void;
  /** Callback when loading starts */
  onLoadingStart?: () => void;
  /** Minimum width to prevent content shifting during state changes */
  minWidth?: string | number;
  /** Show retry option when in error state */
  showRetry?: boolean;
  /** Custom retry text (defaults to "Try again") */
  retryText?: string;
  /** Callback when retry is clicked */
  onRetry?: () => void;
  /** Allow button to be clicked in final states (success/error). Default is false */
  clickableInFinalState?: boolean;
  /** Full width variant */
  fullWidth?: boolean;
  /**
   * Align icon + label inside the control. Defaults to `center`.
   * Also updates root `justify-*` so multi-child / flattened layouts stay consistent.
   */
  contentAlign?: ButtonContentAlign;
  /** Trailing chevron for ghost menu triggers (e.g. header "New"). */
  menuChevron?: boolean;
}
