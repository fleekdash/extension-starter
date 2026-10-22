import { describe, expect, it } from "vitest";
import {
  filterIconMapPickerEntries,
  getIconMapPickerEntries,
  isIconMapPickerKey,
} from "./icon-picker-map-entries";

describe("icon-picker-map-entries", () => {
  it("lists icons-map keys with labels and keywords", () => {
    const entries = getIconMapPickerEntries();
    expect(entries.length).toBeGreaterThan(10);
    const users = entries.find((entry) => entry.value === "users");
    expect(users).toBeDefined();
    expect(users?.label).toBe("Users");
    expect(users?.keywords.length).toBeGreaterThan(0);
  });

  it("filters by key, label, and keywords", () => {
    const entries = getIconMapPickerEntries();
    const byKey = filterIconMapPickerEntries(entries, "users");
    expect(byKey.some((entry) => entry.value === "users")).toBe(true);

    const byKeyword = filterIconMapPickerEntries(entries, "people");
    expect(byKeyword.some((entry) => entry.value === "users")).toBe(true);
  });

  it("validates selectable icons-map keys", () => {
    expect(isIconMapPickerKey("users")).toBe(true);
    expect(isIconMapPickerKey("default")).toBe(false);
    expect(isIconMapPickerKey("dashicons-admin-generic")).toBe(false);
    expect(isIconMapPickerKey("lucide:home")).toBe(false);
    expect(isIconMapPickerKey("")).toBe(false);
    expect(isIconMapPickerKey(undefined)).toBe(false);
  });
});
