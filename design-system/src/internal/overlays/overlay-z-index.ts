/**
 * Default z-index for portaled Radix overlays (Select, Popover, DropdownMenu, …).
 *
 * Stack (low → high):
 * - Vaul drawer shell: z-90
 * - Drawer overlay: z-100
 * - Drawer content + this constant: z-110
 *
 * Use on any *Content portaled to document.body inside drawers.
 * Do not pass z-50 / z-220 / z-9999 on individual drawer fields.
 */
export const OVERLAY_CONTENT_Z_ABOVE_DRAWER = "z-110";
