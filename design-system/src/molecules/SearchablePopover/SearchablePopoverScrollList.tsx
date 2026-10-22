import { ScrollArea } from "../../molecules/ScrollArea";
import { cn } from "../../internal";
import type * as React from "react";
import { SearchablePopoverItemButton } from "./SearchablePopoverItemButton";
import type { SearchablePopoverItem } from "./searchable-popover-types";

function SearchablePopoverItemsList({
  filteredItems,
  itemsClassName,
  renderItem,
  handleItemSelect,
  emptyStateContent,
}: Readonly<{
  filteredItems: SearchablePopoverItem[];
  itemsClassName?: string;
  renderItem?: (item: SearchablePopoverItem, index: number) => React.ReactNode;
  handleItemSelect: (item: SearchablePopoverItem) => void;
  emptyStateContent: React.ReactNode;
}>) {
  const hasRows = filteredItems.length > 0;

  return (
    <ul className={cn("m-0 list-none p-1.5", itemsClassName)}>
      {hasRows ? (
        filteredItems.map((item, index) => (
          <li key={item.id}>
            {renderItem ? (
              renderItem(
                {
                  ...item,
                  onClick: () => handleItemSelect(item),
                },
                index,
              )
            ) : (
              <SearchablePopoverItemButton
                item={item}
                handleItemSelect={handleItemSelect}
              />
            )}
          </li>
        ))
      ) : (
        <li>{emptyStateContent}</li>
      )}
    </ul>
  );
}

interface ScrollAreaListProps {
  readonly filteredItems: SearchablePopoverItem[];
  readonly itemsClassName?: string;
  readonly renderItem?: (
    item: SearchablePopoverItem,
    index: number,
  ) => React.ReactNode;
  readonly handleItemSelect: (item: SearchablePopoverItem) => void;
  readonly isLoading: boolean;
  readonly loadingSkeleton: React.ReactNode;
  readonly emptyStateContent: React.ReactNode;
  readonly useScrollArea: boolean;
}

export function SearchablePopoverScrollList({
  filteredItems,
  itemsClassName,
  renderItem,
  handleItemSelect,
  isLoading,
  loadingSkeleton,
  emptyStateContent,
  useScrollArea,
}: ScrollAreaListProps) {
  if (isLoading) {
    if (useScrollArea) {
      return (
        <ScrollArea className="min-h-0 flex-1 overflow-hidden">
          {loadingSkeleton}
        </ScrollArea>
      );
    }
    return loadingSkeleton;
  }

  const list = (
    <SearchablePopoverItemsList
      filteredItems={filteredItems}
      itemsClassName={itemsClassName}
      renderItem={renderItem}
      handleItemSelect={handleItemSelect}
      emptyStateContent={emptyStateContent}
    />
  );

  if (!useScrollArea) {
    return list;
  }

  return (
    <ScrollArea className="min-h-0 flex-1 overflow-hidden">{list}</ScrollArea>
  );
}
