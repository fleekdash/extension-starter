import { cn } from "../../internal";
import type { IconLibrary } from "../../internal/types";
import icons from "../../internal/icons-map";
import {
  addCollection,
  Icon as IconifyIcon,
  type IconifyJSON,
} from "@iconify/react";
import React, { useSyncExternalStore } from "react";
import { getBrowserWindow } from "../../internal";
import { installIconifyFetchGuard } from "../../internal";
import iconCollections from "./generated/icon-collections.json";
import { getIconLibrary, subscribeIconLibrary } from "./icon-library-store";
import {
  iconBoxShellStyle,
  parseIconBoxFromClassName,
  stripIconBoxSizeClasses,
} from "./icon-dimensions";

type FleekDashGlobal = typeof globalThis & {
  __fleekdashIconifyBootstrap__?: boolean;
};

function registerLocalIconCollections(): void {
  const fleekGlobal = globalThis as FleekDashGlobal;
  if (fleekGlobal.__fleekdashIconifyBootstrap__) {
    return;
  }
  fleekGlobal.__fleekdashIconifyBootstrap__ = true;

  installIconifyFetchGuard();

  const collections = iconCollections as unknown as IconifyJSON[];
  for (const collection of collections) {
    addCollection(collection);
  }
}

registerLocalIconCollections();

// Icon name type (icon map key or raw Iconify id)
export type IconName = keyof typeof icons | string;

type IconifyProps = React.ComponentProps<typeof IconifyIcon>;
/** Props for `Icon` / `PureIcon` (Sonar S6767 flags type members; all are destructured in PureIcon). */
export type IconProps = Omit<IconifyProps, "icon" | "name"> & {
  readonly name: IconName; // NOSONAR S6767
  readonly showSkeleton?: boolean; // NOSONAR S6767
  readonly skeletonClassName?: string; // NOSONAR S6767
  readonly onLoad?: () => void; // NOSONAR S6767
  readonly onError?: () => void; // NOSONAR S6767
};

type PureIconProps = IconProps & { readonly iconLibrary: IconLibrary }; // NOSONAR S6767

// Icon system settings
const DEFAULT_ICON_LIBRARY = "lucide" satisfies IconLibrary;
const LEGACY_ICON_CACHE_KEY = "fleekdash_icon_cache";

// In-memory resolved-name cache (session only)
const iconCache = new Map<string, string>();

function keywordScoreForIcon(
  keywords: readonly string[] | undefined,
  normalizedSearch: string,
): number {
  if (!keywords?.length) {
    return 0;
  }
  let score = 0;
  for (const keyword of keywords) {
    const normalizedKeyword = String(keyword).toLowerCase();
    if (normalizedSearch === normalizedKeyword) {
      score += 3;
    } else if (
      normalizedSearch.includes(normalizedKeyword) ||
      normalizedKeyword.includes(normalizedSearch)
    ) {
      score += 2;
    }
  }
  return score;
}

/** Icon map keys are string-only; `keyof IconMap` includes `number` from the index signature. */
type IconMapKey = Extract<keyof typeof icons, string>;

// Resolve icon map keys by keyword (single pass)
const findIconByKeywords = (searchTerm: string): IconMapKey | null => {
  if (!searchTerm || typeof searchTerm !== "string") {
    return null;
  }

  const normalizedSearch = searchTerm.toLowerCase().trim();
  let bestMatch: { key: IconMapKey; score: number } | null = null;

  for (const key of Object.keys(icons)) {
    if (key.toLowerCase() === normalizedSearch) {
      return key;
    }
    const icon = icons[key];
    let score = keywordScoreForIcon(icon.keywords, normalizedSearch);
    if (String(key).includes(normalizedSearch)) {
      score += 1;
    }
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { key, score };
    }
  }

  return bestMatch?.key ?? null;
};

/**
 * Pick the best icon-map search term from human labels, slugs, or node ids.
 * Same resolution path as sidebar `<Icon name={item.id} />` (keyword + icons-map).
 */
function buildIconSearchCandidates(
  hints: Array<string | null | undefined>,
): string[] {
  const candidates: string[] = [];
  for (const hint of hints) {
    if (typeof hint !== "string") {
      continue;
    }
    const trimmed = hint.trim();
    if (!trimmed) {
      continue;
    }
    candidates.push(trimmed);
    for (const word of trimmed.split(/\s+/)) {
      const normalized = word.replace(/[^a-zA-Z0-9_-]/g, "");
      if (normalized.length >= 3) {
        candidates.push(normalized);
      }
    }
  }
  return candidates;
}

