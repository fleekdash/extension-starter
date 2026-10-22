/**
 * Alert Component - V2.2
 *
 * Alert notifications with variants (default, destructive, info).
 * Uses class-variance-authority for variant management.
 *
 * @version 2.2.0
 */

import {
  HexagonBadge,
  HEXAGON_BADGE_SHELL_ON_DEFAULT_CLASS,
} from "../../atoms/HexagonBadge";
import { cn } from "../../internal";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const ALERT_BANNER_HEXAGON_SIZE_CLASS = "size-[40px]";

const alertVariants = cva("relative w-full rounded-lg border p-4", {
  variants: {
    variant: {
      default: "bg-background text-foreground",
      destructive:
        "border-destructive-50 text-destructive dark:border-destructive",
      /** Theme / palette (primary tint) — not fixed browser blue */
      info: "border-primary/25 bg-primary/5 text-foreground dark:border-primary/35 dark:bg-primary/10 dark:text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

export type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  readonly children: React.ReactNode;
};

const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn(
        "m-0 text-base leading-6 font-semibold tracking-tight",
        className,
      )}
      {...props}>
      {children}
    </h5>
  ),
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm leading-loose", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

/**
 * AlertMessage - Pre-configured alert with icon and proper vertical alignment
 *
 * ✅ FIXED V2.2: Icon alignment issue resolved using items-start with mt-0.5
 * This ensures icons align with the first line of text, not the center of the container
 */
type AlertMessageLayout = "inline" | "banner";

interface AlertMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  /**
   * `inline` stacks icon and copy vertically (default).
   * `banner` is a horizontal row: hexagon icon, copy, optional action on the right.
   */
  layout?: AlertMessageLayout;
  /** CTA slot — only used when `layout="banner"`. */
  action?: React.ReactNode;
  /**
   * `info` uses theme primary tint and primary text. `neutral` is card/muted with no primary tint.
   */
  variant?: "success" | "error" | "info" | "warning" | "neutral";
  children: React.ReactNode;
}

const alertMessageIconWrapClass: Record<
  NonNullable<AlertMessageProps["variant"]>,
  string
> = {
  info: "text-primary",
  neutral: "text-muted-foreground",
  success: "text-green-600 dark:text-green-400",
  error: "text-red-600 dark:text-red-400",
  warning: "text-amber-600 dark:text-amber-400",
};

const alertMessageVariantStyles: Record<
  NonNullable<AlertMessageProps["variant"]>,
  string
> = {
  success:
    "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-100",
  error:
    "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-100",
  info: "border-primary/25 bg-primary/5 text-primary/80 dark:border-primary/35 dark:bg-primary/10 dark:text-primary",
  warning:
    "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100",
  neutral:
    "border-border bg-card text-card-foreground dark:border-border dark:bg-card dark:text-card-foreground",
};

const alertMessageLayoutStyles: Record<AlertMessageLayout, string> = {
  inline: "mt-2 flex items-start gap-3 p-3",
  banner: "flex flex-wrap items-center gap-3 px-4 py-3",
};

function AlertMessageIcon({
  icon,
  layout,
  variant,
}: {
  readonly icon: React.ReactNode;
  readonly layout: AlertMessageLayout;
  readonly variant: NonNullable<AlertMessageProps["variant"]>;
}) {
  if (layout === "banner") {
    return (
      <HexagonBadge
        size={ALERT_BANNER_HEXAGON_SIZE_CLASS}
        shellClassName={HEXAGON_BADGE_SHELL_ON_DEFAULT_CLASS}
        badge={icon}
      />
    );
  }

  return (
    <span
      className={cn(
        "flex size-5 shrink-0 items-center justify-center self-start pt-0.5",
        alertMessageIconWrapClass[variant],
      )}>
      {icon}
    </span>
  );
}

const AlertMessage = React.forwardRef<HTMLDivElement, AlertMessageProps>(
  (
    {
      icon,
      layout = "inline",
      action,
      variant = "info",
      children,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "rounded-lg border",
          alertMessageLayoutStyles[layout],
          alertMessageVariantStyles[variant],
          className,
        )}
        {...props}>
        {icon ? (
          <AlertMessageIcon icon={icon} layout={layout} variant={variant} />
        ) : null}
        <div
          className={cn(
            "min-w-0 flex-1 text-sm leading-6 [&_strong]:font-semibold",
            layout === "banner" && "space-y-0.5",
          )}>
          {children}
        </div>
        {layout === "banner" && action ? (
          <div className="shrink-0">{action}</div>
        ) : null}
      </div>
    );
  },
);
AlertMessage.displayName = "AlertMessage";

export { Alert, AlertDescription, AlertTitle, AlertMessage };
