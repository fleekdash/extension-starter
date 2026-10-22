/**
 * FleekDash Button Component - V2.2
 *
 * 🚨 CRITICAL: This is the ONLY button component to use in FleekDash.
 *
 * @see BUTTON_USAGE_GUIDE.md for complete documentation
 *
 * @version 2.2.0 - Migrated to V2.2 with foundations
 */

import { cn } from "../../internal";
import {
  getButtonDefaultErrorText,
  getButtonDefaultLoadingText,
  getButtonDefaultRetryText,
  getButtonDefaultSuccessText,
  getButtonDefaultTimeoutErrorText,
} from "./button-text";
import { useFleekUiConfig } from "../../providers/FleekUiProvider";
import { motion } from "motion/react";
import React, { cloneElement, useMemo, useRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import type { MutableRef } from "./button-types";
import { ButtonRetryRow } from "./ButtonRetryRow";
import { ButtonRowContent } from "./ButtonRowContent";
import {
  buildButtonContentSnapshot,
  computeButtonDisabled,
  resolveMinWidthStyle,
} from "./button-content-snapshot";
import {
  buildBrandColorInlineStyles,
  buildGhostVariantStyleVars,
  resolveButtonClickHandler,
  resolveButtonRadius,
  resolveButtonRowJustifyClass,
  resolveMotionWhileTapScale,
} from "./button-state-helpers";
import { button } from "./button-variants";
import type { ButtonProps, ButtonState } from "./button-types";
export type {
  ButtonContentAlign,
  ButtonProps,
  ButtonState,
} from "./button-types";
import { useButtonInstantLoading } from "./useButtonInstantLoading";
import { useButtonLabelTruncation } from "./useButtonLabelTruncation";
import { useButtonSquircle } from "./useButtonSquircle";
import { useDocumentHtmlThemeClass } from "./useDocumentHtmlThemeClass";
import { tryResolveAsChildSlotPrimitive } from "./resolve-as-child-slot-primitive";
import "./button.css";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      radius = "default",
      children,
      asChild = false,
      icon,
      iconClassName,
      iconPosition = "left",
      squircle,
      squircleSmoothing = "md",
      enableRipple = true,
      clickZoom = false,
      shiny = false,
      brandColor,
      state = null,
      loadingSpinner = "default",
      loadingText = getButtonDefaultLoadingText(),
      successText = getButtonDefaultSuccessText(),
      errorText = getButtonDefaultErrorText(),
      instantLoading = false,
      loadingTimeout = 10000,
      timeoutErrorText = getButtonDefaultTimeoutErrorText(),
      onLoadingTimeout,
      onLoadingStart,
      minWidth,
      showRetry = true,
      retryText = getButtonDefaultRetryText(),
      onRetry,
      clickableInFinalState = false,
      fullWidth = false,
      contentAlign = "center",
      menuChevron = false,
      onClick,
      ...props
    },
    ref,
  ) => {
    const themeClass = useDocumentHtmlThemeClass();

    const customStyles = useMemo(
      () => buildGhostVariantStyleVars(variant),
      [variant],
    );

    const uiSettings = useFleekUiConfig();

    const buttonRef = useRef<HTMLButtonElement>(null);
    const actualRef = (ref ||
      buttonRef) as MutableRef<HTMLButtonElement | null>;

    const buttonRadius = resolveButtonRadius(
      radius,
      uiSettings.defaultButtonRadius,
    );

    useButtonSquircle(actualRef, {
      squircle,
      squircleSmoothing,
      buttonRadius,
      useSquircleFromTheme: uiSettings?.useSquircleButtons,
      themeClass,
    });

    const {
      internalState,
      setInternalState,
      timeoutRef,
      handleClickWithLoading,
    } = useButtonInstantLoading({
      instantLoading,
      state,
      loadingTimeout,
      clickZoom,
      onClick,
      onLoadingStart,
      onLoadingTimeout,
    });

    const effectiveState: ButtonState =
      (instantLoading ? internalState : state) ?? null;

    const asChildSlotPrimitive = asChild
      ? tryResolveAsChildSlotPrimitive(children)
      : null;

    const content = buildButtonContentSnapshot({
      size,
      children,
      slotLabelSource: asChildSlotPrimitive?.labelSource,
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
    });

    const brandColorStyles = buildBrandColorInlineStyles(brandColor);

    const isDisabled = computeButtonDisabled({
      effectiveState,
      clickableInFinalState,
      propsDisabled: props.disabled,
    });

    const { textRef, isTextTruncated } = useButtonLabelTruncation(
      content.isClampableText,
      content.stateText,
    );

    const Comp = asChild ? Slot : motion.button;

    const resolvedMinWidth = resolveMinWidthStyle(content.iconOnly, minWidth);

    const resolvedOnClick = resolveButtonClickHandler(
      instantLoading,
      handleClickWithLoading,
      onClick,
    );
    const whileTapScale = resolveMotionWhileTapScale(clickZoom);

    const contentFullWidth = Boolean(!content.iconOnly && fullWidth);

    const commonProps = {
      className: button({
        variant,
        size,
        radius: buttonRadius,
        state: effectiveState ?? "default",
        enableRipple,
        shiny,
        fullWidth: contentFullWidth,
        className: cn(
          className,
          "btn-base",
          content.iconOnly && "icon-button",
          contentAlign === "left" && "justify-start",
          contentAlign === "right" && "justify-end",
        ),
      }),
      ref: actualRef,
      style: {
        minWidth: resolvedMinWidth,
        ...brandColorStyles,
        ...customStyles,
      },
      disabled: isDisabled,
      "data-state": effectiveState || undefined,
      // globals.css strips button focus box-shadow without this opt-in —
      // the variant's focus-visible:ring-* is dead CSS without it.
      "data-field-focus": "",
      onClick: resolvedOnClick,
      ...(asChild ? {} : { whileTap: whileTapScale }),
      ...props,
    } as React.ComponentPropsWithoutRef<typeof Comp>;

    const layoutRow = content.flattenRichMultiChild ? (
      <span className="z-10 contents">
        {asChildSlotPrimitive ? asChildSlotPrimitive.labelSource : children}
      </span>
    ) : (
      <span
        className={cn(
          "z-10 flex min-h-0 min-w-0 flex-1 items-center leading-none",
          resolveButtonRowJustifyClass(contentAlign),
        )}>
        <ButtonRowContent
          iconOnly={content.iconOnly}
          stateIcon={content.stateIcon}
          size={size}
          children={children}
          iconPosition={iconPosition}
          isClampableText={content.isClampableText}
          isTextTruncated={isTextTruncated}
          stateText={content.stateText}
          textTitle={content.textTitle}
          textRef={textRef}
          iconStyles={content.iconStyles}
          iconTextRowGap={content.iconTextRowGap}
          fullWidth={contentFullWidth}
          hasSideIcon={content.hasSideIcon}
          contentAlign={contentAlign}
          menuChevron={menuChevron}
        />
      </span>
    );

    return (
      <>
        {/* @ts-expect-error - Motion and React have conflicting types for drag/animation handlers */}
        <Comp {...commonProps}>
          {asChildSlotPrimitive
            ? cloneElement(asChildSlotPrimitive.element, {
                children: layoutRow,
              })
            : layoutRow}
        </Comp>

        {showRetry && effectiveState === "error" && (
          <ButtonRetryRow
            retryText={retryText}
            onRetry={onRetry}
            setInternalState={setInternalState}
            timeoutRef={timeoutRef}
          />
        )}
      </>
    );
  },
);

Button.displayName = "Button";

export { Button };
export { button } from "./button-variants";