/**
 * Normalize API-provided icon hints before keyword resolution.
 * Ignores empty placeholders and raw WordPress dashicons tokens so callers can
 * safely fall back to human labels / ids.
 */
export function normalizeIconSearchHint(
  hint: string | null | undefined,
): string | null {
  if (typeof hint !== "string") {
    return null;
  }

  const trimmed = hint.trim();
  if (
    trimmed === "" ||
    trimmed === "default" ||
    trimmed.startsWith("dashicons-")
  ) {
    return null;
  }

  return trimmed;
}

export function resolveIconSearchTermFromHints(
  ...hints: Array<string | null | undefined>
): string {
  const candidates = buildIconSearchCandidates(hints);
  let result = candidates[0] ?? "default";
  for (const term of candidates) {
    const key = findIconByKeywords(term);
    if (key !== null) {
      result = key;
      break;
    }
    if (Object.prototype.hasOwnProperty.call(icons, term)) {
      result = term;
      break;
    }
  }
  return result;
}

function resolveMapEntryIconId(
  entry: (typeof icons)[string],
  iconLibrary: IconLibrary,
): string {
  const effectiveLibrary = entry.preferLibrary ?? iconLibrary;
  return entry[effectiveLibrary];
}

// Resolve a logical icon name to an Iconify identifier
const resolveIconName = (name: string, iconLibrary: IconLibrary): string => {
  if (!name || typeof name !== "string") {
    return resolveMapEntryIconId(icons.default, iconLibrary);
  }

  const cacheKey = `${name}:${iconLibrary}`;

  // In-memory cache first
  const cachedIcon = iconCache.get(cacheKey);
  if (cachedIcon !== undefined) {
    return cachedIcon;
  }

  let result: string;

  // Raw Iconify id (library:icon)
  if (name.includes(":")) {
    result = name;
  } else if (Object.prototype.hasOwnProperty.call(icons, name)) {
    result = resolveMapEntryIconId(icons[name], iconLibrary);
  } else {
    // Keyword lookup in icon map
    const foundIcon = findIconByKeywords(name);
    result = foundIcon
      ? resolveMapEntryIconId(icons[foundIcon], iconLibrary)
      : resolveMapEntryIconId(icons.default, iconLibrary);
  }

  iconCache.set(cacheKey, result);

  return result;
};

/**
 * Logical icon keys whose glyphs carry inline-direction meaning
 * (next/back, forward/reply, panel open/close, send, login/logout).
 * Under `dir=rtl` they mirror horizontally via `rtl:-scale-x-100`.
 */
const RTL_FLIP_ICON_KEYS: ReadonlySet<string> = new Set([
  "chevronRight",
  "chevronLeft",
  "arrowRight",
  "forwardRight",
  "forwardLeft",
  "rollback",
  "send",
  "login",
  "logout",
  "panelLeft",
  "panelRight",
  "newtab",
  "arrowUpRight",
]);

/** Logical icon keys warmed on app boot (maps via icons-map + iconLibrary). */
const COMMON_ICON_KEYS = [
  "home",
  "dashboard",
  "settings",
  "users",
  "chart",
  "calendar",
  "search",
  "menu",
  "close",
  "eye",
  "eyeOff",
  "pin",
  "pinOff",
  "layoutDrawer",
  "layoutModal",
  "add",
  "edit",
  "delete",
  "save",
  "plugin",
  "loading",
  "loadingInfinity",
  "loadingTwist",
  "pulse",
  "check",
  "danger",
  "error",
  "warning",
  "info",
  "star",
  "logout",
  "sun",
  "moon",
  "monitor",
  "notification",
  "panelLeft",
  "newtab",
] as const;

/** Resolves logical names into the in-memory name cache (offline bundle, no network). */
export function preloadIconKeysForLibrary(
  logicalNames: readonly string[],
  iconLibrary: IconLibrary,
): void {
  if (!getBrowserWindow() || logicalNames.length === 0) {
    return;
  }
  for (const name of logicalNames) {
    resolveIconName(name, iconLibrary);
  }
}

/**
 * Warms the curated shell icon set for the active icon library (name cache + local SVG data).
 */
