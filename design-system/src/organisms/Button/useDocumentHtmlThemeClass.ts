import { useSyncExternalStore } from "react";

/**
 * Shared subscription to `<html class>` theme changes.
 * Every Button (and any other consumer) used to create its own
 * MutationObserver on documentElement — one shared observer now serves
 * all subscribers via useSyncExternalStore.
 */
const listeners = new Set<() => void>();
let observer: MutationObserver | null = null;

const readThemeClass = (): string =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const ensureObserver = (): void => {
  if (observer !== null) return;

  observer = new MutationObserver((mutations) => {
    const classChanged = mutations.some(
      (mutation) => mutation.attributeName === "class",
    );
    if (classChanged) {
      listeners.forEach((listener) => listener());
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
};

const subscribe = (listener: () => void): (() => void) => {
  listeners.add(listener);
  ensureObserver();

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && observer !== null) {
      observer.disconnect();
      observer = null;
    }
  };
};

/**
 * Tracks `dark` / `light` from `<html class>` so squircle and other DOM-bound styles re-run when the document theme toggles.
 */
export function useDocumentHtmlThemeClass(): string {
  return useSyncExternalStore(subscribe, readThemeClass);
}
