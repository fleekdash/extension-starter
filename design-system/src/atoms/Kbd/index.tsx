/**
 * Kbd Component - V2.2
 *
 * Keyboard shortcut indicator with platform detection.
 * Displays keyboard shortcuts with icons and text.
 *
 * @version 2.2.0
 */

import { Icon } from "../../atoms/Icon";
import { cn } from "../../internal";
import React from "react";

/** Built-in modifier keys rendered as icons or labels (also accepts custom keys like `"k"`). */
export type PredefinedKbdKey =
  | "cmd"
  | "ctrl"
  | "shift"
  | "alt"
  | "enter"
  | "space"
  | "esc";

interface KbdProps {
  /** Keys to display — use {@link PredefinedKbdKey} or any custom label (e.g. `"k"`, `"f"`). */
  readonly keys: ReadonlyArray<string>;
  /** Additional CSS classes */
  readonly className?: string;
  /** Size variant */
  readonly size?: "sm" | "md" | "lg";
}

/** icons-map keys — must exist in local Iconify bundle (no raw prefix:icon IDs). */
const keyIcons: Partial<Record<PredefinedKbdKey, string>> = {
  cmd: "kbd",
  ctrl: "kbd",
  shift: "kbdShift",
  enter: "kbdEnter",
  space: "kbdSpace",
};

const keyTextLabels: Partial<Record<PredefinedKbdKey, string>> = {
  esc: "Esc",
};

function renderKbdKey(key: string, iconSize: string): React.ReactNode {
  const iconKey = keyIcons[key as PredefinedKbdKey];
  if (iconKey) {
    return <Icon name={iconKey} className={iconSize} />;
  }

  const textLabel = keyTextLabels[key as PredefinedKbdKey];
  if (textLabel) {
    return <span className="font-semibold">{textLabel}</span>;
  }

  return <span className="font-semibold uppercase">{key}</span>;
}

const sizeClasses = {
  sm: "text-[9px] h-2 w-2",
  md: "text-[10px] h-2.5 w-2.5",
  lg: "text-[11px] h-3 w-3",
} as const;

/**
 * Reusable keyboard shortcut indicator component
 *
 * @example
 * // Basic usage
 * <Kbd keys={["ctrl", "shift", "f"]} />
 *
 * @example
 * // Custom keys
 * <Kbd keys={["cmd", "k"]} />
 *
 * @example
 * // Mixed icons and text
 * <Kbd keys={["alt", "t"]} />
 *
 * @example
 * // Custom text keys
 * <Kbd keys={["ctrl", "shift", "p"]} />
 */
export const Kbd: React.FC<KbdProps> = ({ keys, className, size = "md" }) => {
  const iconSize = sizeClasses[size];

  return (
    <kbd
      className={cn(
        "bg-foreground/10 border-border text-muted-foreground ms-auto flex items-center gap-1 rounded-sm border font-mono leading-4 shadow-none outline-0",
        size === "sm" && "px-1 text-[9px]",
        size === "md" && "px-1.5 text-[10.5px]",
        size === "lg" && "px-2 text-[11px]",
        className,
      )}>
      {keys.map((key, index) => (
        <React.Fragment key={key}>
          {renderKbdKey(key, iconSize)}
          {index < keys.length - 1 && (
            <span aria-hidden="true" className="text-muted-foreground/60">
              +
            </span>
          )}
        </React.Fragment>
      ))}
    </kbd>
  );
};

// Convenience components for common combinations
export const KbdCmdShiftF = () => <Kbd keys={["cmd", "shift", "f"]} />;

export const KbdCtrlShiftF = () => <Kbd keys={["ctrl", "shift", "f"]} />;

export const KbdCmdK = () => <Kbd keys={["cmd", "k"]} />;

export const KbdCtrlK = () => <Kbd keys={["ctrl", "k"]} />;

export const KbdAltT = () => <Kbd keys={["alt", "t"]} />;

export const KbdCtrlSpace = () => <Kbd keys={["ctrl", "space"]} />;

export const KbdEsc = () => <Kbd keys={["esc"]} />;

/**
 * Platform-aware component that shows Cmd on Mac, Ctrl on Windows/Linux
 * Use "mod" as a key to automatically choose the right modifier key
 *
 * @example
 * <KbdPlatformShortcut keys={["mod", "k"]} />
 * // Shows: Cmd+K on Mac, Ctrl+K on Windows/Linux
 */
export const KbdPlatformShortcut: React.FC<{
  readonly keys: ReadonlyArray<string>;
  readonly className?: string;
  readonly size?: "sm" | "md" | "lg";
}> = ({ keys, className, size }) => {
  const isMac =
    typeof navigator !== "undefined" &&
    navigator.platform.toUpperCase().includes("MAC");

  const platformKeys = keys.map((key) => {
    if (key === "mod") {
      return isMac ? "cmd" : "ctrl";
    }
    return key;
  });

  return <Kbd keys={platformKeys} className={className} size={size} />;
};
