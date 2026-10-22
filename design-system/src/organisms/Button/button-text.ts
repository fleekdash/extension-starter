import { instantTranslate } from "../../internal";

export function getButtonDefaultLoadingText(): string {
  return instantTranslate("Loading...");
}

export function getButtonDefaultSuccessText(): string {
  return instantTranslate("Success!");
}

export function getButtonDefaultErrorText(): string {
  return instantTranslate("Error!");
}

export function getButtonDefaultTimeoutErrorText(): string {
  return instantTranslate("Request timeout");
}

export function getButtonDefaultRetryText(): string {
  return instantTranslate("Try again");
}
