import { Icon } from "../../atoms/Icon";
import { cn } from "../../internal";
import type { SearchablePopoverItem } from "./searchable-popover-types";

const ITEM_BUTTON_CLASS = cn(
  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm",
  "hover:bg-muted/50 active:bg-muted",
  "transition-colors duration-150",
  "text-start",
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
  "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
);

export function SearchablePopoverItemButton({
  item,
  handleItemSelect,
}: Readonly<{
  item: SearchablePopoverItem;
  handleItemSelect: (item: SearchablePopoverItem) => void;
}>) {
  return (
    <button
      type="button"
      data-field-focus=""
      disabled={item.disabled}
      aria-pressed={item.checked}
      onClick={() => handleItemSelect(item)}
      className={cn(ITEM_BUTTON_CLASS, item.className)}>
      {item.icon ? (
        <Icon name={item.icon} className="h-4 w-4 shrink-0" />
      ) : null}
      <span className="flex-1">{item.label}</span>
      {item.checked ? (
        <Icon name="check" className="text-primary h-4 w-4 shrink-0" />
      ) : null}
    </button>
  );
}
