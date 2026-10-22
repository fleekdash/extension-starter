import { instantTranslate } from "../../internal";

export function getAutoSavedChangesMessage(): string {
  return instantTranslate("Changes are saved automatically");
}

export function getUnsavedChangesLabel(): string {
  return instantTranslate("Unsaved");
}
