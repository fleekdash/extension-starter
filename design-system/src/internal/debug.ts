/**
 * Intelligent Debug System for FleekDash
 * Controls when and how debug logs are executed to prevent performance issues
 */

import { getBrowserWindow } from "./browser-env";
import {
  applyInMemoryDebugEnabled,
  FLEEKDASH_DEBUG_CHANGED_EVENT,
  FLEEKDASH_DEBUG_STORAGE_KEY,
  readDebugEnabledInput,
  resolveFrontendDebugEnabled,
} from "./debug-enabled";

// Debug configuration
interface DebugConfig {
  enabled: boolean;
  logLevel: "debug" | "info" | "warn" | "error";
  maxLogsPerSecond: number;
  consoleOpenDetection: boolean;
  throttleWhenConsoleOpen: boolean;
}

class IntelligentDebugger {
  private config: DebugConfig;
  private readonly logCount: Map<string, number> = new Map();
  private readonly lastLogTime: Map<string, number> = new Map();
  private isConsoleOpen = false;
  private consoleCheckInterval: ReturnType<
    typeof globalThis.setInterval
  > | null = null;

  constructor() {
    this.config = {
      enabled: false,
      logLevel: "debug",
      maxLogsPerSecond: 10,
      consoleOpenDetection: true,
      throttleWhenConsoleOpen: true,
    };

    this.initConsoleDetection();
    this.syncFromEnvironment();
  }

  syncFromEnvironment(): void {
    this.configure({
      enabled: resolveFrontendDebugEnabled(readDebugEnabledInput()),
    });
  }

  /**
   * Detect if console is open (performance optimization)
   */
  private initConsoleDetection() {
    const browserWindow = getBrowserWindow();
    if (!browserWindow || !this.config.consoleOpenDetection) {
      return;
    }

    const devtools = {
      open: false,
      orientation: null as "vertical" | "horizontal" | null,
    };

    const threshold = 160;

    const detectConsole = () => {
      if (
        browserWindow.outerHeight - browserWindow.innerHeight > threshold ||
        browserWindow.outerWidth - browserWindow.innerWidth > threshold
      ) {
        if (!devtools.open) {
          devtools.open = true;
          this.isConsoleOpen = true;
          this.onConsoleOpen();
        }
      } else if (devtools.open) {
        devtools.open = false;
        this.isConsoleOpen = false;
        this.onConsoleClose();
      }
    };

    // Check every 5 seconds (reduced frequency for better performance)
    this.consoleCheckInterval = globalThis.setInterval(detectConsole, 5000);

    // Pause console detection when page is hidden for performance
    const handleVisibilityChange = () => {
      if (this.consoleCheckInterval !== null) {
        globalThis.clearInterval(this.consoleCheckInterval);
        this.consoleCheckInterval = null;
      }

      // Only restart if page is visible
      if (!browserWindow.document.hidden) {
        this.consoleCheckInterval = globalThis.setInterval(detectConsole, 5000);
      }
    };

    browserWindow.document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    // Initial check
    detectConsole();
  }

  private onConsoleOpen() {
    if (this.config.throttleWhenConsoleOpen) {
      this.config.maxLogsPerSecond = 5; // Reduce logs when console is open
    }
  }

  private onConsoleClose() {
    if (this.config.throttleWhenConsoleOpen) {
      this.config.maxLogsPerSecond = 10; // Restore normal rate when console is closed
    }
  }

  /**
   * Check if a log should be executed based on throttling rules
   */
  private shouldLog(
    category: string,
    level: "debug" | "info" | "warn" | "error",
  ): boolean {
    if (!this.config.enabled) return false;

    const now = Date.now();
    const lastTime = this.lastLogTime.get(category) || 0;
    const timeDiff = now - lastTime;

    // Reset counters every second
    if (timeDiff > 1000) {
      this.logCount.set(category, 0);
      this.lastLogTime.set(category, now);
    }

    const currentCount = this.logCount.get(category) || 0;

    // Check if we're exceeding the rate limit
    if (currentCount >= this.config.maxLogsPerSecond) {
      return false;
    }

    // Always allow error logs
    if (level === "error") return true;

    // Check log level hierarchy
    const levels = ["debug", "info", "warn", "error"];
    const currentLevelIndex = levels.indexOf(this.config.logLevel);
    const logLevelIndex = levels.indexOf(level);

    if (logLevelIndex < currentLevelIndex) {
      return false;
    }

    // Increment counter
    this.logCount.set(category, currentCount + 1);

    return true;
  }

  /**
   * Smart debug logging with category and throttling
   */
  debug(category: string, message: string, ...args: any[]) {
    if (this.shouldLog(category, "debug")) {
      console.log(`[DEBUG:${category}] ${message}`, ...args);
    }
  }

  info(category: string, message: string, ...args: any[]) {
    if (this.shouldLog(category, "info")) {
      console.info(`[INFO:${category}] ${message}`, ...args);
    }
  }

  warn(category: string, message: string, ...args: any[]) {
    if (this.shouldLog(category, "warn")) {
      console.warn(`[WARN:${category}] ${message}`, ...args);
    }
  }

