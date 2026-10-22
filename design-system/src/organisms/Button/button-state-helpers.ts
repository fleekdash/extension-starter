import { readRootDataThemeAttribute } from "../../internal";
import { debugWarn } from "../../internal";
import type { MouseEventHandler, ReactNode } from "react";
import type {
  ButtonContentAlign,
  ButtonProps,
  ButtonSizeProp,
  ButtonState,
} from "./button-types";

/** Main-axis `justify-*` for button row (icon + label). */
export function resolveButtonRowJustifyClass(
  align: ButtonContentAlign,
): "justify-start" | "justify-center" | "justify-end" {
  switch (align) {
    case "left":
      return "justify-start";
    case "right":
      return "justify-end";
    default:
      return "justify-center";
  }
}

/** Logical icon keys for Button loading/success/error states (icons-map keys). */
export type ButtonStateIconKey =
  | "loading"
  | "pulse"
  | "loadingInfinity"
  | "loadingTwist"
  | "check"
  | "danger";

export function buildBrandColorInlineStyles(
  brandColor: string | undefined,
): Record<string, string> {
  if (!brandColor) {
    return {};
  }
  return {
    backgroundColor: brandColor,
    "--brand-color": brandColor,
  };
}

export function resolveMotionWhileTapScale(
  clickZoom: boolean,
): { readonly scale: number } | undefined {
  return clickZoom ? { scale: 0.95 } : undefined;
}

export function resolveButtonClickHandler(
  instantLoading: boolean,
  handleClickWithLoading: MouseEventHandler<HTMLButtonElement>,
  onClick: ButtonProps["onClick"],
): ButtonProps["onClick"] {
  return instantLoading ? handleClickWithLoading : onClick;
}

export function buildGhostVariantStyleVars(
  variant: ButtonProps["variant"],
): Record<string, string> {
  if (variant !== "ghost" && variant !== "ghost-default") {
    return {};
  }
  return {
    "--ghost-hover-bg": "var(--muted)",
    "--ghost-hover-text": "var(--muted-foreground)",
  };
}

export function resolveButtonRadius(
  radius: ButtonProps["radius"],
  themeDefaultRadius: string | undefined,
): ButtonProps["radius"] {
  if (radius === "default" && themeDefaultRadius !== "default") {
    return themeDefaultRadius as ButtonProps["radius"];
  }
  return radius;
}

export function resolveIconSizeClass(size: ButtonSizeProp): string {
  if (size === "xs") {
    return "h-3.5 w-3.5";
  }
  if (size === "sm") {
    return "h-4 w-4";
  }
  return "h-5 w-5";
}

export function resolveIconTextRowGapClass(size: ButtonSizeProp): string {
  switch (size) {
    case "xs":
      return "gap-2";
    case "sm":
      return "gap-2";
    case "lg":
      return "gap-3";
    case "xl":
      return "gap-3.5";
    case "filter-xs":
      return "gap-2";
    default:
      return "gap-2";
  }
}

export function resolveSpinnerIconKey(
  loadingSpinner: ButtonProps["loadingSpinner"],
): ButtonStateIconKey {
  switch (loadingSpinner) {
    case "alt":
      return "pulse";
    case "infinity":
      return "loadingInfinity";
    case "twist":
      return "loadingTwist";
    default:
      return "loading";
  }
}

export function resolveStateIconName(
  effectiveState: ButtonState,
  icon: string | undefined,
  loadingSpinner: ButtonProps["loadingSpinner"],
): string | undefined {
  if (effectiveState === "loading") {
    return resolveSpinnerIconKey(loadingSpinner);
  }
  if (effectiveState === "success") {
    return "check";
  }
  if (effectiveState === "error") {
    return "danger";
  }
  return icon;
}

export function resolveStateTextContent(params: {
  readonly effectiveState: ButtonState;
  readonly loadingText: string;
  readonly successText: string;
  readonly errorText: string;
  readonly timeoutErrorText: string;
  readonly instantLoading: boolean;
  readonly internalState: ButtonProps["state"];
  readonly children: ReactNode;
}): ReactNode {
  const {
    effectiveState,
    loadingText,
    successText,
    errorText,
    timeoutErrorText,
    instantLoading,
    internalState,
    children,
  } = params;

  if (effectiveState === "loading") {
    return loadingText;
  }
  if (effectiveState === "success") {
    return successText;
  }
  if (effectiveState === "error") {
    return internalState === "error" && instantLoading
      ? timeoutErrorText
      : errorText;
  }
  return children;
}

export function readThemeSquircleFromDocument(
  useSquircleFromContext: boolean | undefined,
): boolean {
  try {
    const cssUseSquircle = getComputedStyle(document.documentElement)
      .getPropertyValue("--use-squircle-buttons")
      .trim();

    const squircleValue = Number(cssUseSquircle);
    if (!Number.isNaN(squircleValue)) {
      return squircleValue === 1;
    }

    const currentTheme = readRootDataThemeAttribute();
    if (currentTheme === "starter") {
      return true;
    }
    if (currentTheme === "modern") {
      return false;
    }

    return useSquircleFromContext ?? false;
  } catch (error) {
    debugWarn("SETTINGS", "Error reading squircle settings", error);
    return false;
  }
}
