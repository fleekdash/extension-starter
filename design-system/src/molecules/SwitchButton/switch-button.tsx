/**
 * SwitchButton Component - V2.2
 *
 * Enhanced switch with label and description.
 * Combines Switch with button-like styling.
 *
 * @version 2.2.0
 */

"use client";

import { Switch } from "../../molecules/Switch";
import { cn } from "../../internal";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const switchButtonVariants = tv({
  base: [
    "flex items-center justify-between px-3 py-2 rounded-md border border-transparent",
    "hover:border-border hover:bg-muted/30  cursor-pointer",
  ],
  variants: {
    size: {
      sm: "px-2 py-1.5 text-sm",
      md: "px-3 py-2 text-sm",
      lg: "px-4 py-3 text-base",
    },
    variant: {
      default: "hover:border-border hover:bg-muted/30",
      ghost: "hover:bg-muted/50",
      outline: "border-border hover:bg-muted/20",
    },
    disabled: {
      true: "cursor-not-allowed opacity-50 hover:border-transparent hover:bg-transparent",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
    disabled: false,
  },
});

const labelVariants = tv({
  base: "text-muted-foreground select-none",
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface SwitchButtonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">,
    VariantProps<typeof switchButtonVariants> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  switchSize?: "sm" | "md" | "lg";
  disabled?: boolean;
  description?: string;
}

const SwitchButton = React.forwardRef<HTMLDivElement, SwitchButtonProps>(
  (
    {
      className,
      size,
      variant,
      disabled = false,
      checked,
      onCheckedChange,
      label,
      switchSize = "sm",
      description,
      ...props
    },
    ref,
  ) => {
    const handleClick = () => {
      if (!disabled) {
        onCheckedChange(!checked);
      }
    };

    const handleSwitchClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!disabled) {
        onCheckedChange(!checked);
      }
    };

    // The inner Switch is the single semantic + focusable control
    // (role="switch" + keyboard). The outer div is a presentational
    // click target for the label only - giving it role/tabIndex created
    // a keyboard-dead second Tab stop.
    return (
      <div
        ref={ref}
        className={cn(
          switchButtonVariants({ size, variant, disabled, className }),
        )}
        onClick={handleClick}
        {...props}>
        <div className="flex flex-col">
          <div className={`font-medium ${cn(labelVariants({ size }))} `}>
            {label}
          </div>
          {description && (
            <div className="text-muted-foreground/70 mt-0.5 text-xs">
              {description}
            </div>
          )}
        </div>
        <div onClick={handleSwitchClick} className="flex items-center">
          <Switch
            checked={checked}
            onCheckedChange={onCheckedChange}
            size={switchSize}
            disabled={disabled}
            aria-label={label}
          />
        </div>
      </div>
    );
  },
);

SwitchButton.displayName = "SwitchButton";

export default SwitchButton;
