import { cn } from "../../internal";
import type * as React from "react";

export function buildSearchablePopoverPanelStyle(
  maxHeight: string,
): React.CSSProperties {
  return { maxHeight };
}

export function getSearchablePopoverPanelClassName(
  useScrollArea: boolean,
): string {
  return cn("flex flex-col", useScrollArea && "min-h-0 overflow-hidden");
}
