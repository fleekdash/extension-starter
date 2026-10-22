import { instantTranslate } from "../../internal";

export function getPaginationAriaLabel(): string {
  return instantTranslate("pagination");
}

export function getPaginationPreviousPageLabel(): string {
  return instantTranslate("Go to previous page");
}

export function getPaginationPreviousLabel(): string {
  return instantTranslate("Previous");
}

export function getPaginationNextPageLabel(): string {
  return instantTranslate("Go to next page");
}

export function getPaginationNextLabel(): string {
  return instantTranslate("Next");
}

export function getPaginationMorePagesLabel(): string {
  return instantTranslate("More pages");
}
