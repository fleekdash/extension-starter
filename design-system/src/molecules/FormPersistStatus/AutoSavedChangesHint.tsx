"use client";

import { getAutoSavedChangesMessage } from "./persist-status-text";

export function AutoSavedChangesHint() {
  return (
    <p className="text-muted-foreground text-xs">
      {getAutoSavedChangesMessage()}
    </p>
  );
}
