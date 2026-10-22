import { cn } from "../../internal";
import type { ReactNode } from "react";

/** Slightly smaller than half the 48px hexagon for visual breathing room. */
const HEXAGON_BADGE_ICON_SIZE_CLASS = "size-[22px]";

/** Muted icon on gradient / forceDark chart cards (hexagon stroke stays fully opaque). */
const HEXAGON_BADGE_ICON_ON_GRADIENT_CLASS = "text-card-foreground/60";

/** Muted icon on default surface cards. */
const HEXAGON_BADGE_ICON_ON_DEFAULT_CLASS =
  "text-primary/60 dark:text-foreground/60";

/** Hexagon shell tone on default surface cards — matches icon for stroke-current. */
const HEXAGON_BADGE_SHELL_ON_DEFAULT_CLASS =
  "text-primary/60 dark:text-foreground/60";

/** Hexagon shell on gradient / monotone chart cards. */
const HEXAGON_BADGE_SHELL_ON_GRADIENT_CLASS = "text-card-foreground";

/** Fully opaque hexagon outline — paired with muted icon content. */
const HEXAGON_BADGE_STROKE_CLASS = "stroke-current opacity-100";

/**
 * Mutes the icon when the color arrives as `shellColor`.
 *
 * The class-based tones carry their own alpha (`text-primary/60`), which an
 * inline color would override — so the muting has to move to opacity.
 */
const HEXAGON_BADGE_ICON_MUTED_CLASS = "opacity-60";

interface HexagonBadgeProps {
  size?: string;
  stroke?: string;
  fill?: string;
  shellClassName?: string;
  /**
   * Explicit color for the outline and the icon inside it.
   *
   * The outline is `stroke-current` and the icon inherits, so one value on the
   * shell paints both. Takes precedence over `shellClassName`'s own text color.
   */
  shellColor?: string;
  badge?: ReactNode;
}

const HexagonBadge = ({
  size,
  stroke = HEXAGON_BADGE_STROKE_CLASS,
  fill = "fill-transparent",
  shellClassName,
  shellColor,
  badge,
}: HexagonBadgeProps) => {
  return (
    <div
      className={cn(
        "relative shrink-0 opacity-100",
        shellClassName ?? "text-card-foreground",
        size,
      )}
      style={shellColor ? { color: shellColor } : undefined}>
      <svg
        className="h-full w-full opacity-100"
        width="44"
        height="48"
        viewBox="0 0 44 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506
            18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937
            39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z"
          className={fill}
        />
        <path
          d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506
            18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937
            39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z"
          className={stroke}
        />
      </svg>
      <div className="absolute start-2/4 top-2/4 flex -translate-x-2/4 -translate-y-2/4 items-center justify-center leading-none rtl:translate-x-2/4">
        {badge}
      </div>
    </div>
  );
};

export {
  HexagonBadge,
  HEXAGON_BADGE_ICON_MUTED_CLASS,
  HEXAGON_BADGE_ICON_ON_DEFAULT_CLASS,
  HEXAGON_BADGE_ICON_ON_GRADIENT_CLASS,
  HEXAGON_BADGE_ICON_SIZE_CLASS,
  HEXAGON_BADGE_SHELL_ON_DEFAULT_CLASS,
  HEXAGON_BADGE_SHELL_ON_GRADIENT_CLASS,
  HEXAGON_BADGE_STROKE_CLASS,
  type HexagonBadgeProps,
};
