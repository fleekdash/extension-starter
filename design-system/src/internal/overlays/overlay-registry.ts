/**
 * Overlay registry utilities
 *
 * Provides a simple registry to keep track of open overlays (popover, tooltip, etc.)
 * associated with a logical container (like a Vaul drawer). This allows us to
 * close overlays proactively when the container is hidden.
 *
 * @layer Platform
 */
import { debugError } from "../debug";

type OverlayCloser = () => void;

function logOverlayCloseError(containerId: string, error: unknown): void {
  debugError(
    "MAIN",
    "[OverlayRegistry] Failed to close overlay for container",
    containerId,
    error,
  );
}

const overlayRegistry = new Map<string, Set<OverlayCloser>>();

export function registerOverlay(containerId: string, closer: OverlayCloser) {
  if (!containerId) return;

  const normalizedId = containerId.trim();
  if (!normalizedId) return;

  let closers = overlayRegistry.get(normalizedId);
  if (!closers) {
    closers = new Set();
    overlayRegistry.set(normalizedId, closers);
  }

  closers.add(closer);
}

export function unregisterOverlay(containerId: string, closer: OverlayCloser) {
  if (!containerId) return;

  const normalizedId = containerId.trim();
  const closers = overlayRegistry.get(normalizedId);
  if (!closers) return;

  closers.delete(closer);
  if (closers.size === 0) {
    overlayRegistry.delete(normalizedId);
  }
}

export function closeOverlaysForContainer(containerId?: string) {
  if (!containerId) return;

  const normalizedId = containerId.trim();
  if (!normalizedId) return;

  const closers = overlayRegistry.get(normalizedId);
  if (!closers) return;

  closers.forEach((close) => {
    try {
      close();
    } catch (error) {
      logOverlayCloseError(normalizedId, error);
    }
  });
}
