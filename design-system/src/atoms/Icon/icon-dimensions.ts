import type { CSSProperties } from "react";

/** Tailwind spacing scale: `w-4` / `size-4` → `1rem` (4 × 0.25). */
const SPACING_UNIT_REM = 0.25;

export type IconBoxDimensions = {
  readonly width: string;
  readonly height: string;
};

/** Safe fallback when no size utilities are present (`1em` collapses when shell uses `fontSize: 0`). */
const DEFAULT_ICON_BOX: IconBoxDimensions = {
  width: "1rem",
  height: "1rem",
};

type CssLengthUnit = "rem" | "px";

function toCssLength(value: string, unit: CssLengthUnit): string {
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return "1rem";
  }
  if (unit === "px") {
    return `${parsed}px`;
  }
  return `${parsed}rem`;
}

function spacingTokenToRem(token: string): string {
  const value = Number.parseFloat(token);
  if (!Number.isFinite(value) || value <= 0) {
    return "1rem";
  }
  return `${value * SPACING_UNIT_REM}rem`;
}

function parseBracketDimension(
  className: string,
  prefix: "size" | "w" | "h",
): string | null {
  const pattern = new RegExp(String.raw`\b${prefix}-\[([\d.]+)(rem|px)\]`);
  const match = pattern.exec(className);
  if (!match?.[1] || !match[2]) {
    return null;
  }
  return toCssLength(match[1], match[2] as CssLengthUnit);
}

function parseScaleDimension(
  className: string,
  prefix: "w" | "h",
): string | null {
  const pattern = new RegExp(String.raw`\b${prefix}-([\d.]+)\b`);
  const match = pattern.exec(className);
  if (!match?.[1]) {
    return null;
  }
  return spacingTokenToRem(match[1]);
}

/**
 * Reads `size-*`, `w-*`, `h-*` (scale + arbitrary) so the icon shell reserves space
 * before Iconify SVG data is available (prevents layout shift).
 */
export function parseIconBoxFromClassName(
  className?: string,
): IconBoxDimensions {
  if (!className?.trim()) {
    return DEFAULT_ICON_BOX;
  }

  const sizeBracket = parseBracketDimension(className, "size");
  if (sizeBracket) {
    return { width: sizeBracket, height: sizeBracket };
  }

  const sizeScale = /\bsize-([\d.]+)\b/.exec(className);
  if (sizeScale?.[1]) {
    const rem = spacingTokenToRem(sizeScale[1]);
    return { width: rem, height: rem };
  }

  const widthBracket = parseBracketDimension(className, "w");
  const heightBracket = parseBracketDimension(className, "h");
  if (widthBracket && heightBracket) {
    return { width: widthBracket, height: heightBracket };
  }

  const widthScale = parseScaleDimension(className, "w");
  const heightScale = parseScaleDimension(className, "h");
  if (widthScale && heightScale) {
    return { width: widthScale, height: heightScale };
  }

  const singleBracket = widthBracket ?? heightBracket;
  if (singleBracket) {
    return { width: singleBracket, height: singleBracket };
  }

  const singleScale = widthScale ?? heightScale;
  if (singleScale) {
    return { width: singleScale, height: singleScale };
  }

  return DEFAULT_ICON_BOX;
}

/** Removes box size utilities from a class string (applied on the reserved shell). */
export function stripIconBoxSizeClasses(className?: string): string {
  if (!className) {
    return "";
  }

  return className
    .replace(/\bsize-[\d.]+\b/g, "")
    .replace(/\bw-[\d.]+\b/g, "")
    .replace(/\bh-[\d.]+\b/g, "")
    .replace(/\b(?:size|w|h)-\[[^\]]+\]\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function iconBoxShellStyle(box: IconBoxDimensions): CSSProperties {
  return {
    width: box.width,
    height: box.height,
    minWidth: box.width,
    minHeight: box.height,
    lineHeight: 1,
  };
}
