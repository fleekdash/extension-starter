/**
 * Field — canonical "label above control" wrapper for settings/forms.
 *
 * Owns the label-to-control gap so popover/select/input fields render the
 * same spacing everywhere. Renders exactly the field pattern used across
 * settings (`space-y-2` + shared `Label` + optional hint); for
 * react-hook-form contexts use the `Form`/`FormItem` family instead.
 */
import type { ReactNode } from "react";

import { Label } from "../../organisms/Label";
import { cn } from "../../internal";

export interface FieldProps {
  readonly label?: ReactNode;
  readonly htmlFor?: string;
  readonly hint?: ReactNode;
  readonly className?: string;
  readonly children: ReactNode;
}

export function Field({
  label,
  htmlFor,
  hint,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label ? <Label htmlFor={htmlFor}>{label}</Label> : null}
      {children}
      {hint ? <p className="text-muted-foreground text-xs">{hint}</p> : null}
    </div>
  );
}
