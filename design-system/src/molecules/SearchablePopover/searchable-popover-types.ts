import type * as React from "react";

export interface SearchablePopoverItem {
  id: string;
  label: string;
  icon?: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  /** Selected marker for multi-select usage (renders a check). */
  checked?: boolean;
  /** Additional metadata for custom rendering */
  metadata?: Record<string, unknown>;
}

export interface SearchablePopoverProps {
  /** Trigger element */
  trigger: React.ReactNode;
  /** Array of items to display */
  items: SearchablePopoverItem[];
  /** Placeholder for search input */
  searchPlaceholder?: string;
  /** Max height for the content area */
  maxHeight?: string;
  /** Width of the popover */
  width?: string;
  /** Match popover width to trigger width */
  matchTriggerWidth?: boolean;
  /** Alignment of the popover */
  align?: "start" | "center" | "end";
  /** Side of the trigger to show popover */
  side?: "top" | "right" | "bottom" | "left";
  /** Enable close on mouse leave */
  closeOnMouseLeave?: boolean;
  /** Delay before closing on mouse leave */
  closeDelay?: number;
  /** Open state controlled externally */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Custom filter function */
  filterFn?: (item: SearchablePopoverItem, query: string) => boolean;
  /** Callback when search query changes (for external filtering/API). When set, local item filtering is skipped. */
  onSearch?: (query: string) => void;
  /** Message to show when no items match search */
  emptyMessage?: string;
  /** Optional description under empty message */
  emptyDescription?: string;
  /** Icon shown in empty state */
  emptyIcon?: string;
  /** Show search input */
  showSearch?: boolean;
  /** Custom class for the popover content */
  contentClassName?: string;
  /** Custom class for the items container */
  itemsClassName?: string;
  /** Custom render function for items */
  renderItem?: (item: SearchablePopoverItem, index: number) => React.ReactNode;
  /** Keep the popover open after an item is selected (multi-select pickers). */
  readonly closeOnSelect?: boolean;
  /** Enable list virtualization for large datasets */
  enableVirtualization?: boolean;
  /** Loading state for async item sources */
  isLoading?: boolean;
  /** Number of loading skeleton rows */
  loadingRows?: number;
  /** Minimum item count before virtualization kicks in */
  virtualizationThreshold?: number;
  /** Estimated row height for virtualization */
  virtualItemHeight?: number;
  /** Overscan rows for virtualization */
  virtualOverscan?: number;
}

/** Item count above which the list uses a scroll container capped at maxHeight. */
export const SCROLL_LIST_ITEM_THRESHOLD = 8;

/** Stable keys for skeleton rows (Sonar: avoid array index as key). */
export const LOADING_SKELETON_KEYS = [
  "searchable-popover-skel-1",
  "searchable-popover-skel-2",
  "searchable-popover-skel-3",
  "searchable-popover-skel-4",
  "searchable-popover-skel-5",
  "searchable-popover-skel-6",
  "searchable-popover-skel-7",
  "searchable-popover-skel-8",
  "searchable-popover-skel-9",
  "searchable-popover-skel-10",
  "searchable-popover-skel-11",
  "searchable-popover-skel-12",
] as const;
