import { describe, expect, it } from "vitest";
import {
  buildSearchablePopoverPanelStyle,
  getSearchablePopoverPanelClassName,
} from "./searchable-popover-layout";

describe("searchable-popover-layout", () => {
  it("caps height with maxHeight only, never a fixed height", () => {
    const style = buildSearchablePopoverPanelStyle("338px");

    expect(style).toEqual({ maxHeight: "338px" });
    expect(style).not.toHaveProperty("height");
    expect(style).not.toHaveProperty("minHeight");
  });

  it("enables flex shrink for scroll areas", () => {
    expect(getSearchablePopoverPanelClassName(true)).toContain("min-h-0");
    expect(getSearchablePopoverPanelClassName(true)).toContain(
      "overflow-hidden",
    );
    expect(getSearchablePopoverPanelClassName(false)).not.toContain("min-h-0");
  });
});
