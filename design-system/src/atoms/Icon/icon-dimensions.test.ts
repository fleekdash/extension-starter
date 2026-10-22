import { describe, expect, it } from "vitest";
import { parseIconBoxFromClassName } from "./icon-dimensions";

describe("parseIconBoxFromClassName", () => {
  it("maps size-* to square rem box", () => {
    expect(parseIconBoxFromClassName("size-4 shrink-0")).toEqual({
      width: "1rem",
      height: "1rem",
    });
  });

  it("maps fractional size-* (Tailwind v4)", () => {
    expect(parseIconBoxFromClassName("size-3.5")).toEqual({
      width: "0.875rem",
      height: "0.875rem",
    });
  });

  it("maps h-* and w-* pairs", () => {
    expect(parseIconBoxFromClassName("sidebar-icon h-4 w-4")).toEqual({
      width: "1rem",
      height: "1rem",
    });
  });

  it("maps fractional h-* and w-* (Button xs / PaletteEditor import)", () => {
    expect(parseIconBoxFromClassName("mr-2 h-3.5 w-3.5")).toEqual({
      width: "0.875rem",
      height: "0.875rem",
    });
  });

  it("falls back to 1rem when no size utilities", () => {
    expect(parseIconBoxFromClassName("text-accent")).toEqual({
      width: "1rem",
      height: "1rem",
    });
  });

  it("maps arbitrary rem utilities (theme toggle / Button iconClassName)", () => {
    expect(parseIconBoxFromClassName("h-[1.2rem] w-[1.2rem] m-auto")).toEqual({
      width: "1.2rem",
      height: "1.2rem",
    });
  });

  it("prefers arbitrary sizes when cn/twMerge drops scale tokens", () => {
    expect(parseIconBoxFromClassName("h-5 w-5 h-[1.2rem] w-[1.2rem]")).toEqual({
      width: "1.2rem",
      height: "1.2rem",
    });
  });
});
