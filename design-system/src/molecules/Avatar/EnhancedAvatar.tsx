"use client";

import { cn } from "../../internal";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva } from "class-variance-authority";
import * as React from "react";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden border-2 border-card bg-muted",
  {
    variants: {
      size: {
        sm: "size-7",
        md: "size-8",
        lg: "size-10",
        xl: "size-11",
        "2xl": "size-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center bg-muted font-medium text-center leading-none -translate-y-[0.5px]",
  {
    variants: {
      size: {
        sm: "text-[9px]",
        md: "text-xs",
        lg: "text-sm",
        xl: "text-sm",
        "2xl": "text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const COLOR_PALETTE = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#84cc16",
  "#00a32a",
  "#06b6d4",
  "#3858e9",
  "#8c00ff",
  "#ec4899",
  "#a3a3a3",
] as const;

const AVATAR_LOAD_TIMEOUT_MS = 2000;

/**
 * Gravatar `d` values that do not return a visible photo.
 * Do not include `404` — AvatarManager may probe with d=404 but verified photo URLs
 * must still load; unresolved d=404 URLs fail via onError instead.
 */
const GRAVATAR_NO_IMAGE_PARAMS = new Set(["blank"]);

type AvatarRadius =
  | "none"
  | "sm"
  | "default"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

const RADIUS_CLASS_MAP: Record<AvatarRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  default: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

const hashToColor = (seed: string): string => {
  if (!seed) {
    return COLOR_PALETTE[COLOR_PALETTE.length - 1];
  }

  let hash = 0;
  for (let i = 0; i < seed.length; ) {
    const codePoint = seed.codePointAt(i) ?? 0;
    hash = Math.trunc((hash << 5) - hash + codePoint);
    i += codePoint > 0xffff ? 2 : 1;
  }

  const idx = Math.abs(hash) % COLOR_PALETTE.length;
  return COLOR_PALETTE[idx];
};

const getInitials = (value?: string | null): string => {
  if (!value) {
    return "";
  }

  const clean = String(value).trim();
  if (clean === "") {
    return "";
  }

  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  const first = parts[0]?.[0] ?? "";
  const last = parts[parts.length - 1]?.[0] ?? "";
  return `${first}${last}`.toUpperCase();
};

const isWordPressPlaceholderAvatar = (url?: string): boolean => {
  if (!url) {
    return false;
  }

  try {
    const trimmed = url.trim();
    if (trimmed === "") {
      return false;
    }

    const normalized = trimmed.startsWith("//") ? `https:${trimmed}` : trimmed;
    const parsed = new URL(normalized);
    if (!parsed.hostname.toLowerCase().includes("gravatar.com")) {
      return false;
    }

    const defaultParam =
      parsed.searchParams.get("d") || parsed.searchParams.get("default");
    if (!defaultParam) {
      return false;
    }

    return GRAVATAR_NO_IMAGE_PARAMS.has(defaultParam.toLowerCase());
  } catch {
    return false;
  }
};

function normalizeAvatarSrc(src?: string): string | undefined {
  if (!src || src.trim() === "") {
    return undefined;
  }

  const trimmedSrc = src.trim();
  if (isWordPressPlaceholderAvatar(trimmedSrc)) {
    return undefined;
  }

  return trimmedSrc;
}

function resolveRadiusClass(
  radius: AvatarRadius | undefined,
  className?: string,
): string | undefined {
  if (radius) {
    return RADIUS_CLASS_MAP[radius];
  }

  if (className?.includes("rounded-")) {
    return undefined;
  }

  return RADIUS_CLASS_MAP.full;
}

function useAvatarImageLoadState(normalizedSrc: string | undefined) {
  const [hasError, setHasError] = React.useState(false);
  const imageLoadedRef = React.useRef(false);
  const hasErrorRef = React.useRef(false);
  const previousSrcRef = React.useRef<string | undefined>(undefined);

  React.useEffect(() => {
    const srcChanged = previousSrcRef.current !== normalizedSrc;

    if (srcChanged) {
      setHasError(false);
      imageLoadedRef.current = false;
      hasErrorRef.current = false;
      previousSrcRef.current = normalizedSrc;
    }

    if (!normalizedSrc || !srcChanged) {
      return undefined;
    }

    const timeoutId = globalThis.setTimeout(() => {
      if (!imageLoadedRef.current && !hasErrorRef.current) {
        setHasError(true);
        hasErrorRef.current = true;
      }
    }, AVATAR_LOAD_TIMEOUT_MS);

    return () => {
      globalThis.clearTimeout(timeoutId);
    };
  }, [normalizedSrc]);

  const handleImageError = React.useCallback(() => {
    setHasError(true);
    hasErrorRef.current = true;
    imageLoadedRef.current = false;
  }, []);

  const handleImageLoad = React.useCallback(() => {
    setHasError(false);
    imageLoadedRef.current = true;
    hasErrorRef.current = false;
  }, []);

  const shouldShowFallback = !normalizedSrc || hasError;
  const shouldShowImage = Boolean(normalizedSrc) && !hasError;

  return {
    shouldShowFallback,
    shouldShowImage,
    handleImageError,
    handleImageLoad,
  };
}

interface EnhancedAvatarProps
  extends Omit<
    React.ComponentPropsWithoutRef<"div">,
    "children" | "className" | "style" | "size"
  > {
  readonly src?: string;
  readonly alt?: string;
  readonly fallback?: React.ReactNode;
  readonly fallbackText?: string;
  readonly size?: "sm" | "md" | "lg" | "xl" | "2xl";
  readonly radius?: AvatarRadius;
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly children?: React.ReactNode;
}

function EnhancedAvatar({
  className,
  src,
  alt,
  fallback,
  fallbackText,
  children,
  size,
  radius,
  ...props
}: Readonly<EnhancedAvatarProps>) {
  const normalizedSrc = React.useMemo(() => normalizeAvatarSrc(src), [src]);

  const {
    shouldShowFallback,
    shouldShowImage,
    handleImageError,
    handleImageLoad,
  } = useAvatarImageLoadState(normalizedSrc);

  const fallbackContent = React.useMemo(() => {
    if (fallback) {
      return fallback;
    }

    const textForFallback = fallbackText || alt || "User";
    return getInitials(textForFallback);
  }, [fallback, fallbackText, alt]);

  const fallbackBgColor = React.useMemo(() => {
    const textForColor = fallbackText || alt || "User";
    return hashToColor(textForColor);
  }, [fallbackText, alt]);

  const radiusClass = resolveRadiusClass(radius, className);

  return (
    <AvatarPrimitive.Root
      data-slot="enhanced-avatar"
      className={cn(avatarVariants({ size }), radiusClass, className)}
      {...props}>
      {shouldShowImage && normalizedSrc && (
        <AvatarPrimitive.Image
          data-slot="enhanced-avatar-image"
          className="aspect-square h-full! w-full! object-cover"
          src={normalizedSrc}
          alt={alt}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      )}

      {shouldShowFallback && (
        <AvatarPrimitive.Fallback
          data-slot="enhanced-avatar-fallback"
          className={cn(
            avatarFallbackVariants({ size }),
            "font-semibold text-white",
          )}
          style={{
            borderRadius: "inherit",
            backgroundColor: fallbackBgColor,
            color: "#ffffff",
          }}
          delayMs={0}>
          {fallbackContent}
        </AvatarPrimitive.Fallback>
      )}

      {children}
    </AvatarPrimitive.Root>
  );
}

export { EnhancedAvatar, type AvatarRadius, type EnhancedAvatarProps };
