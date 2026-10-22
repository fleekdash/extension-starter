/**
 * Spinner Component
 *
 * Traditional loading spinner with muted theme colors.
 * Matches FleekDash design system aesthetic.
 *
 * @package FleekDash
 * @since 2.3.0
 */

import { cn } from "../../internal";
import { getButtonDefaultLoadingText } from "../../organisms/Button/button-text";

export interface SpinnerProps {
  /**
   * Size of the spinner
   */
  readonly size?: "sm" | "md" | "lg" | "xl";
  /**
   * Additional CSS classes
   */
  readonly className?: string;
  /**
   * Accessible loading label (aria-label + screen-reader text)
   */
  readonly label?: string;
}

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[3px]",
  xl: "h-12 w-12 border-[3px]",
};

/**
 * Spinner component with theme colors
 *
 * Uses muted border with primary accent for professional look.
 *
 * @example
 * <Spinner size="md" />
 * <Spinner size="lg" label="Loading posts..." />
 */
export function Spinner({
  size = "md",
  className,
  label = getButtonDefaultLoadingText(),
}: Readonly<SpinnerProps>) {
  const loadingLabel = label;

  return (
    <output
      className={cn(
        // Base styles
        "block animate-spin rounded-full not-italic",
        // Theme colors - muted with primary accent
        "border-muted",
        "border-t-(--primary)",
        // Size
        sizeClasses[size],
        // Custom classes
        className,
      )}
      aria-live="polite"
      aria-label={loadingLabel}>
      <span className="sr-only">{loadingLabel}</span>
    </output>
  );
}

export interface SpinnerCenteredProps
  extends Readonly<Omit<SpinnerProps, "label">> {
  readonly text?: string;
}

/**
 * Centered spinner with optional text
 *
 * @example
 * <Spinner.Centered text="Loading integration..." />
 */
Spinner.Centered = function SpinnerCentered({
  size = "lg",
  text,
  className,
}: SpinnerCenteredProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        "h-full min-h-screen", // Use min-h-screen for full viewport, fallback to h-full for nested contexts
        className,
      )}>
      <Spinner size={size} label={text ?? getButtonDefaultLoadingText()} />
      {text && <p className="text-muted-foreground mt-4 text-sm">{text}</p>}
    </div>
  );
};

/**
 * Inline spinner for buttons and inline elements
 *
 * @example
 * <Button disabled><Spinner.Inline /> Loading...</Button>
 */
Spinner.Inline = function SpinnerInline({
  className,
}: Readonly<{ className?: string }>) {
  return <Spinner size="sm" className={cn("inline-block", className)} />;
};

export default Spinner;
