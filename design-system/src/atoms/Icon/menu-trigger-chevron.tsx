import { cn } from "../../internal";
import { Icon } from "./iconify";

/** Shared menu/dropdown trigger chevron — use instead of raw `opacity-50` on icons. */
export const MENU_TRIGGER_CHEVRON_CLASS = "shrink-0 text-muted-foreground";

export function MenuTriggerChevron({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <Icon
      name="chevronDown"
      className={cn("h-3 w-3", MENU_TRIGGER_CHEVRON_CLASS, className)}
      aria-hidden
    />
  );
}
