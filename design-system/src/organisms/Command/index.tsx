/**
 * Command Component - V2.2
 *
 * Command palette/menu component with search and keyboard navigation.
 * Uses CMDK library with 9 sub-components.
 *
 * @version 2.2.0
 */

"use client";

import { Icon } from "../../atoms/Icon";
import { Command as CommandPrimitive } from "cmdk";
import * as React from "react";

import { cn } from "../../internal";

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-card text-popover-foreground scrollbar-custom flex h-full w-full flex-col overflow-hidden rounded-md",
        className,
      )}
      {...props}
    />
  );
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentProps<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => {
  return (
    <div
      className="border-input scrollbar-custom flex items-center border-b px-5"
      data-slot="cmdk-input-wrapper">
      <Icon name="search" className="text-muted-foreground/80 me-3" />
      <CommandPrimitive.Input
        ref={ref}
        data-slot="command-input"
        data-field-focus-plain=""
        className={cn(
          "placeholder:text-muted-foreground flex h-11 w-full rounded-md border-0 bg-transparent py-3 text-sm shadow-none outline-none focus:border-0 focus:shadow-none focus-visible:border-0 focus-visible:shadow-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  );
});
CommandInput.displayName = "CommandInput";
function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[50vh] overflow-x-hidden overflow-y-auto",
        className,
      )}
      {...props}
    />
  );
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground **:[[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-2 **:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:py-2 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium",
        className,
      )}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  );
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:bg-accent/10 data-[selected=true]:text-card-foreground relative flex items-center gap-3 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <kbd
      data-slot="command-shortcut"
      className={cn(
        "bg-background text-muted-foreground/70 ms-auto -me-1 inline-flex h-5 max-h-full items-center rounded-sm border px-1 font-[inherit] text-[0.625rem] font-medium",
        className,
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
