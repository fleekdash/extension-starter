/**
 * Browser environment helpers.
 * Keep this module dependency-free to allow safe imports anywhere.
 */

/** Return type of `globalThis.setTimeout` (DOM `number` + `NodeJS.Timeout` under mixed typings). */
export type GlobalTimeoutId = ReturnType<typeof globalThis.setTimeout>;

export function getBrowserWindow(): Window | null {
  return globalThis.window ?? null;
}

export function isBrowserEnvironment(): boolean {
  return getBrowserWindow() !== null;
}

/**
 * Same-origin iframe document only. `contentWindow.document` throws SecurityError
 * when the frame is opaque (WP 7.1 DIP / cross-origin). `contentDocument` is null.
 */
export function getSameOriginIframeDocument(
  iframe: HTMLIFrameElement | null | undefined,
): Document | null {
  if (!iframe) {
    return null;
  }

  try {
    return iframe.contentDocument ?? null;
  } catch {
    return null;
  }
}

/**
 * Suppresses the next document click in the capture phase.
 *
 * dnd-kit fires a trailing `click` after a drag ends; this prevents that
 * ghost click from reaching click handlers on the dragged element.
 */
export function suppressNextDocumentClick(): void {
  const browserWindow = getBrowserWindow();
  if (!browserWindow) {
    return;
  }
  const doc = browserWindow.document;

  function onClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    teardown();
  }
  function teardown() {
    doc.removeEventListener("click", onClick, true);
    doc.removeEventListener("pointerdown", teardown, true);
  }

  doc.addEventListener("click", onClick, true);
  doc.addEventListener("pointerdown", teardown, true);

  // The ghost click arrives within the gesture that ended the drag. A drag
  // cancelled via Escape produces none, so the listener cannot wait for the
  // next click indefinitely — it would swallow a real one instead.
  globalThis.setTimeout(teardown, 350);
}
