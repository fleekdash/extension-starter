"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import * as React from "react";

import { cn } from "../../internal";

function HoverCard({
  ...props
}: Readonly<React.ComponentProps<typeof HoverCardPrimitive.Root>>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  );
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  showArrow = false,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content> & {
  showArrow?: boolean;
}) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-card text-card-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1 z-10050 w-64 rounded-md border p-4 text-start shadow-lg outline-hidden duration-200 ease-out data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-left data-[side=top]:origin-bottom",
          className,
        )}
        {...props}>
        {props.children}
        {showArrow && (
          <HoverCardPrimitive.Arrow className="fill-card -my-px drop-shadow-[0_1px_0_var(--border)]" />
        )}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardContent, HoverCardTrigger };
