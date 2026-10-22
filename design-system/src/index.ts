/**
 * @fleekdash/design-system — Fleek UI
 *
 * The extension-facing FleekDash design system: platform-free React primitives
 * (Radix + Tailwind + theme tokens) that render identically inside the
 * FleekDash shell and inside extension iframes.
 *
 * Tokens are the contract — components read `--primary`, `--background`, …
 * which the host injects (SDK `loadThemeAssets`) or `fleek-ui.css` provides
 * as defaults.
 */
export * from "./foundations";
export * from "./atoms";
export * from "./molecules";
export * from "./organisms";

export { FleekUiProvider, useFleekUiConfig } from "./providers/FleekUiProvider";
export type {
  FleekUiConfig,
  FleekUiProviderProps,
} from "./providers/FleekUiProvider";

export { cn } from "./internal/cn";
export { instantTranslate } from "./internal/instant-translate";
export {
  getIconLibrary,
  setIconLibrary,
  subscribeIconLibrary,
} from "./atoms/Icon/icon-library-store";
export { resolveIconName } from "./atoms/Icon/iconify";
export { OverlayEnvironmentProvider } from "./internal/overlays/OverlayEnvironmentContext";
export type { IconLibrary } from "./internal/types";
