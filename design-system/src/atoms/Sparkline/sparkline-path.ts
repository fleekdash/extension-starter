export interface SparklinePoint {
  readonly x: number;
  readonly y: number;
}

/** Horizontal + top inset for sparkline layout. */
export const SPARKLINE_PAD = 3;

/**
 * Extra top inset beyond {@link SPARKLINE_PAD} so smooth curves and
 * round stroke caps are not clipped at the SVG viewBox edge.
 */
export const SPARKLINE_TOP_INSET = 2;

/**
 * Extra bottom inset beyond {@link SPARKLINE_PAD} so smooth curves and
 * round stroke caps are not clipped at the SVG viewBox edge.
 */
export const SPARKLINE_BOTTOM_INSET = 2;

export function finiteSparklineValues(values: readonly number[]): number[] {
  return values.filter((value) => Number.isFinite(value));
}

export function sparklineVerticalInsets(pad = SPARKLINE_PAD): {
  readonly top: number;
  readonly bottom: number;
} {
  return {
    top: pad + SPARKLINE_TOP_INSET,
    bottom: pad + SPARKLINE_BOTTOM_INSET,
  };
}

export function sparklineCoords(
  values: readonly number[],
  width: number,
  height: number,
  pad: number,
): SparklinePoint[] {
  const finite = finiteSparklineValues(values);
  if (finite.length === 0) {
    return [];
  }

  const { top: padTop, bottom: padBottom } = sparklineVerticalInsets(pad);
  const min = Math.min(...finite);
  const max = Math.max(...finite);
  const span = max - min || 1;
  const innerW = width - pad * 2;
  const innerH = height - padTop - padBottom;
  const lastIndex = Math.max(finite.length - 1, 1);

  return finite.map((value, index) => ({
    x: pad + (index / lastIndex) * innerW,
    y: padTop + innerH - ((value - min) / span) * innerH,
  }));
}

function coord(value: number): string {
  return value.toFixed(2);
}

function pointAt(
  points: readonly SparklinePoint[],
  index: number,
): SparklinePoint {
  const clamped = Math.min(Math.max(index, 0), points.length - 1);
  return points.at(clamped) ?? { x: 0, y: 0 };
}

/**
 * Catmull-Rom to cubic Bezier — same visual family as Recharts `natural`.
 */
export function sparklineSmoothPath(points: readonly SparklinePoint[]): string {
  let path = "";

  const start = points.at(0);
  if (points.length === 1 && start) {
    path = `M ${coord(start.x)} ${coord(start.y)}`;
  } else if (points.length === 2 && start) {
    const end = points.at(1);
    if (end) {
      path = `M ${coord(start.x)} ${coord(start.y)} L ${coord(end.x)} ${coord(
        end.y,
      )}`;
    }
  } else if (points.length > 2 && start) {
    path = `M ${coord(start.x)} ${coord(start.y)}`;
    for (let index = 0; index < points.length - 1; index += 1) {
      const p0 = pointAt(points, index - 1);
      const p1 = pointAt(points, index);
      const p2 = pointAt(points, index + 1);
      const p3 = pointAt(points, index + 2);
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      path += ` C ${coord(c1x)} ${coord(c1y)} ${coord(c2x)} ${coord(
        c2y,
      )} ${coord(p2.x)} ${coord(p2.y)}`;
    }
  }

  return path;
}

export function sparklineAreaPath(
  linePath: string,
  points: readonly SparklinePoint[],
  height: number,
  pad: number,
): string {
  const first = points.at(0);
  const last = points.at(-1);
  let area = "";
  if (linePath && first && last) {
    const { bottom: padBottom } = sparklineVerticalInsets(pad);
    const baseline = height - padBottom;
    area = `${linePath} L ${coord(last.x)} ${coord(baseline)} L ${coord(
      first.x,
    )} ${coord(baseline)} Z`;
  }

  return area;
}
