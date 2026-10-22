/**
 * Textarea Component - V2.2
 *
 * Multi-line text input with auto-resize and validation.
 * Migrated from V2 with all features preserved.
 *
 * @version 2.2.0
 */

import * as React from "react";

import { FIELD_FOCUS_CONTROL } from "../../foundations/focus";
import { cn } from "../../internal";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground/70 text-card-foreground flex min-h-19.5 w-full resize-none rounded-md border bg-(--input-bg) px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50",
        FIELD_FOCUS_CONTROL,
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
