/**
 * MasonryGrid - Pinterest-style masonry layout (CSS columns)
 *
 * Reusable, zero-deps, responsive. Each child wrapped with break-inside:avoid.
 *
 * @package FleekDash
 * @since 2.4.0
 */

import { memo, Children } from "react";
import { cn } from "../../internal";

export interface MasonryGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4 | 5 | 6;
  gap?: 4 | 6 | 8;
  className?: string;
}

const COLUMN_CLASSES: Record<number, string> = {
  2: "columns-2",
  3: "columns-2 sm:columns-3",
  4: "columns-2 sm:columns-3 md:columns-4",
  5: "columns-2 sm:columns-3 md:columns-4 lg:columns-5",
  6: "columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6",
};

export const MasonryGrid = memo(function MasonryGrid({
  children,
  columns = 4,
  gap = 4,
  className,
}: MasonryGridProps) {
  const gapRem = gap === 4 ? "1rem" : gap === 6 ? "1.5rem" : "2rem";

  return (
    <div
      className={cn(COLUMN_CLASSES[columns], className)}
      style={{
        columnGap: gapRem,
      }}>
      {Children.map(children, (child, i) =>
        child != null ? (
          <div
            key={(child as React.ReactElement)?.key ?? i}
            className="break-inside-avoid [page-break-inside:avoid]"
            style={{ marginBottom: gapRem }}>
            {child}
          </div>
        ) : null,
      )}
    </div>
  );
});
