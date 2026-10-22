/**
 * RadioGroup Component - V2.2
 *
 * Radio button group component.
 * Migrated from V2 with all features preserved.
 *
 * @version 2.2.0
 */
"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";

import { cn } from "../../internal";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-muted-foreground/30 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-shadow-sm aspect-square size-4 shrink-0 rounded-full border shadow-xs outline-hidden focus-visible:ring-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}>
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center text-current">
        <svg
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="currentcolor"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="3" cy="3" r="3" />
        </svg>
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
