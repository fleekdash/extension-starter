/**
 * IconPicker — theme icon-map picker (Solar/Lucide via active iconLibrary).
 *
 * Values are icons-map keys (e.g. "users"), never raw `lucide:…` / `solar:…` ids.
 */
"use client";

import { Icon, MenuTriggerChevron } from "../../atoms/Icon";
import { Button } from "../../organisms/Button";
import { Input } from "../../organisms/Input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../molecules/Popover";
import { ScrollArea } from "../../molecules/ScrollArea";
import { Switch } from "../../molecules/Switch";
import { cn } from "../../internal";
import {
  getIconPickerNoResultsLabel,
  getIconPickerResetLabel,
  getIconPickerSearchPlaceholder,
  getIconPickerSelectPlaceholder,
  getIconPickerShowIconLabel,
} from "./icon-picker-text";
import {
  filterIconMapPickerEntries,
  getIconMapPickerEntries,
  isIconMapPickerKey,
} from "./icon-picker-map-entries";
import { useMemo, useState } from "react";

const ICON_MAP_ENTRIES = getIconMapPickerEntries();

interface IconPickerProps {
  readonly value?: string;
  readonly onChange: (value: string) => void;
  readonly placeholder?: string;
  readonly className?: string;
  /** Compact square trigger for dense UIs (e.g. Menu Manager rows). */
  readonly triggerVariant?: "default" | "icon-only";
  /** Icon shown in icon-only mode when `value` is empty. */
  readonly emptyPreviewName?: string;
  readonly title?: string;
  /** Clears the selection back to the caller default. Shown only when a map key is selected. */
  readonly onClear?: () => void;
  /** When false, the grid is faded but still selectable. Selecting an icon turns this on. */
  readonly iconEnabled?: boolean;
  readonly onIconEnabledChange?: (enabled: boolean) => void;
  /** Smaller square trigger (h-6, h-3 glyph) for nested submenu rows. */
  readonly compactIconTrigger?: boolean;
  /** Renders the trigger as a native disabled button — unfocusable and inert for keyboard too. */
  readonly disabled?: boolean;
}

export function IconPicker({
  value,
  onChange,
  placeholder = getIconPickerSelectPlaceholder(),
  className,
  triggerVariant = "default",
  emptyPreviewName = "default",
  title,
  onClear,
  iconEnabled = true,
  onIconEnabledChange,
  compactIconTrigger = false,
  disabled = false,
}: Readonly<IconPickerProps>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredIcons = useMemo(
    () => filterIconMapPickerEntries(ICON_MAP_ENTRIES, search),
    [search],
  );

  const selectedIcon = useMemo(
    () => ICON_MAP_ENTRIES.find((icon) => icon.value === value),
    [value],
  );

  const previewName = selectedIcon?.value || emptyPreviewName;
  const isIconOnly = triggerVariant === "icon-only";
  const iconOnlyTriggerClass = compactIconTrigger
    ? "hover:bg-muted text-card-foreground h-6 w-6 shrink-0 p-0"
    : "hover:bg-muted text-card-foreground h-8 w-8 shrink-0 p-0";
  const iconOnlyGlyphClass = compactIconTrigger ? "h-3 w-3" : "h-4 w-4";

  const handleSelect = (iconValue: string) => {
    if (!iconEnabled) {
      onIconEnabledChange?.(true);
    }
    onChange(iconValue);
    setOpen(false);
    setSearch("");
  };

  const handleClear = () => {
    onClear?.();
    setOpen(false);
    setSearch("");
  };

  const showClearAction = Boolean(onClear) && isIconMapPickerKey(value);
  const showEnabledSwitch = typeof onIconEnabledChange === "function";
  const previewFaded = !iconEnabled;

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setSearch("");
    }
  };

  const renderTriggerContent = () => {
    if (isIconOnly) {
      return (
        <Icon
          name={previewName}
          className={cn(iconOnlyGlyphClass, previewFaded && "opacity-40")}
        />
      );
    }

    return (
      <>
        <div className="flex min-w-0 items-center gap-2">
          {selectedIcon ? (
            <>
              <Icon name={selectedIcon.value} className="h-4 w-4 shrink-0" />
              <span className="truncate">{selectedIcon.label}</span>
            </>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <MenuTriggerChevron className="ms-2 h-4 w-4" />
      </>
    );
  };

  const renderIconGrid = () => {
    if (filteredIcons.length === 0) {
      return (
        <div className="text-muted-foreground px-2 py-8 text-center text-sm">
          {getIconPickerNoResultsLabel()}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-8 gap-1.5 p-2 pe-3">
        {filteredIcons.map((icon) => (
          <button
            key={icon.value}
            type="button"
            onPointerDown={(event) => {
              event.stopPropagation();
            }}
            onClick={() => handleSelect(icon.value)}
            className={cn(
              "hover:bg-muted flex aspect-square w-full items-center justify-center rounded-lg border-2 transition-colors",
              !iconEnabled && "opacity-40",
              value === icon.value
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50",
            )}>
            <Icon name={icon.value} className="h-4 w-4 shrink-0" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          title={title}
          disabled={disabled}
          size={isIconOnly ? "sm" : undefined}
          radius={isIconOnly ? "md" : undefined}
          className={cn(
            isIconOnly ? iconOnlyTriggerClass : "w-full justify-between",
            className,
          )}
          onPointerDown={(event) => {
            // Keep DnD sensors on parent rows from stealing the click.
            event.stopPropagation();
          }}>
          {renderTriggerContent()}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-96 p-0"
        align="start"
        onPointerDown={(event) => {
          event.stopPropagation();
        }}
        onOpenAutoFocus={(event) => {
          event.preventDefault();
        }}>
        <div className="flex flex-col">
          {showEnabledSwitch ? (
            <div className="flex items-center justify-between gap-2 border-b px-3 py-2">
              <span className="text-sm">{getIconPickerShowIconLabel()}</span>
              <Switch
                size="sm"
                checked={iconEnabled}
                onPointerDown={(event) => {
                  event.stopPropagation();
                }}
                onCheckedChange={(checked) => {
                  onIconEnabledChange?.(checked === true);
                }}
              />
            </div>
          ) : null}
          <div className="shrink-0 border-b p-2">
            <Input
              type="search"
              placeholder={getIconPickerSearchPlaceholder()}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              prefixIcon="search"
              variant="sm"
              className="h-8"
            />
          </div>

          <ScrollArea className="h-80 overflow-hidden">
            {renderIconGrid()}
          </ScrollArea>
          {showClearAction ? (
            <div className="shrink-0 border-t p-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={handleClear}>
                {getIconPickerResetLabel()}
              </Button>
            </div>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { isIconMapPickerKey } from "./icon-picker-map-entries";
export type { IconMapPickerEntry } from "./icon-picker-map-entries";
