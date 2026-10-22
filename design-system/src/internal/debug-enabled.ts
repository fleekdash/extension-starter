/**
 * Pure frontend debug-enabled resolution.
 * Settings / PHP debugStatus is the product toggle; NODE_ENV is a fallback.
 */

import { getBrowserWindow } from "./browser-env";

export const FLEEKDASH_FORCE_DEBUG_STORAGE_KEY = "fleekdash_force_debug";
export const FLEEKDASH_DEBUG_STORAGE_KEY = "fleekdash_debug";
export const FLEEKDASH_DEBUG_CHANGED_EVENT = "fleekdash:debug-changed";

export interface DebugStatusSlice {
  readonly debug?: boolean;
  readonly force_debug?: boolean | null;
  readonly source?: string;
  readonly wp_debug?: boolean;
}

export interface DebugEnabledInput {
  readonly nodeEnv: string;
  readonly localForceDebug: string | null;
  readonly localSyncedDebug: string | null;
  readonly debugStatus?: DebugStatusSlice | null;
  readonly fleekDashDebug?: boolean;
  readonly metaWpDebug?: boolean;
}

interface FleekDashDebugSlice {
  debug?: boolean;
  debugStatus?: DebugStatusSlice;
  wordPressData?: {
    debug?: boolean;
    debugStatus?: DebugStatusSlice;
  };
}

function parseLocalForceFlag(value: string | null): boolean | null {
  if (value === "1" || value === "true") {
    return true;
  }
  if (value === "0" || value === "false") {
    return false;
  }
  return null;
}

function isExplicitSettingsOff(status: DebugStatusSlice): boolean {
  if (status.debug !== false) {
    return false;
  }
  if (status.force_debug != null) {
    return true;
  }
  return status.source === "database";
}

/**
 * Resolve whether frontend debug logs should run.
 * Priority: local force override, Settings/PHP status, NODE_ENV, FleekDash flags, synced localStorage.
 */
export function resolveFrontendDebugEnabled(input: DebugEnabledInput): boolean {
  const localForce = parseLocalForceFlag(input.localForceDebug);
  if (localForce !== null) {
    return localForce;
  }

  const status = input.debugStatus;
  if (status?.debug === true) {
    return true;
  }
  if (status && isExplicitSettingsOff(status)) {
    return false;
  }

  if (input.nodeEnv === "development") {
    return true;
  }

  if (input.fleekDashDebug === true || input.metaWpDebug === true) {
    return true;
  }

  return input.localSyncedDebug === "true";
}

function readLocalStorageItem(key: string, storage: Storage): string | null {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function getFleekDashDebugSlice(): FleekDashDebugSlice | undefined {
  const browserWindow = getBrowserWindow();
  if (!browserWindow) {
    return undefined;
  }
  return (browserWindow as Window & { FleekDash?: FleekDashDebugSlice })
    .FleekDash;
}

export function readNodeEnv(): string {
  // Vite statically defines import.meta.env.MODE in bundled builds; the
  // process.env fallback covers Node tooling (vitest, tsc, scripts). Reading
  // process via globalThis is intentional: a bare `process.env` reference
  // would throw where the global is absent but undeclared.
  const viteMode = (import.meta as { env?: { MODE?: unknown } }).env?.MODE;
  if (typeof viteMode === "string" && viteMode !== "") {
    return viteMode;
  }
  return (
    (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env
      ?.NODE_ENV ?? ""
  );
}

export function readDebugEnabledInput(): DebugEnabledInput {
  const nodeEnv = readNodeEnv();
  const browserWindow = getBrowserWindow();
  if (!browserWindow) {
    return {
      nodeEnv,
      localForceDebug: null,
      localSyncedDebug: null,
    };
  }

  const fleek = getFleekDashDebugSlice();
  const debugStatus =
    fleek?.debugStatus ?? fleek?.wordPressData?.debugStatus ?? null;
  const fleekDashDebug =
    fleek?.debug === true || fleek?.wordPressData?.debug === true;
  const metaWpDebug =
    browserWindow.document.querySelector(
      'meta[name="wp-debug"][content="true"]',
    ) !== null;

  return {
    nodeEnv,
    localForceDebug: readLocalStorageItem(
      FLEEKDASH_FORCE_DEBUG_STORAGE_KEY,
      browserWindow.localStorage,
    ),
    localSyncedDebug: readLocalStorageItem(
      FLEEKDASH_DEBUG_STORAGE_KEY,
      browserWindow.localStorage,
    ),
    debugStatus,
    fleekDashDebug,
    metaWpDebug,
  };
}

export function applyInMemoryDebugEnabled(enabled: boolean): void {
  const fleek = getFleekDashDebugSlice();
  if (!fleek) {
    return;
  }

  fleek.debug = enabled;
  if (fleek.debugStatus) {
    fleek.debugStatus = { ...fleek.debugStatus, debug: enabled };
  }
  if (fleek.wordPressData) {
    fleek.wordPressData.debug = enabled;
    if (fleek.wordPressData.debugStatus) {
      fleek.wordPressData.debugStatus = {
        ...fleek.wordPressData.debugStatus,
        debug: enabled,
      };
    }
  }
}
