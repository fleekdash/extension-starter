/**
 * ContextMenu Component - Radix UI right-click context menu
 *
 * Use for right-click menus (e.g. media grid, file lists).
 * Styled to match DropdownMenu for consistency.
 *
 * @version 2.3.2
 */
"use client";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import * as React from "react";
import { OVERLAY_CONTENT_Z_ABOVE_DRAWER } from "../../internal";
import { cn } from "../../internal";

function ContextMenu({
  ...props
}: Readonly<React.ComponentProps<typeof ContextMenuPrimitive.Root>>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuTrigger({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  );
}

function ContextMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 min-w-40 overflow-hidden rounded-lg border p-2 shadow-xl",
          OVERLAY_CONTENT_Z_ABOVE_DRAWER,
          className,
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
}

function ContextMenuItem({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  variant?: "default" | "destructive";
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-variant={variant}
      className={cn(
        "focus:bg-muted focus:text-card-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:font-medium data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function ContextMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label>) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      className={cn(
        "text-muted-foreground px-2 py-1.5 text-xs font-medium",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuSub(
  props: Readonly<React.ComponentProps<typeof ContextMenuPrimitive.Sub>>,
) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;
}

function ContextMenuSubTrigger({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger>) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      className={cn(
        "focus:bg-muted focus:text-card-foreground data-[state=open]:bg-muted data-[state=open]:text-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:font-medium data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.SubContent
        data-slot="context-menu-sub-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 min-w-40 overflow-hidden rounded-lg border p-2 shadow-xl",
          OVERLAY_CONTENT_Z_ABOVE_DRAWER,
          className,
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
};
