import { cn } from "../../internal";
import { Children, type ReactNode } from "react";
import type { ButtonProps, ButtonState } from "./button-types";
import {
  resolveIconSizeClass,
  resolveIconTextRowGapClass,
  resolveStateIconName,
  resolveStateTextContent,
} from "./button-state-helpers";

export function computeButtonDisabled(params: {
  readonly effectiveState: ButtonState;
  readonly clickableInFinalState: boolean;
  readonly propsDisabled: boolean | undefined;
}): boolean {
  const { effectiveState, clickableInFinalState, propsDisabled } = params;
  return (
    effectiveState === "loading" ||
    effectiveState === "disabled" ||
    (!clickableInFinalState &&
      (effectiveState === "success" || effectiveState === "error")) ||
    Boolean(propsDisabled)
  );
}

export function resolveMinWidthStyle(
  iconOnly: boolean,
  minWidth: string | number | undefined,
): string | undefined {
  if (iconOnly || !minWidth) {
    return undefined;
  }
  return typeof minWidth === "number" ? `${minWidth}px` : minWidth;
}

export interface ButtonContentSnapshot {
  readonly stateIcon: string | undefined;
  readonly stateText: ReactNode;
  readonly isClampableText: boolean;
  readonly textTitle: string | undefined;
  readonly hasSideIcon: boolean;
  readonly iconTextRowGap: string;
  readonly iconOnly: boolean;
  readonly iconStyles: string;
  /**
   * Multiple non-string children without a side icon: skip inner flex wrappers so the
   * button's own flex (e.g. justify-between, gap-2) applies to each child (CMDK, "New", inline counters).
   */
  readonly flattenRichMultiChild: boolean;
}

export function buildButtonContentSnapshot(params: {
  readonly size: ButtonProps["size"];
  readonly children: ReactNode;
  /**
   * When `asChild` merges onto `<a>` / `<button>`, label and clamp/tooltip logic use this node
   * instead of the wrapper element.
   */
  readonly slotLabelSource?: ReactNode;
  readonly icon?: string;
  readonly iconClassName?: string;
  readonly iconPosition: NonNullable<ButtonProps["iconPosition"]>;
  readonly effectiveState: ButtonState;
  readonly loadingSpinner: ButtonProps["loadingSpinner"];
  readonly loadingText: string;
  readonly successText: string;
  readonly errorText: string;
  readonly timeoutErrorText: string;
  readonly instantLoading: boolean;
  readonly internalState: ButtonProps["state"];
}): ButtonContentSnapshot {
  const {
    size,
    children,
    slotLabelSource,
    icon,
    iconClassName,
    iconPosition,
    effectiveState,
    loadingSpinner,
    loadingText,
    successText,
    errorText,
    timeoutErrorText,
    instantLoading,
    internalState,
  } = params;

  const iconSizeClass = resolveIconSizeClass(size);
  const iconOnly = size === "icon" || Boolean(!children && icon);
  const iconStyles = cn(iconSizeClass, iconClassName, iconOnly && "m-auto");

  const stateIcon = resolveStateIconName(effectiveState, icon, loadingSpinner);
  const stateText = resolveStateTextContent({
    effectiveState,
    loadingText,
    successText,
    errorText,
    timeoutErrorText,
    instantLoading,
    internalState,
    children: slotLabelSource ?? children,
  });
  const isClampableText =
    typeof stateText === "string" || typeof stateText === "number";
  const textTitle = typeof stateText === "string" ? stateText : undefined;

  const hasSideIcon =
    !iconOnly &&
    Boolean(stateIcon) &&
    (iconPosition === "left" || iconPosition === "right");

  const iconTextRowGap = hasSideIcon ? resolveIconTextRowGapClass(size) : "";

  const flattenRichMultiChild =
    !iconOnly &&
    !isClampableText &&
    Children.count(children) > 1 &&
    !hasSideIcon;

  return {
    stateIcon,
    stateText,
    isClampableText,
    textTitle,
    hasSideIcon,
    iconTextRowGap,
    iconOnly,
    iconStyles,
    flattenRichMultiChild,
  };
}
