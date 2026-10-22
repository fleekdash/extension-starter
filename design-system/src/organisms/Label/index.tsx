"use client";

/**
 * Label Component - V2.2
 *
 * Form label with smart margin handling.
 * Migrated from V2 with all features preserved.
 *
 * @version 2.2.0
 */

import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";

import { cn } from "../../internal";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  // Check if this label is for a switch or checkbox (no margin needed)
  const isSwitchLabel =
    className?.includes("switch") ||
    props.htmlFor?.includes("active-") ||
    props.htmlFor?.includes("is_active");
  const isCheckboxLabel =
    props.htmlFor?.includes("remember") ||
    className?.includes("checkbox") ||
    className?.includes("no-margin");

  if (isSwitchLabel || isCheckboxLabel) {
    // No wrapper div for switch labels to maintain alignment
    return (
      <LabelPrimitive.Root
        data-slot="label"
        className={cn(
          "text-foreground data-[disabled=true]:group:pointer-events-none data-[disabled=true]:group:opacity-50 disabled:peer:cursor-not-allowed disabled:peer:opacity-50 text-sm leading-4 font-medium select-none",
          className,
        )}
        {...props}
      />
    );
  }

  // Regular labels get margin bottom
  return (
    <div style={{ marginBottom: "4px" }}>
      <LabelPrimitive.Root
        data-slot="label"
        className={cn(
          "text-foreground data-[disabled=true]:group:pointer-events-none data-[disabled=true]:group:opacity-50 disabled:peer:cursor-not-allowed disabled:peer:opacity-50 text-sm leading-4 font-medium select-none",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { Label };
