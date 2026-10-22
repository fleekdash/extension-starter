"use client";

import { cn } from "../../internal";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const switchVariants = tv({
  base: [
    "peer inline-flex shrink-0 items-center rounded-full border-2 border-transparent outline-none",
    "data-[state=checked]:bg-primary data-[state=unchecked]:bg-card-20",
    "focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "disabled:cursor-not-allowed",
  ],
  variants: {
    size: {
      sm: "h-4 w-7",
      md: "h-6 w-10",
      lg: "h-7 w-12",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

const thumbVariants = tv({
  base: [
    "pointer-events-none block rounded-full",
    "data-[state=unchecked]:bg-card-50 data-[state=checked]:bg-background",
    "shadow-xs ring-0",
    "transition-transform motion-safe:duration-200 motion-safe:ease-spring-2",
  ],
  variants: {
    size: {
      sm: [
        "size-3",
        "data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0",
        "data-[state=checked]:rtl:-translate-x-3",
      ],
      md: [
        "size-5",
        "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        "data-[state=checked]:rtl:-translate-x-4",
      ],
      lg: [
        "size-6",
        "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        "data-[state=checked]:rtl:-translate-x-5",
      ],
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> &
  VariantProps<typeof switchVariants>;

function Switch({ className, size, ...props }: Readonly<SwitchProps>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-field-focus=""
      className={cn(switchVariants({ size, className }))}
      {...props}>
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(thumbVariants({ size }))}
      />
    </SwitchPrimitive.Root>
  );
}

export default Switch;
