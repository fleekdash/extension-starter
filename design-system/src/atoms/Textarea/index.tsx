import * as React from "react";

import { FIELD_FOCUS_CONTROL } from "../../foundations/focus";
import { cn } from "../../internal";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentPropsWithoutRef<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "border-input placeholder:text-muted-foreground flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs disabled:cursor-not-allowed disabled:opacity-50",
        FIELD_FOCUS_CONTROL,
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
