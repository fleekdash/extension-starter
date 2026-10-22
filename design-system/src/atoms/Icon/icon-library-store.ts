/**
 * Active icon library — synced from IconSystemProvider (app-components chunk).
 * Keeps vendor-iconify from importing theme-config-context (platform-core TDZ).
 */
import type { IconLibrary } from "../../internal/types";

type Listener = () => void;

let iconLibrary: IconLibrary = "lucide";
const listeners = new Set<Listener>();

export function setIconLibrary(library: IconLibrary): void {
  if (iconLibrary === library) {
    return;
  }
  iconLibrary = library;
  for (const listener of listeners) {
    listener();
  }
}

export function getIconLibrary(): IconLibrary {
  return iconLibrary;
}

export function subscribeIconLibrary(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
