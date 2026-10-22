import { Icon } from "../../atoms/Icon";

export function SearchablePopoverEmptyState({
  emptyIcon,
  emptyMessage,
  emptyDescription,
}: Readonly<{
  emptyIcon: string;
  emptyMessage: string;
  emptyDescription: string;
}>) {
  return (
    <div className="flex items-center justify-center px-3 py-8">
      <div className="flex max-w-[260px] flex-col items-center text-center">
        <div className="bg-muted/40 border-border mb-3 grid size-9 place-items-center rounded-lg border">
          <Icon name={emptyIcon} className="text-muted-foreground size-4" />
        </div>
        <p className="text-foreground text-sm font-medium">{emptyMessage}</p>
        <p className="text-muted-foreground mt-1 text-xs">{emptyDescription}</p>
      </div>
    </div>
  );
}
