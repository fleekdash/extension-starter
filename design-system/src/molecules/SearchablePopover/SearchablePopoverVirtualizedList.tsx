import { cn } from "../../internal";
import { useVirtualizer } from "@tanstack/react-virtual";
import * as React from "react";
import { SearchablePopoverItemButton } from "./SearchablePopoverItemButton";
import type { SearchablePopoverItem } from "./searchable-popover-types";

interface VirtualizedListProps {
  readonly filteredItems: SearchablePopoverItem[];
  readonly itemsClassName?: string;
  readonly renderItem?: (
    item: SearchablePopoverItem,
    index: number,
  ) => React.ReactNode;
  readonly handleItemSelect: (item: SearchablePopoverItem) => void;
  readonly virtualItemHeight: number;
  readonly virtualOverscan: number;
  readonly isLoading: boolean;
  readonly loadingSkeleton: React.ReactNode;
  readonly emptyStateContent: React.ReactNode;
}

/**
 * Virtualized list wrapper — TanStack Virtual's hook conflicts with React Compiler memoization rules.
 */
export function SearchablePopoverVirtualizedList({
  filteredItems,
  itemsClassName,
  renderItem,
  handleItemSelect,
  virtualItemHeight,
  virtualOverscan,
  isLoading,
  loadingSkeleton,
  emptyStateContent,
}: VirtualizedListProps) {
  const listScrollRef = React.useRef<HTMLDivElement | null>(null);
  const hasRows = filteredItems.length > 0;
  const virtualizerEnabled = !isLoading && hasRows;

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Virtual returns unstable function refs; isolated here
  const rowVirtualizer = useVirtualizer({
    count: filteredItems.length,
    getScrollElement: () => listScrollRef.current,
    estimateSize: () => virtualItemHeight,
    overscan: virtualOverscan,
    enabled: virtualizerEnabled,
  });

  const scrollAreaClass = "min-h-0 flex-1 overflow-y-auto";

  if (isLoading) {
    return <div className={scrollAreaClass}>{loadingSkeleton}</div>;
  }

  if (!hasRows) {
    return <div className={scrollAreaClass}>{emptyStateContent}</div>;
  }

  const listHeight = rowVirtualizer.getTotalSize();

  return (
    <div ref={listScrollRef} className={scrollAreaClass}>
      <ul
        className={cn("relative m-0 list-none p-1.5", itemsClassName)}
        style={{ height: listHeight }}>
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const item = filteredItems[virtualItem.index];
          if (!item) {
            return null;
          }

          const rowStyle: React.CSSProperties = {
            height: virtualItem.size,
            transform: `translateY(${virtualItem.start}px)`,
          };

          return (
            <li
              key={item.id}
              className="absolute start-0 top-0 w-full"
              style={rowStyle}>
              {renderItem ? (
                renderItem(
                  {
                    ...item,
                    onClick: () => handleItemSelect(item),
                  },
                  virtualItem.index,
                )
              ) : (
                <SearchablePopoverItemButton
                  item={item}
                  handleItemSelect={handleItemSelect}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
