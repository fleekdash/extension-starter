import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "../../internal";

/**
 * @typedef {Object} ScrollAreaProps
 * @property {string} [className] - Optional CSS class name
 * @property {React.ReactNode} [children] - Child elements
 */

/**
 * ScrollArea component with a custom scrollbar
 * @type {React.ForwardRefExoticComponent<ScrollAreaProps & React.RefAttributes<HTMLDivElement>>}
 */
const ScrollArea = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}>
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  ),
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

/**
 * @typedef {Object} ScrollBarProps
 * @property {string} [className] - Optional CSS class name
 * @property {'vertical' | 'horizontal'} [orientation='vertical'] - Orientation of the scrollbar
 */

/**
 * Custom scrollbar component for the ScrollArea
 * @type {React.ForwardRefExoticComponent<ScrollBarProps & React.RefAttributes<HTMLDivElement>>}
 */
const ScrollBar = React.forwardRef(
  ({ className, orientation = "vertical", ...props }, ref) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "flex touch-none transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-s border-s-transparent p-px",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent p-px",
        className,
      )}
      {...props}>
      <ScrollAreaPrimitive.ScrollAreaThumb className="bg-border relative flex-1 rounded-full" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  ),
);
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