export function warmIconCacheForLibrary(
  iconLibrary: IconLibrary = DEFAULT_ICON_LIBRARY,
): void {
  preloadIconKeysForLibrary([...COMMON_ICON_KEYS], iconLibrary);
}

const IconSkeleton = React.memo(({ className }: { className?: string }) => {
  const box = parseIconBoxFromClassName(className);

  return (
    <span
      className={cn(
        "skeleton-bg inline-flex shrink-0 animate-pulse rounded-sm align-middle",
        stripIconBoxSizeClasses(className),
      )}
      style={iconBoxShellStyle(box)}
      aria-hidden="true"
    />
  );
});

IconSkeleton.displayName = "IconSkeleton";

function useIconBoxLayout(className?: string, skeletonClassName?: string) {
  const sizeSource = skeletonClassName || className;

  return React.useMemo(() => {
    const box = parseIconBoxFromClassName(sizeSource);
    return {
      box,
      shellStyle: iconBoxShellStyle(box),
      shellClassName: stripIconBoxSizeClasses(sizeSource),
    };
  }, [sizeSource]);
}

// Memoized Icon presentation component
const PureIcon = React.memo(
  React.forwardRef<SVGElement, PureIconProps>(
    (
      {
        name,
        className,
        iconLibrary,
        showSkeleton = true,
        skeletonClassName,
        onLoad,
        onError,
        ...rest
      },
      ref,
    ) => {
      const resolvedIconName = React.useMemo(() => {
        if (!name || typeof name !== "string") {
          return "";
        }
        return resolveIconName(name, iconLibrary);
      }, [name, iconLibrary]);

      // Offline Iconify renders synchronously from the local bundle; onLoad is not fired.
      React.useLayoutEffect(() => {
        if (resolvedIconName) {
          onLoad?.();
        }
      }, [resolvedIconName, onLoad]);

      const { box, shellStyle, shellClassName } = useIconBoxLayout(
        className,
        skeletonClassName,
      );
      const iconVisualClassName = stripIconBoxSizeClasses(className);
      const {
        width: widthProp,
        height: heightProp,
        style: styleProp,
        ...iconifyRest
      } = rest;
      const iconWidth = widthProp ?? box.width;
      const iconHeight = heightProp ?? box.height;

      if (!name || typeof name !== "string" || !resolvedIconName) {
        return showSkeleton ? (
          <IconSkeleton className={skeletonClassName || className} />
        ) : null;
      }

      return (
        <span
          className={cn(
            "relative inline-flex shrink-0 items-center justify-center align-middle",
            shellClassName,
          )}
          style={shellStyle}>
          <IconifyIcon
            icon={resolvedIconName}
            className={cn(
              iconVisualClassName,
              "relative z-20 block shrink-0",
              RTL_FLIP_ICON_KEYS.has(name) && "rtl:-scale-x-100",
            )}
            style={{
              width: iconWidth,
              height: iconHeight,
              minWidth: iconWidth,
              minHeight: iconHeight,
              verticalAlign: "middle",
              lineHeight: "1",
              ...styleProp,
            }}
            ref={ref as React.Ref<SVGSVGElement>}
            onError={onError}
            {...iconifyRest}
          />
        </span>
      );
    },
  ),
);

PureIcon.displayName = "PureIcon";

// Active icon library from theme settings
function useIconLibrary(): IconLibrary {
  return useSyncExternalStore(
    subscribeIconLibrary,
    getIconLibrary,
    () => DEFAULT_ICON_LIBRARY,
  );
}

// Public Icon export
export const IconComponent = React.forwardRef<SVGElement, IconProps>(
  (props, ref) => {
    const iconLibrary = useIconLibrary();
    return <PureIcon {...props} ref={ref} iconLibrary={iconLibrary} />;
  },
);

IconComponent.displayName = "Icon";

// Optimized utility helpers
export const clearIconCache = (): void => {
  iconCache.clear();
  const browserWindow = getBrowserWindow();
  if (browserWindow) {
    try {
      browserWindow.localStorage.removeItem(LEGACY_ICON_CACHE_KEY);
    } catch {
      // Ignore legacy cleanup failures
    }
  }
};

export const getIconCacheStats = (): { memory: number } => ({
  memory: iconCache.size,
});

export { IconComponent as Icon, IconSkeleton, resolveIconName };
