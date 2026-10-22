import { describe, expect, it } from "vitest";
import {
  sparklineAreaPath,
  sparklineCoords,
  sparklineSmoothPath,
} from "./sparkline-path";

describe("sparkline-path", () => {
  it("builds a cubic path for 3+ points", () => {
    const points = sparklineCoords([0, 4, 1, 6], 160, 48, 3);
    const path = sparklineSmoothPath(points);
    expect(path.startsWith("M ")).toBe(true);
    expect(path).toContain(" C ");
    expect(path.match(/ C /g)?.length).toBe(points.length - 1);
  });

  it("uses a straight segment for two points", () => {
    const points = sparklineCoords([1, 3], 160, 48, 3);
    expect(sparklineSmoothPath(points)).toContain(" L ");
    expect(sparklineSmoothPath(points)).not.toContain(" C ");
  });

  it("closes an area under the line", () => {
    const points = sparklineCoords([2, 5, 1], 160, 48, 3);
    const line = sparklineSmoothPath(points);
    const area = sparklineAreaPath(line, points, 48, 3);
    expect(area.startsWith(line)).toBe(true);
    expect(area.endsWith(" Z")).toBe(true);
  });

  it("drops non-finite values so path coordinates stay numeric", () => {
    const points = sparklineCoords(
      [1, Number.NaN, 3, Number.POSITIVE_INFINITY],
      160,
      48,
      3,
    );
    expect(points).toHaveLength(2);
    expect(
      points.every(
        (point) => Number.isFinite(point.x) && Number.isFinite(point.y),
      ),
    ).toBe(true);
    expect(sparklineSmoothPath(points)).not.toMatch(/NaN|Infinity/);
  });

  it("returns no points when every value is non-finite", () => {
    expect(
      sparklineCoords([Number.NaN, Number.NEGATIVE_INFINITY], 160, 48, 3),
    ).toEqual([]);
    expect(sparklineSmoothPath([])).toBe("");
  });

  it("keeps minimum values above the bottom inset for curve and stroke headroom", () => {
    const points = sparklineCoords([10, 0, 0, 0], 160, 48, 3);
    const maxY = Math.max(...points.map((point) => point.y));
    // 48 - 3 (pad) - 2 (bottom inset) = 43
    expect(maxY).toBe(43);
  });
});
