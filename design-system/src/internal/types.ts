/**
 * Minimal theme-facing types for Fleek UI.
 * Subset of `@platform/theme/types` — kept tiny so the package never
 * needs the shell's full theme type surface.
 */
export type IconLibrary = "solar" | "lucide";

export type MutableRef<T> = { current: T };
export type ReadonlyRef<T> = { readonly current: T | null };
