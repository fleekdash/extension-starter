import { cn } from "../../internal";
import * as React from "react";
import {
  finiteSparklineValues,
  SPARKLINE_PAD,
  sparklineAreaPath,
  sparklineCoords,
  sparklineSmoothPath,
  sparklineVerticalInsets,
} from "./sparkline-path";

export type SparklineVariant = "line" | "area" | "bar";

interface SparklineProps {
  readonly values: readonly number[];
  readonly variant?: SparklineVariant;
  readonly className?: string;
  readonly label?: string;
  readonly fade?: boolean;
  /**
   * Overrides the mark color. Applied as an explicit SVG `fill`/`stroke`
   * attribute rather than through the `color` CSS property, on purpose: a
   * card's "monotone" background forces `color` to white on every descendant
   * via a global `!important` rule (see `styles/utilities/gradients.css`), so
   * relying on `currentColor` — the default when this prop is absent — would
   * make a chosen color silently lose to that rule. A `fill`/`stroke`
   * attribute sits outside the `color` cascade entirely and cannot be
   * clobbered by it.
   */
  readonly color?: string;
  /** Overrides the "area" variant's fill only. Falls back to `color` when unset — same attribute-based reasoning. */
  readonly fillColor?: string;
}

const VIEW_WIDTH = 160;
const VIEW_HEIGHT = 48;
const STROKE_WIDTH = 1.5;
const DEFAULT_MARK_COLOR = "currentColor";

function SparklineBars(
  props: Readonly<{ values: readonly number[]; markColor: string }>,
) {
  const values = finiteSparklineValues(props.values);
  if (values.length === 0) {
    return null;
  }

  const { top: padTop, bottom: padBottom } =
    sparklineVerticalInsets(SPARKLINE_PAD);
  const max = Math.max(...values, 1);
  const innerH = VIEW_HEIGHT - padTop - padBottom;
  const slot = (VIEW_WIDTH - SPARKLINE_PAD * 2) / values.length;
  const barWidth = Math.max(slot * 0.55, 1);

  return (
    <>
      {values.map((value, index) => {
        const height = Math.max((value / max) * innerH, 1);
        const x = SPARKLINE_PAD + index * slot + (slot - barWidth) / 2;
        const y = padTop + innerH - height;
        return (
          <rect
            key={`spark-bar-${x.toFixed(2)}`}
            x={x}
            y={y}
            width={barWidth}
            height={height}
            fill={props.markColor}
            rx="1"
          />
        );
      })}
    </>
  );
}

export function Sparkline({
  values,
  variant = "line",
  className,
  label = "Trend",
  fade = false,
  color,
  fillColor,
}: SparklineProps) {
  const points = sparklineCoords(
    values,
    VIEW_WIDTH,
    VIEW_HEIGHT,
    SPARKLINE_PAD,
  );
  const linePath = sparklineSmoothPath(points);
  const areaPath = sparklineAreaPath(
    linePath,
    points,
    VIEW_HEIGHT,
    SPARKLINE_PAD,
  );
  const gradientId = React.useId().replace(/:/g, "");
  const markColor = color || DEFAULT_MARK_COLOR;
  // The area fill is a separate accent from the line/bar mark — same duality
  // the main Chart widget exposes as "series color" vs "fill color" — but
  // defaults to the mark color so a card with only `color` set still renders
  // exactly as it did before this field existed.
  const areaFillColor = fillColor || markColor;

  return (
    <svg
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      className={cn("text-card-foreground h-full w-full", className)}
      role="img"
      aria-label={label}
      preserveAspectRatio="none">
      {variant === "bar" ? (
        <SparklineBars values={values} markColor={markColor} />
      ) : (
        <>
          {variant === "area" && areaPath ? (
            <>
              {fade && (
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={areaFillColor}
                      stopOpacity="0.2"
                    />
                    <stop
                      offset="100%"
                      stopColor={areaFillColor}
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
              )}
              <path
                d={areaPath}
                fill={fade ? `url(#${gradientId})` : areaFillColor}
                className={cn(!fade && "opacity-20")}
              />
            </>
          ) : null}
          {linePath ? (
            <path
              d={linePath}
              fill="none"
              stroke={markColor}
              strokeWidth={STROKE_WIDTH}
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ) : null}
        </>
      )}
    </svg>
  );
}