  error(category: string, message: string, ...args: any[]) {
    if (this.config.enabled) {
      console.error(`[FleekDash][ERROR:${category}] ${message}`, ...args);
      return;
    }
    // Debug off: no debug/info/warn noise, but keep a copy-pasteable error line for support.
    // Extra args (Error objects, API payloads) are omitted to avoid leaking context data.
    console.error(`[FleekDash][ERROR:${category}] ${message}`);
  }

  /**
   * Configure debug settings
   */
  configure(config: Partial<DebugConfig>) {
    this.config = { ...this.config, ...config };
  }

  /**
   * Check if debug is enabled
   */
  get enabled(): boolean {
    return this.config.enabled;
  }

  /**
   * Get current debug statistics
   */
  getStats() {
    return {
      isConsoleOpen: this.isConsoleOpen,
      config: this.config,
      logCounts: Object.fromEntries(this.logCount),
      lastLogTimes: Object.fromEntries(this.lastLogTime),
    };
  }

  /**
   * Clean up resources
   */
  destroy() {
    if (this.consoleCheckInterval !== null) {
      globalThis.clearInterval(this.consoleCheckInterval);
      this.consoleCheckInterval = null;
    }
  }
}

interface SmartDebuggerGlobalSlot {
  __fleekdashSmartDebugger?: IntelligentDebugger;
}

/**
 * Lazy singleton on globalThis — survives Rollup reordering inside platform-core where
 * exported debugLog() can run before a module-level `const` holder is initialized (TDZ).
 */
function getSmartDebugger(): IntelligentDebugger {
  const slot = globalThis as SmartDebuggerGlobalSlot;
  slot.__fleekdashSmartDebugger ??= new IntelligentDebugger();
  return slot.__fleekdashSmartDebugger;
}

function clearSmartDebugger(): void {
  const slot = globalThis as SmartDebuggerGlobalSlot;
  slot.__fleekdashSmartDebugger?.destroy();
  slot.__fleekdashSmartDebugger = undefined;
}

/**
 * Proxy preserves the same surface as IntelligentDebugger for components that import
 * `smartDebugger` directly (e.g. diagnostic pages) while deferring construction.
 */
export const smartDebugger: IntelligentDebugger = new Proxy(
  {} as IntelligentDebugger,
  {
    get(_target, prop, receiver) {
      const inst = getSmartDebugger();
      const value = Reflect.get(inst, prop, receiver);
      if (typeof value === "function") {
        return value.bind(inst);
      }
      return value;
    },
  },
);

// Convenience functions for backward compatibility
export function debugLog(category: string, message: string, ...args: any[]) {
  getSmartDebugger().debug(category, message, ...args);
}

export function debugInfo(category: string, message: string, ...args: any[]) {
  getSmartDebugger().info(category, message, ...args);
}

export function debugWarn(category: string, message: string, ...args: any[]) {
  getSmartDebugger().warn(category, message, ...args);
}

export function debugError(category: string, message: string, ...args: any[]) {
  getSmartDebugger().error(category, message, ...args);
}

// Original debug functions for backward compatibility
export function fleekdash_log(message: string, ...args: any[]) {
  getSmartDebugger().debug("general", message, ...args);
}

export function fleekdash_log_info(message: string, ...args: any[]) {
  getSmartDebugger().info("general", message, ...args);
}

export function fleekdash_log_warn(message: string, ...args: any[]) {
  getSmartDebugger().warn("general", message, ...args);
}

export function fleekdash_log_error(message: string, ...args: any[]) {
  getSmartDebugger().error("general", message, ...args);
}

export function fleekdash_log_debug(message: string, ...args: any[]) {
  getSmartDebugger().debug("general", message, ...args);
}

export function isFrontendDebugEnabled(): boolean {
  return getSmartDebugger().enabled;
}

export function syncSmartDebuggerFromEnvironment(
  enabledOverride?: boolean,
): void {
  if (typeof enabledOverride === "boolean") {
    applyInMemoryDebugEnabled(enabledOverride);
    getSmartDebugger().configure({ enabled: enabledOverride });
    return;
  }
  getSmartDebugger().syncFromEnvironment();
}

function handleDebugChanged(event: Event): void {
  const detail = (event as CustomEvent<{ enabled?: boolean }>).detail;
  if (typeof detail?.enabled === "boolean") {
    syncSmartDebuggerFromEnvironment(detail.enabled);
    return;
  }
  syncSmartDebuggerFromEnvironment();
}

// Clean up on page unload (resolve window per attachment; do not cache SSR null).
(() => {
  const unloadTarget = getBrowserWindow();
  if (!unloadTarget) {
    return;
  }
  unloadTarget.addEventListener("beforeunload", () => {
    clearSmartDebugger();
  });
  unloadTarget.addEventListener(
    FLEEKDASH_DEBUG_CHANGED_EVENT,
    handleDebugChanged,
  );
  // Cross-tab sync: another tab toggling debug writes localStorage without the
  // in-page event — the "storage" event only fires on the *other* tabs.
  unloadTarget.addEventListener("storage", (event: StorageEvent) => {
    if (event.key === FLEEKDASH_DEBUG_STORAGE_KEY) {
      syncSmartDebuggerFromEnvironment();
    }
  });
})();
