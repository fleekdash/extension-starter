import { makeSquircle } from "../../internal";
import { useCallback, useEffect, useMemo } from "react";
import type { ButtonProps, MutableRef } from "./button-types";
import { readThemeSquircleFromDocument } from "./button-state-helpers";

export function useButtonSquircle(
  actualRef: MutableRef<HTMLButtonElement | null>,
  options: {
    readonly squircle: boolean | undefined;
    readonly squircleSmoothing: NonNullable<ButtonProps["squircleSmoothing"]>;
    readonly buttonRadius: ButtonProps["radius"];
    readonly useSquircleFromTheme: boolean | undefined;
    readonly themeClass: string;
  },
): void {
  const {
    squircle,
    squircleSmoothing,
    buttonRadius,
    useSquircleFromTheme,
    themeClass,
  } = options;

  const getThemeSquircleSettings = useCallback(() => {
    return readThemeSquircleFromDocument(useSquircleFromTheme);
  }, [useSquircleFromTheme]);

  const squircleEnabled = useMemo(() => {
    if (squircle !== undefined) {
      return squircle;
    }
    return getThemeSquircleSettings();
  }, [squircle, getThemeSquircleSettings]);

  const enableSquircle = useMemo(() => {
    return (
      Boolean(squircleEnabled) &&
      buttonRadius !== "none" &&
      buttonRadius !== "full"
    );
  }, [squircleEnabled, buttonRadius]);

  const cleanupSquircle = useCallback(() => {
    const el = actualRef.current;
    if (!el) {
      return;
    }

    el.classList.remove(
      "squircle",
      "squircle-sm",
      "squircle-md",
      "squircle-lg",
      "mask-squircle",
    );

    el.style.removeProperty("mask");
    el.style.removeProperty("-webkit-mask");
    el.style.removeProperty("border-radius");
    el.style.removeProperty("--squircle-mask");
    el.style.removeProperty("mask-image");
    el.style.removeProperty("-webkit-mask-image");
  }, [actualRef]);

  useEffect(() => {
    cleanupSquircle();

    if (enableSquircle && actualRef.current) {
      const el = actualRef.current;
      if (squircleSmoothing) {
        el.classList.add(`squircle-${squircleSmoothing}`);
      }
      el.classList.add("squircle");
      el.style.borderRadius = "16px";
      makeSquircle(el);
    }

    return () => {
      cleanupSquircle();
    };
  }, [
    enableSquircle,
    squircleSmoothing,
    actualRef,
    cleanupSquircle,
    themeClass,
  ]);
}
