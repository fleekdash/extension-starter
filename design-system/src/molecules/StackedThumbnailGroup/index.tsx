"use client";

import { Icon } from "../../atoms/Icon";
import { cn } from "../../internal";
import { forwardRef, useCallback, useState, type ReactNode } from "react";

export interface StackedThumbnailItem {
  readonly key?: string;
  readonly src?: string;
  readonly alt?: string;
}

export type StackedThumbnailLayout = "stacked" | "inline";

interface StackedThumbnailGroupProps {
  readonly items: StackedThumbnailItem[];
  readonly maxVisible?: number;
  readonly totalCount?: number;
  readonly showOverflowCount?: boolean;
  readonly size?: "xs" | "sm";
  /** stacked = overlapping thumbs; inline = side-by-side with gap */
  readonly layout?: StackedThumbnailLayout;
  readonly className?: string;
  readonly renderItemWrapper?: (
    item: StackedThumbnailItem,
    index: number,
    children: ReactNode,
  ) => ReactNode;
}

const THUMB_SIZE_CLASS = {
  xs: "size-6 text-[9px]",
  sm: "size-7 text-[10px]",
} as const;

const OVERFLOW_ICON_CLASS = {
  xs: "size-3",
  sm: "size-3.5",
} as const;

const THUMB_FRAME_CLASS =
  "relative shrink-0 overflow-hidden rounded-md border border-border bg-background";

const OVERFLOW_BADGE_CLASS =
  "border border-border bg-background text-foreground flex shrink-0 items-center justify-center rounded-md font-semibold tabular-nums";

interface StackedThumbnailProps {
  readonly item: StackedThumbnailItem;
  readonly size: "xs" | "sm";
  readonly className?: string;
}

const StackedThumbnail = forwardRef<HTMLDivElement, StackedThumbnailProps>(
  function StackedThumbnail({ item, size, className }, ref) {
    const [hasImageError, setHasImageError] = useState(false);
    const normalizedSrc = item.src?.trim() || undefined;
    const showImage = Boolean(normalizedSrc) && !hasImageError;

    const handleImageError = useCallback(() => {
      setHasImageError(true);
    }, []);

    return (
      <div
        ref={ref}
        className={cn(
          THUMB_FRAME_CLASS,
          "hover:border-foreground/25 transition-shadow hover:z-10",
          THUMB_SIZE_CLASS[size],
          className,
        )}
        title={item.alt}>
        {showImage ? (
          <img
            src={normalizedSrc}
            alt={item.alt || ""}
            className="size-full object-cover"
            loading="lazy"
            onError={handleImageError}
          />
        ) : (
          <div className="bg-muted text-muted-foreground flex size-full items-center justify-center">
            <Icon
              name="product"
              className={OVERFLOW_ICON_CLASS[size]}
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    );
  },
);
StackedThumbnail.displayName = "StackedThumbnail";

export function StackedThumbnailGroup({
  items,
  maxVisible = 4,
  totalCount,
  showOverflowCount = true,
  size = "sm",
  layout = "stacked",
  className,
  renderItemWrapper,
}: Readonly<StackedThumbnailGroupProps>) {
  const visibleItems = items.slice(0, maxVisible);
  const resolvedTotal = totalCount ?? items.length;
  const remainingCount = Math.max(0, resolvedTotal - visibleItems.length);
  const isStacked = layout === "stacked";

  return (
    <div
      className={cn(
        "flex items-center",
        isStacked ? undefined : "gap-1",
        className,
      )}>
      {visibleItems.map((item, index) => {
        const itemKey = item.key || item.alt || `thumbnail-${index}`;
        const thumb = (
          <StackedThumbnail
            item={item}
            size={size}
            className={isStacked && index > 0 ? "-ms-1.5" : undefined}
          />
        );

        const wrapped = renderItemWrapper
          ? renderItemWrapper(item, index, thumb)
          : thumb;

        return (
          <div
            key={itemKey}
            className="relative shrink-0"
            style={
              isStacked ? { zIndex: visibleItems.length - index } : undefined
            }>
            {wrapped}
          </div>
        );
      })}

      {remainingCount > 0 && showOverflowCount ? (
        <div
          className={cn(
            OVERFLOW_BADGE_CLASS,
            THUMB_SIZE_CLASS[size],
            isStacked && visibleItems.length > 0 && "-ms-1.5",
          )}
          style={isStacked ? { zIndex: 0 } : undefined}
          title={`+${remainingCount}`}
          aria-label={`+${remainingCount}`}>
          +{remainingCount}
        </div>
      ) : null}
    </div>
  );
}
