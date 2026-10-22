"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { cn } from "../../internal";

/** Portal layer above FleekDash floating UI (assistant modal ~9998, launcher ~9990). */
const TOOLTIP_PORTAL_Z_CLASS = "z-10050";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: Readonly<React.ComponentProps<typeof TooltipPrimitive.Provider>>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: Readonly<React.ComponentProps<typeof TooltipPrimitive.Root>>) {
  // Automatically wrap with TooltipProvider for backward compatibility
  // If TooltipProvider is used externally, it will work fine (nested providers are safe)
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

interface TooltipTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger> {
  /**
   * Render prop pattern - allows passing a component to be rendered as the trigger.
   * Alternative to using `asChild` prop.
   *
   * @example
   * <TooltipTrigger render={<Button variant="outline" />}>
   *   <Info className="h-4 w-4" />
   *   Default tooltip
   * </TooltipTrigger>
   */
  render?: React.ReactElement<{ children?: React.ReactNode }>;
}

const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  TooltipTriggerProps
>(({ render, children, className, ...props }, ref) => {
  // Support render prop pattern (like ReUI example)
  if (render) {
    // When render is provided, use asChild to avoid nesting buttons
    // Merge children: if children provided, use them; otherwise use render's children
    let mergedChildren: React.ReactNode;
    if (children == null) {
      mergedChildren = render.props.children;
    } else {
      mergedChildren = React.isValidElement(children) ? (
        children
      ) : (
        <>{children}</>
      );
    }

    return (
      <TooltipPrimitive.Trigger
        ref={ref}
        data-slot="tooltip-trigger"
        asChild
        className={cn(className)}
        {...props}>
        {React.cloneElement(render, {
          ...render.props,
          children: mergedChildren,
        })}
      </TooltipPrimitive.Trigger>
    );
  }

  return (
    <TooltipPrimitive.Trigger
      ref={ref}
      data-slot="tooltip-trigger"
      className={cn(className)}
      {...props}>
      {children}
    </TooltipPrimitive.Trigger>
  );
});
TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName;

function TooltipPortal({
  ...props
}: Readonly<React.ComponentProps<typeof TooltipPrimitive.Portal>>) {
  return <TooltipPrimitive.Portal {...props} />;
}

interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  /**
   * Show arrow pointing to the trigger element
   * @default true
   */
  showArrow?: boolean;
  /**
   * Side offset from the trigger
   * @default 4
   */
  sideOffset?: number;
  /**
   * Make tooltip transparent - removes background, border, and shadow.
   * Useful when tooltip is used only as positioning container for custom content.
   * @default false
   */
  transparent?: boolean;
  /**
   * Wrap content in a portal (renders in document.body).
   * Set to false when the tooltip lives inside another portal (e.g. Vaul drawer)
   * to prevent React removeChild errors during unmount.
   * @default true
   */
  portal?: boolean;
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>((props: Readonly<TooltipContentProps>, ref) => {
  const {
    className,
    sideOffset = 4,
    showArrow = true,
    transparent = false,
    portal = true,
    children,
    ...rest
  } = props;
  const adjustedSideOffset = sideOffset;

  const PortalWrapper = portal ? TooltipPrimitive.Portal : React.Fragment;

  if (transparent) {
    return (
      <PortalWrapper>
        <TooltipPrimitive.Content
          ref={ref}
          data-slot="tooltip-content"
          sideOffset={adjustedSideOffset}
          style={{
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
            padding: 0,
            margin: 0,
            borderRadius: 0,
            height: "auto",
          }}
          className={cn(
            "z-500 text-start",
            "*:[data-radix-tooltip-arrow]:hidden",
            "animate-in fade-in-0 duration-150",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-100",
            className,
          )}
          {...rest}>
          {children}
        </TooltipPrimitive.Content>
      </PortalWrapper>
    );
  }

  return (
    <PortalWrapper>
      <TooltipPrimitive.Content
        ref={ref}
        data-slot="tooltip-content"
        sideOffset={adjustedSideOffset}
        style={{
          fontSize: "0.75rem",
          lineHeight: "1rem",
          color: "#ffffff",
          backgroundColor: "#18181b",
        }}
        className={cn(
          TOOLTIP_PORTAL_Z_CLASS,
          "max-w-xs rounded-md px-4 py-1.5 text-start",
          "border border-white/10",
          "shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]",
          "*:text-xs! *:text-white! [&]:text-xs! [&]:text-white!",
          "*:[data-radix-tooltip-arrow]:fill-zinc-900",
          "animate-in fade-in-0 duration-150",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-100",
          className,
        )}
        {...rest}>
        {children}
        {showArrow && (
          <TooltipPrimitive.Arrow
            className="-my-px fill-zinc-900 drop-shadow-[0_1px_0_rgba(255,255,255,0.13)]"
            width={11}
            height={5}
            style={{
              fill: "#18181b",
            }}
            offset={5}
          />
        )}
      </TooltipPrimitive.Content>
    </PortalWrapper>
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipPortal,
};
