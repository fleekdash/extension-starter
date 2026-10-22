import { instantTranslate } from "../../internal";

export function translateSearchablePopoverPlaceholder(text: string): string {
  switch (text) {
    case "Search...":
      return instantTranslate("Search...");
    case "Search pages...":
      return instantTranslate("Search pages...");
    case "Search users...":
      return instantTranslate("Search users...");
    case "Search Comments...":
      return instantTranslate("Search Comments...");
    case "Search team...":
      return instantTranslate("Search team...");
    case "Search content types...":
      return instantTranslate("Search content types...");
    default:
      return text;
  }
}

export function translateSearchablePopoverEmptyMessage(text: string): string {
  switch (text) {
    case "No items found":
      return instantTranslate("No items found");
    case "No results found":
      return instantTranslate("No results found");
    case "No users found":
      return instantTranslate("No users found");
    case "No team found.":
      return instantTranslate("No team found.");
    default:
      return text;
  }
}

export function translateSearchablePopoverEmptyDescription(
  text: string,
): string {
  switch (text) {
    case "Try a different search term.":
      return instantTranslate("Try a different search term.");
    case "No users match your current filters.":
      return instantTranslate("No users match your current filters.");
    default:
      return text;
  }
}
