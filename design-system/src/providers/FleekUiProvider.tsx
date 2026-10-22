import { createContext, useContext, useEffect, useMemo } from "react";
import type { IconLibrary } from "../internal/types";
import { setIconLibrary } from "../atoms/Icon/icon-library-store";

/**
 * Theme-facing configuration Fleek UI components need from the host.
 *
 * Standalone (extension iframe / third-party app): the defaults below are the
 * FleekDash canonical values — components work with no provider at all.
 *
 * Inside the FleekDash shell: an adapter feeds `useThemeConfig().uiSettings`
 * into this provider so theme choices (squircle, button radius, icon library)
 * propagate into every package component.
 */
export interface FleekUiConfig {
  /** Squircle (superellipse) masking on buttons — FleekDash default: true. */
  readonly useSquircleButtons: boolean;
  /** Theme-level default Button radius variant. */
  readonly defaultButtonRadius: string;
  /** Active icon set for `<Icon>` — resolved via icons-map. */
  readonly iconLibrary: IconLibrary;
}

export const FLEEK_UI_DEFAULT_CONFIG: FleekUiConfig = {
  useSquircleButtons: true,
  defaultButtonRadius: "default",
  iconLibrary: "lucide",
};

const FleekUiConfigContext = createContext<FleekUiConfig>(
  FLEEK_UI_DEFAULT_CONFIG,
);

export interface FleekUiProviderProps {
  /** `iconLibrary` arrives as a plain string from host theme JSON; unknown values fall back to the default. */
  readonly config?: Partial<Omit<FleekUiConfig, "iconLibrary">> & {
    readonly iconLibrary?: string;
  };
  readonly children: React.ReactNode;
}

export function FleekUiProvider({
  config,
  children,
}: FleekUiProviderProps): React.ReactElement {
  const value = useMemo<FleekUiConfig>(
    () => ({
      ...FLEEK_UI_DEFAULT_CONFIG,
      ...config,
      iconLibrary:
        config?.iconLibrary === "solar" || config?.iconLibrary === "lucide"
          ? config.iconLibrary
          : FLEEK_UI_DEFAULT_CONFIG.iconLibrary,
    }),
    [config],
  );

  // <Icon> resolves its set through the module-level icon-library store
  // (kept out of context so vendor-iconify stays off the theme chunk).
  // Sync it here so standalone consumers picking Solar via this provider
  // actually render Solar icons; inside the shell IconSystemProvider writes
  // the same value, and setIconLibrary early-returns on no-ops.
  useEffect(() => {
    setIconLibrary(value.iconLibrary);
  }, [value.iconLibrary]);

  return (
    <FleekUiConfigContext.Provider value={value}>
      {children}
    </FleekUiConfigContext.Provider>
  );
}

export function useFleekUiConfig(): FleekUiConfig {
  return useContext(FleekUiConfigContext);
}
