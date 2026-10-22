import { Skeleton } from "../../atoms/Skeleton";
import { cn } from "../../internal";
import { LOADING_SKELETON_KEYS } from "./searchable-popover-types";

export function SearchablePopoverLoadingSkeleton({
  loadingRows,
  itemsClassName,
}: Readonly<{
  loadingRows: number;
  itemsClassName?: string;
}>) {
  const rowKeys = LOADING_SKELETON_KEYS.slice(
    0,
    Math.min(loadingRows, LOADING_SKELETON_KEYS.length),
  );

  return (
    <ul className={cn("m-0 list-none p-1.5", itemsClassName)}>
      {rowKeys.map((key) => (
        <li key={key} className="px-3 py-2">
          <div className="flex items-center gap-3">
            <Skeleton className="size-6 rounded-full" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="h-3 w-3/5" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
