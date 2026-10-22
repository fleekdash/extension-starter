/**
 * Tabs Component - V2.2
 *
 * Accessible tabs using Radix UI primitives.
 * Migrated from V2 with all features preserved.
 *
 * @version 2.2.0
 */

"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "../../internal";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-card text-muted-foreground border-border inline-flex w-fit items-center justify-center rounded-lg border p-1 shadow-(--shadow-xs)",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      data-field-focus=""
      className={cn(
        "text-muted-foreground hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:hover:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap outline-hidden transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-xs [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-hidden", className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
