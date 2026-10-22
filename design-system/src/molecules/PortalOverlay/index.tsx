/**
 * PortalOverlay - fullscreen overlay layer portaled to document.body.
 *
 * The standard FleekDash scrim: light, frosted (`bg-background/50` +
 * `backdrop-blur-[2px]`), the same recipe as the CMDK palette and
 * MobileOverlay/SidebarLeftShell,
 * with a `fade-in-0 duration-200` entrance (motion-safe). Content
 * children pair it with `zoom-in-95` for the standard modal entrance.
 * Portaling is required, not cosmetic: the app shell's MainScrollRegion
 * sets `transform: translateZ(0)` + `contain: layout`, which re-scopes
 * `position: fixed` to the <main> region, so a non-portaled overlay
 * covers only the content area instead of the app.
 *
 * Convention: fullscreen overlays/modals use this component. Do not
 * hand-roll `fixed inset-0` scrims or per-feature dark scrims.
 * Radix-based dialogs (Overlay/Content primitives that cannot consume
 * this component) reuse the exported surface constants below instead
 * so every modal shares one source for scrim color/blur and card chrome.
 *
 * @layer Design System (Layer 1)
 */

import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { cn } from "../../internal";
import { getBrowserWindow } from "../../internal";

/**
 * Scrim surface tokens (light, frosted). Radix Overlay primitives add
 * their own `fixed inset-0`, z class and data-state animations on top.
 */
export const PORTAL_SCRIM_SURFACE_CLASS =
  "bg-background/50 backdrop-blur-[2px]";

/**
 * Card chrome for every modal (bg, border, radius, shadow) - one
 * surface whether the modal is a full-size editor or a small confirm.
 */
export const PORTAL_MODAL_SURFACE_CLASS =
  "bg-card border-border rounded-xl border shadow-xl";

/**
 * Mount-time modal entrance for non-Radix content (the scrim's sibling).
 * Radix Content uses its data-[state] animation classes instead.
 */
export const PORTAL_MODAL_ENTER_CLASS =
  "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:duration-200 motion-safe:ease-out";

export interface PortalOverlayProps {
  readonly children?: ReactNode;
  /**
   * Fires only on presses that START on the scrim (mousedown target is
   * the scrim itself); wire to click-outside-to-close. MouseDown, not
   * click: a drag begun inside the content and released over the scrim
   * resolves its click to the common ancestor (the scrim) and would
   * wrongly close the overlay.
   */
  readonly onBackdropMouseDown?: () => void;
  /** Extra classes merged onto the scrim (layout overrides, scoping). */
  readonly className?: string;
  /** Tailwind z token; default covers all app chrome. */
  readonly zIndex?: string;
}

export function PortalOverlay({
  children,
  onBackdropMouseDown,
  className,
  zIndex = "z-9999",
}: Readonly<PortalOverlayProps>) {
  const browserWindow = getBrowserWindow();
  if (!browserWindow) return null;
  return createPortal(
    // NOSONAR S6678 S6598 - overlay backdrop; keyboard handling is the
    // caller's decision (e.g. Escape may conflict with inner tools).
    <div
      role="presentation"
      className={cn(
        PORTAL_SCRIM_SURFACE_CLASS,
        "fixed inset-0 flex items-center justify-center",
        "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-200",
        zIndex,
        className,
      )}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onBackdropMouseDown?.();
      }}>
      {children}
    </div>,
    browserWindow.document.body,
  );
}
