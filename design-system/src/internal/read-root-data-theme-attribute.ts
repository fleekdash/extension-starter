/**
 * Reads `data-theme` from the document root.
 *
 * Pure DOM helper — lives in platform so design-system Button code never imports
 * `theme-dom` (which Rollup may co-locate with domain-posts and create TDZ cycles).
 */
export function readRootDataThemeAttribute(
  root: HTMLElement = document.documentElement,
): string | null {
  const attr = root.attributes.getNamedItem("data-theme");
  return attr?.value ?? null;
}
