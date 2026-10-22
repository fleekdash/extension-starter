import icons from "../../internal/icons-map";

export type IconMapPickerEntry = {
  readonly value: string;
  readonly label: string;
  readonly keywords: readonly string[];
};

function formatIconMapLabel(key: string): string {
  const spaced = key
    .replaceAll(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replaceAll(/[-_]+/g, " ")
    .trim();
  if (!spaced) {
    return key;
  }
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/** True when `icon` is a selectable icons-map key (not dashicons / Iconify ids / default). */
export function isIconMapPickerKey(
  icon: string | null | undefined,
): icon is string {
  if (typeof icon !== "string") {
    return false;
  }
  const trimmed = icon.trim();
  if (
    trimmed === "" ||
    trimmed === "default" ||
    trimmed.startsWith("dashicons-") ||
    trimmed.includes(":")
  ) {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(icons, trimmed);
}

/**
 * Flat list of theme icon-map keys for the IconPicker.
 * Values are logical map keys (e.g. "users"), not raw Iconify ids.
 * Reserved keys (`default`, dashicons/Iconify-style ids) are excluded so the
 * picker never offers placeholders that are not real selectable icons.
 */
export function getIconMapPickerEntries(): readonly IconMapPickerEntry[] {
  return Object.keys(icons)
    .filter((key) => isIconMapPickerKey(key))
    .map((key) => {
      const entry = icons[key];
      return {
        value: key,
        label: formatIconMapLabel(key),
        keywords: entry.keywords ?? [],
      };
    });
}

export function filterIconMapPickerEntries(
  entries: readonly IconMapPickerEntry[],
  search: string,
): readonly IconMapPickerEntry[] {
  const normalized = search.trim().toLowerCase();
  if (!normalized) {
    return entries;
  }

  return entries.filter((entry) => {
    if (entry.value.toLowerCase().includes(normalized)) {
      return true;
    }
    if (entry.label.toLowerCase().includes(normalized)) {
      return true;
    }
    return entry.keywords.some((keyword) =>
      keyword.toLowerCase().includes(normalized),
    );
  });
}
