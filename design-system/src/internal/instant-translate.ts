import { getBrowserWindow } from "./browser-env";

/**
 * Instant Translation System
 *
 * Ultra-fast translation system that works with pre-injected translations
 * to eliminate any flash of untranslated content
 */

type InstantTranslationState = {
  translationCache: Map<string, string>;
  overridesCache: Map<string, string>;
  translationsInitialized: boolean;
  overridesInitialized: boolean;
};

type GlobalRoot = object;

function getGlobalRoot(): GlobalRoot {
  const browserWindow = getBrowserWindow();
  if (browserWindow) {
    return browserWindow;
  }

  return globalThis;
}

function getState(): InstantTranslationState {
  const root = getGlobalRoot();
  const stateKey = "__fleekdashInstantTranslationState__";
  const existingState = Reflect.get(root, stateKey);

  if (!existingState) {
    const initialState = {
      translationCache: new Map<string, string>(),
      overridesCache: new Map<string, string>(),
      translationsInitialized: false,
      overridesInitialized: false,
    } satisfies InstantTranslationState;

    Reflect.set(root, stateKey, initialState);
  }

  return Reflect.get(root, stateKey) as InstantTranslationState;
}

/**
 * Initialize instant translations from pre-injected data
 */
function initializeInstantTranslations(): void {
  const state = getState();

  if (state.translationsInitialized) return;

  const browserWindow = getBrowserWindow();
  if (!browserWindow) return;

  // Get pre-injected translation data
  const translationData =
    (browserWindow as any).fleekDashI18n?.localeData ||
    (browserWindow as any).FleekDash?.i18n?.localeData;

  if (translationData?.locale_data?.["fleekdash"]) {
    const translations = translationData.locale_data["fleekdash"];

    // Pre-populate cache with all translations
    for (const [key, value] of Object.entries(translations)) {
      if (key !== "" && Array.isArray(value) && value.length > 0) {
        state.translationCache.set(key, value[0] as string);
      }
    }

    state.translationsInitialized = true;
  }
}

/**
 * Initialize text overrides from pre-injected data (en_US only)
 */
function initializeTextOverrides(): void {
  const state = getState();

  if (state.overridesInitialized) return;

  const browserWindow = getBrowserWindow();
  if (!browserWindow) return;

  // Get pre-injected text overrides data
  const overrides =
    (browserWindow as any).FleekDash?.i18n?.textOverrides ||
    (browserWindow as any).fleekDashI18n?.textOverrides;

  if (overrides && typeof overrides === "object") {
    // Pre-populate cache with all overrides
    for (const [key, value] of Object.entries(overrides)) {
      if (key && value) {
        state.overridesCache.set(key, value as string);
      }
    }

    state.overridesInitialized = true;
  }
}

/**
 * Ultra-fast instant translation with placeholder support
 *
 * @param text - Text to translate (can contain placeholders like %s, %1$s, %2$s)
 * @param replacements - Values to replace placeholders with
 *
 * @example
 * instantTranslate('%s Growth Score', 'October')
 * // Example (PT-BR): growth score with %s replaced by localized month name
 * // EN-US (with override): "Dashboard" -> "Control Panel"
 */
export function instantTranslate(
  text: string,
  ...replacements: (string | number)[]
): string {
  // Initialize if not done yet
  const state = getState();

  if (!state.translationsInitialized) {
    initializeInstantTranslations();
  }
  if (!state.overridesInitialized) {
    initializeTextOverrides();
  }

  // For en_US: Check text overrides first (performance optimization)
  const currentLocale = getCurrentLocaleInstant();
  let translated = text;

  if (currentLocale === "en_US") {
    // Check custom text overrides (en_US only)
    translated = state.overridesCache.get(text) || text;
  } else {
    // Check translations (other locales)
    translated = state.translationCache.get(text) || text;
  }

  // Replace placeholders if provided
  if (replacements.length > 0) {
    // Support for both %s and numbered placeholders like %1$s, %2$s
    replacements.forEach((replacement, index) => {
      // Replace numbered placeholders first (%1$s, %2$s, etc)
      translated = translated.replace(`%${index + 1}$s`, () =>
        String(replacement),
      );
      // Then replace simple %s in order
      translated = translated.replace("%s", () => String(replacement));
    });
  }

  return translated;
}

/**
 * Check if instant translations are ready
 */
export function areInstantTranslationsReady(): boolean {
  return (
    getState().translationsInitialized ||
    (() => {
      const browserWindow = getBrowserWindow();
      return !!(
        browserWindow &&
        ((browserWindow as any).fleekDashI18n?.localeData ||
          (browserWindow as any).FleekDash?.i18n?.localeData)
      );
    })()
  );
}

/**
 * Get current locale instantly
 */
export function getCurrentLocaleInstant(): string {
  const browserWindow = getBrowserWindow();
  if (!browserWindow) return "en_US";

  return (
    (browserWindow as any).fleekDashI18n?.locale ||
    (browserWindow as any).FleekDash?.i18n?.locale ||
    (browserWindow as any).FleekDash?.locale ||
    "en_US"
  );
}

/**
 * Get configured WooCommerce currency code (or fallback) from pre-injected payload
 */
export function getCurrentCurrencyCodeInstant(): string {
  const browserWindow = getBrowserWindow();
  if (!browserWindow) return "USD";

  return (
    (browserWindow as any).fleekDashI18n?.currencyCode ||
    (browserWindow as any).FleekDash?.i18n?.currencyCode ||
    "USD"
  );
}

function attachLocaleChangeListener(): void {
  const localeBrowserWindow = getBrowserWindow();
  if (!localeBrowserWindow) {
    return;
  }
  localeBrowserWindow.addEventListener("fleekdash:locale-changed", () => {
    const state = getState();
    state.translationsInitialized = false;
    state.overridesInitialized = false;
    state.translationCache.clear();
    state.overridesCache.clear();
    initializeInstantTranslations();
    initializeTextOverrides();
  });
}

function runDeferredInstantTranslateInit(): void {
  initializeInstantTranslations();
  initializeTextOverrides();
  attachLocaleChangeListener();
}

// Initialize shortly after module load (after module state is created)
if (typeof queueMicrotask === "function") {
  queueMicrotask(runDeferredInstantTranslateInit);
} else {
  // prettier-ignore -- keep block unchanged so formatter does not reflow and Sonar suppression stays effective
  Promise.resolve().then(runDeferredInstantTranslateInit); // NOSONAR S7785: build target es2020 does not support top-level await
}
