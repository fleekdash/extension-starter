/**
 * SearchablePopover Component - V2.2
 *
 * Popover with integrated search functionality.
 * Migrated from V2 with all features preserved.
 *
 * @version 2.2.0
 */
"use client";

import { Input } from "../../organisms/Input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../molecules/Popover";
import {
  translateSearchablePopoverEmptyDescription,
  translateSearchablePopoverEmptyMessage,
  translateSearchablePopoverPlaceholder,
} from "./searchable-popover-text";
import { cn } from "../../internal";
import { useDebounce } from "../../internal";
import * as React from "react";
import { SearchablePopoverEmptyState } from "./SearchablePopoverEmptyState";
import { SearchablePopoverLoadingSkeleton } from "./SearchablePopoverLoadingSkeleton";
import { SearchablePopoverScrollList } from "./SearchablePopoverScrollList";
import { SearchablePopoverVirtualizedList } from "./SearchablePopoverVirtualizedList";
import {
  buildSearchablePopoverPanelStyle,
  getSearchablePopoverPanelClassName,
} from "./searchable-popover-layout";
import {
  SCROLL_LIST_ITEM_THRESHOLD,
  type SearchablePopoverItem,
  type SearchablePopoverProps,
} from "./searchable-popover-types";

export type {
  SearchablePopoverItem,
  SearchablePopoverProps,
} from "./searchable-popover-types";

/**
 * Searchable Popover Component
 *
 * A high-performance popover with built-in search and scroll functionality.
 * Ideal for dropdown menus with many items or filterable options.
 */
export const SearchablePopover = React.forwardRef<
  HTMLDivElement,
  SearchablePopoverProps
>(
  (
    {
      trigger,
      items,
      searchPlaceholder = "Search...",
      maxHeight = "338px",
      width = "240px",
      matchTriggerWidth = false,
      align = "start",
      side = "bottom",
      closeOnMouseLeave = false,
      closeDelay = 200,
      open: controlledOpen,
      onOpenChange: controlledOnOpenChange,
      filterFn,
      onSearch,
      emptyMessage = "No items found",
      emptyDescription = "Try a different search term.",
      emptyIcon = "searchX",
      showSearch = true,
      contentClassName,
      itemsClassName,
      renderItem,
      closeOnSelect = true,
      enableVirtualization = false,
      isLoading = false,
      loadingRows = 6,
      virtualizationThreshold = 50,
      virtualItemHeight = 40,
      virtualOverscan = 8,
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;
    const setOpen = controlledOnOpenChange || setInternalOpen;

    const defaultFilterFn = React.useCallback(
      (item: SearchablePopoverItem, query: string) => {
        return item.label.toLowerCase().includes(query.toLowerCase());
      },
      [],
    );

    const filter = filterFn || defaultFilterFn;
    const contentWidth = matchTriggerWidth
      ? "var(--radix-popover-trigger-width)"
      : width;

    // When onSearch is provided, items are server-driven — do not also filter locally
    // (that would hide API matches that aren't in the previous page of results).
    const filteredItems = React.useMemo(() => {
      if (onSearch || !searchQuery) return items;
      return items.filter((item) => filter(item, searchQuery));
    }, [items, searchQuery, filter, onSearch]);

    const shouldVirtualize =
      enableVirtualization && filteredItems.length >= virtualizationThreshold;

    const useScrollArea =
      shouldVirtualize ||
      isLoading ||
      filteredItems.length > SCROLL_LIST_ITEM_THRESHOLD ||
      (showSearch && filteredItems.length > 5);

    const contentPanelStyle = buildSearchablePopoverPanelStyle(maxHeight);
    const localizedSearchPlaceholder =
      translateSearchablePopoverPlaceholder(searchPlaceholder);
    const localizedEmptyMessage =
      translateSearchablePopoverEmptyMessage(emptyMessage);
    const localizedEmptyDescription =
      translateSearchablePopoverEmptyDescription(emptyDescription);

    React.useEffect(() => {
      if (!open) {
        setSearchQuery("");
      }
    }, [open]);

    React.useEffect(() => {
      if (!onSearch || !open) {
        return;
      }
      onSearch(debouncedSearchQuery);
    }, [debouncedSearchQuery, onSearch, open]);

    const handleItemSelect = React.useCallback(
      (item: SearchablePopoverItem) => {
        if (item.disabled) return;
        item.onClick();
        if (closeOnSelect) {
          setOpen(false);
        }
      },
      [setOpen, closeOnSelect],
    );

    const loadingSkeleton = (
      <SearchablePopoverLoadingSkeleton
        loadingRows={loadingRows}
        itemsClassName={itemsClassName}
      />
    );

    const emptyStateContent = (
      <SearchablePopoverEmptyState
        emptyIcon={emptyIcon}
        emptyMessage={localizedEmptyMessage}
        emptyDescription={localizedEmptyDescription}
      />
    );

    const listSection = shouldVirtualize ? (
      <SearchablePopoverVirtualizedList
        filteredItems={filteredItems}
        itemsClassName={itemsClassName}
        renderItem={renderItem}
        handleItemSelect={handleItemSelect}
        virtualItemHeight={virtualItemHeight}
        virtualOverscan={virtualOverscan}
        isLoading={isLoading}
        loadingSkeleton={loadingSkeleton}
        emptyStateContent={emptyStateContent}
      />
    ) : (
      <SearchablePopoverScrollList
        filteredItems={filteredItems}
        itemsClassName={itemsClassName}
        renderItem={renderItem}
        handleItemSelect={handleItemSelect}
        isLoading={isLoading}
        loadingSkeleton={loadingSkeleton}
        emptyStateContent={emptyStateContent}
        useScrollArea={useScrollArea}
      />
    );

    const popoverContentStyle: React.CSSProperties = {
      width: contentWidth,
      maxHeight,
    };

    return (
      <Popover
        open={open}
        onOpenChange={setOpen}
        closeOnMouseLeave={closeOnMouseLeave}
        closeDelay={closeDelay}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent
          ref={ref}
          align={align}
          side={side}
          style={popoverContentStyle}
          className={cn("p-0", contentClassName)}>
          <div
            className={getSearchablePopoverPanelClassName(useScrollArea)}
            style={contentPanelStyle}>
            {showSearch &&
            (Boolean(onSearch) || items.length > 0 || isLoading) ? (
              <div className="shrink-0 border-b p-2">
                <Input
                  type="search"
                  placeholder={localizedSearchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  prefixIcon="search"
                  variant="sm"
                  className="h-8"
                  autoFocus
                />
              </div>
            ) : null}
            {listSection}
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);

SearchablePopover.displayName = "SearchablePopover";
