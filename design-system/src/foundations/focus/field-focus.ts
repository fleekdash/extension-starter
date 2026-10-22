/**
 * Shared field focus styles — border + solid outer ring (zero blur).
 *
 * Ring color matches border (`--field-focus-ring` = `--primary`).
 * Width is controlled by `--field-focus-ring-width` (default 1px).
 *
 * NOTE: Keep class names as full string literals so Tailwind can detect them.
 */

/** Solid outer ring (idle / shared shadow token). */
export const FIELD_FOCUS_RING_SHADOW =
  "shadow-[0_0_0_var(--field-focus-ring-width)_var(--field-focus-ring)]";

/** Solid outer ring for invalid / destructive state. */
export const FIELD_FOCUS_RING_SHADOW_DESTRUCTIVE =
  "shadow-[0_0_0_var(--field-focus-ring-width)_var(--field-focus-ring-destructive)]";

/** Fast, smooth transition matching HeroUI form motion. */
export const FIELD_FOCUS_TRANSITION =
  "transition-[border-color,box-shadow] duration-150 ease-out motion-reduce:transition-none";

/** Native control focus (input, textarea) via :focus-visible. */
export const FIELD_FOCUS_VISIBLE =
  "focus-visible:border-primary focus-visible:shadow-[0_0_0_var(--field-focus-ring-width)_var(--field-focus-ring)] focus-visible:outline-none";

/** Invalid + focus-visible (native controls). */
export const FIELD_FOCUS_VISIBLE_INVALID =
  "aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:shadow-[0_0_0_var(--field-focus-ring-width)_var(--field-focus-ring-destructive)]";

/** Container focus-within (InputGroup, composite fields). */
export const FIELD_FOCUS_WITHIN =
  "focus-within:border-primary focus-within:shadow-[0_0_0_var(--field-focus-ring-width)_var(--field-focus-ring)]";

/** Invalid + focus-within (composite fields). */
export const FIELD_FOCUS_WITHIN_INVALID =
  "aria-invalid:border-destructive aria-invalid:focus-within:border-destructive aria-invalid:focus-within:shadow-[0_0_0_var(--field-focus-ring-width)_var(--field-focus-ring-destructive)]";

/**
 * Wrapper that reacts to a nested focus-visible control
 * (InputWrapper / date field shells).
 */
export const FIELD_FOCUS_HAS_VISIBLE =
  "has-[:focus-visible]:border-primary has-[:focus-visible]:shadow-[0_0_0_var(--field-focus-ring-width)_var(--field-focus-ring)] has-[:focus-visible]:outline-none";

/** Imperative / JS-driven focused state (e.g. SearchInput container). */
export const FIELD_FOCUS_ACTIVE =
  "border-primary shadow-[0_0_0_var(--field-focus-ring-width)_var(--field-focus-ring)]";

/** Hover — same border + solid ring (CMDK trigger, field-like controls). */
export const FIELD_HOVER =
  "hover:border-primary hover:shadow-[0_0_0_var(--field-focus-ring-width)_var(--field-focus-ring)]";

/** Open / expanded trigger (Select, Combobox). */
export const FIELD_FOCUS_OPEN =
  "data-[state=open]:border-primary data-[state=open]:shadow-[0_0_0_var(--field-focus-ring-width)_var(--field-focus-ring)]";

/** Accent border + ring (sidebar search when active). */
export const FIELD_FOCUS_VISIBLE_ACCENT =
  "focus:border-accent focus-visible:border-accent focus:shadow-[0_0_0_var(--field-focus-ring-width)_var(--field-focus-ring-accent)] focus-visible:shadow-[0_0_0_var(--field-focus-ring-width)_var(--field-focus-ring-accent)]";

/**
 * Interactive shell (CMDK search trigger): transition + hover + focus-visible.
 * Use with `data-field-focus` so globals.css does not strip the focus shadow.
 */
export const FIELD_INTERACTIVE = `${FIELD_FOCUS_TRANSITION} ${FIELD_HOVER} ${FIELD_FOCUS_VISIBLE}`;

/** Full recipe for a standalone text field. */
export const FIELD_FOCUS_CONTROL = `${FIELD_FOCUS_TRANSITION} ${FIELD_FOCUS_VISIBLE} ${FIELD_FOCUS_VISIBLE_INVALID}`;
