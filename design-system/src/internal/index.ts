/**
 * Internal utilities vendored from the platform layer so Fleek UI components
 * work standalone (extension iframes, third-party apps) — no @platform imports.
 *
 * @internal — not part of the public API surface; components import via the
 * barrel so consumers of the package never see these paths.
 */
export { cn } from "./cn";
export { getBrowserWindow } from "./browser-env";
export { debugError, debugLog, debugWarn } from "./debug";
export { readNodeEnv } from "./debug-enabled";
export { makeSquircle } from "./squircle";
export {
  closeOverlaysForContainer,
  registerOverlay,
  unregisterOverlay,
} from "./overlays/overlay-registry";
export {
  OverlayEnvironmentProvider,
  useOverlayEnvironment,
} from "./overlays/OverlayEnvironmentContext";
export { OVERLAY_CONTENT_Z_ABOVE_DRAWER } from "./overlays/overlay-z-index";
export {
  areInstantTranslationsReady,
  getCurrentCurrencyCodeInstant,
  getCurrentLocaleInstant,
  instantTranslate,
} from "./instant-translate";
export { readRootDataThemeAttribute } from "./read-root-data-theme-attribute";
export { useDebounce } from "./useDebounce";
export { installIconifyFetchGuard } from "./iconify-fetch-guard";
export { default as iconsMap } from "./icons-map";
export type { IconLibrary, MutableRef, ReadonlyRef } from "./types";
