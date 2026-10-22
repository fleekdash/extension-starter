/**
 * Design-system Icon atom — themed Iconify implementation.
 * Use `name` keys from `src/themes/icons-map.ts` (solar/lucide resolved via theme).
 */
export {
  Icon,
  IconComponent,
  IconSkeleton,
  clearIconCache,
  getIconCacheStats,
  normalizeIconSearchHint,
  preloadIconKeysForLibrary,
  resolveIconName,
  resolveIconSearchTermFromHints,
  warmIconCacheForLibrary,
} from "./iconify";
export type { IconName, IconProps } from "./iconify";
export {
  getIconLibrary,
  setIconLibrary,
  subscribeIconLibrary,
} from "./icon-library-store";
export {
  iconBoxShellStyle,
  parseIconBoxFromClassName,
  stripIconBoxSizeClasses,
} from "./icon-dimensions";
export type { IconBoxDimensions } from "./icon-dimensions";
export {
  MENU_TRIGGER_CHEVRON_CLASS,
  MenuTriggerChevron,
} from "./menu-trigger-chevron";
