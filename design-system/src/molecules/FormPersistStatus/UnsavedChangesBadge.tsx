"use client";

import { Badge } from "../../atoms/Badge";
import { getUnsavedChangesLabel } from "./persist-status-text";

interface UnsavedChangesBadgeProps {
  readonly visible: boolean;
}

export function UnsavedChangesBadge({ visible }: UnsavedChangesBadgeProps) {
  if (!visible) {
    return null;
  }

  return (
    <Badge
      variant="outline"
      className="border-orange-500/20 bg-orange-500/10 px-2 py-0.5 text-[11px] leading-none font-medium text-orange-600 dark:text-orange-400"
      aria-live="polite">
      {getUnsavedChangesLabel()}
    </Badge>
  );
}
