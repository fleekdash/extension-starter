import { cn } from "../../internal";
import {
  FIELD_FOCUS_ACTIVE,
  FIELD_FOCUS_TRANSITION,
} from "../../foundations/focus";

export const SETTINGS_CATEGORY_TITLE_CLASS =
  "text-foreground text-base font-medium";

export const SETTINGS_FEATURE_CARD_BASE_CLASS =
  "group relative flex flex-col rounded-lg border p-4 transition-colors transition-opacity";

export const SETTINGS_FEATURE_CARD_OFF_CLASS = "opacity-70";

export const SETTINGS_FEATURE_CARD_ROW_CLASS = "flex w-full items-center gap-4";

/** Customize drawer cards — consistent surface independent of enabled/active state. */
export const SETTINGS_FEATURE_CARD_CUSTOMIZE_SURFACE_CLASS =
  "bg-background hover:bg-muted/30";

/** Trailing column when it hosts hover-revealed actions anchored beside the switch. */
export const SETTINGS_FEATURE_CARD_TRAILING_COLUMN_CLASS =
  "ms-4 flex shrink-0 items-center gap-1";

/** Actions sit flush inline-start of the switch (`end-full`), matching preset trailing spacing. */
export const SETTINGS_FEATURE_CARD_HOVER_REVEAL_ACTIONS_CLASS =
  "absolute top-1/2 end-full z-20 me-1 flex -translate-y-1/2 items-center gap-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100";

/** Fades copy on hover so floating actions do not clash with title text. */
export const SETTINGS_FEATURE_CARD_HOVER_REVEAL_COPY_MASK_CLASS =
  "group-hover:[mask-image:linear-gradient(to_inline-end,black_0%,black_50%,transparent_100%)] group-hover:[-webkit-mask-image:linear-gradient(to_inline-end,black_0%,black_50%,transparent_100%)]";

export const SETTINGS_FEATURE_CARD_SETTINGS_PANEL_CLASS =
  "mt-3 rounded-md border border-border/60 bg-muted/20 px-4 py-3";

export const SETTINGS_FEATURE_CARD_ACTIVE_CLASS = "bg-primary/3 border-border";

export const SETTINGS_FEATURE_CARD_INACTIVE_CLASS =
  "border-border bg-background hover:bg-muted/30";

const SETTINGS_FEATURE_CARD_BODY_BASE_CLASS =
  "flex min-w-0 flex-1 items-center gap-3 p-0 text-start font-inherit text-inherit transition-colors";

export const SETTINGS_FEATURE_CARD_TOGGLE_BUTTON_CLASS = `${SETTINGS_FEATURE_CARD_BODY_BASE_CLASS} cursor-pointer rounded-md border-0 bg-transparent focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-75`;

/** Non-interactive body used when the card is a drag surface (no click-to-open). */
export const SETTINGS_FEATURE_CARD_BODY_STATIC_CLASS =
  SETTINGS_FEATURE_CARD_BODY_BASE_CLASS;

export const SETTINGS_FEATURE_ICON_BOX_CLASS =
  "flex h-10 w-10 items-center justify-center rounded-lg";

export const SETTINGS_FEATURE_ICON_BOX_INACTIVE_CLASS = "border-border border";

export const SETTINGS_FEATURE_TITLE_CLASS =
  "truncate text-sm font-medium capitalize";

export const SETTINGS_FEATURE_DESCRIPTION_CLASS =
  "text-muted-foreground line-clamp-1 text-xs";

export function getSettingsFeatureCardStateClass(enabled: boolean): string {
  return enabled
    ? SETTINGS_FEATURE_CARD_ACTIVE_CLASS
    : SETTINGS_FEATURE_CARD_INACTIVE_CLASS;
}

export function getSettingsFeatureToggleCardClass(options: {
  readonly enabled: boolean;
  readonly disabled?: boolean;
  readonly inactive?: boolean;
  readonly selected?: boolean;
  readonly className?: string;
}): string {
  const {
    enabled,
    disabled = false,
    inactive = false,
    selected = false,
    className,
  } = options;

  return cn(
    SETTINGS_FEATURE_CARD_BASE_CLASS,
    getSettingsFeatureCardStateClass(enabled),
    !enabled && SETTINGS_FEATURE_CARD_OFF_CLASS,
    selected && FIELD_FOCUS_ACTIVE,
    selected && FIELD_FOCUS_TRANSITION,
    disabled && "pointer-events-none",
    inactive && "cursor-not-allowed",
    className,
  );
}

export function getSettingsFeatureIconBoxClass(
  showInactiveBorder: boolean,
): string {
  return cn(
    SETTINGS_FEATURE_ICON_BOX_CLASS,
    showInactiveBorder && SETTINGS_FEATURE_ICON_BOX_INACTIVE_CLASS,
  );
}

export function getSettingsFeatureCopyClass(
  inactive: boolean,
  hoverRevealActions = false,
): string {
  return cn(
    "min-w-0 flex-1",
    inactive && "opacity-75",
    hoverRevealActions && SETTINGS_FEATURE_CARD_HOVER_REVEAL_COPY_MASK_CLASS,
  );
}

export function getSettingsFeatureTitleCombinedClass(
  titleClassName?: string,
): string {
  return cn(SETTINGS_FEATURE_TITLE_CLASS, titleClassName);
}

export function getSettingsFeatureSwitchClass(disabled: boolean): string {
  return cn("transition-opacity duration-200", disabled && "opacity-50");
}

export function getSettingsCategoryTitleClass(capitalize = false): string {
  return cn(SETTINGS_CATEGORY_TITLE_CLASS, capitalize && "capitalize");
}

export function getSettingsFeatureIconTintStyle(color: string): {
  backgroundColor: string;
} {
  return { backgroundColor: `${color}15` };
}

/** Saturated palette — pastels fail on light icon boxes and thin outline glyphs. */
const SETTINGS_FEATURE_ICON_COLORS = [
  "#2563EB",
  "#7C3AED",
  "#DB2777",
  "#DC2626",
  "#059669",
  "#D97706",
  "#0891B2",
  "#4F46E5",
  "#BE185D",
  "#0D9488",
] as const;

export function getSettingsFeatureIconColor(seed: string): string {
  let sum = 0;
  for (const char of seed) {
    sum += char.codePointAt(0) ?? 0;
  }
  const colorIndex = sum % SETTINGS_FEATURE_ICON_COLORS.length;
  return (
    SETTINGS_FEATURE_ICON_COLORS[colorIndex] ?? SETTINGS_FEATURE_ICON_COLORS[0]
  );
}

export function getSettingsFeatureIconStyle(color: string): { color: string } {
  return { color };
}
