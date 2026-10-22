"use client";

import * as React from "react";
import Switch, { type SwitchProps } from "./switch";
import { debugError } from "../../internal";

export interface OptimisticSwitchProps
  extends Omit<SwitchProps, "onCheckedChange"> {
  readonly onCheckedChange: (checked: boolean) => Promise<void> | void;
}

/**
 * A Switch component that updates its UI state optimistically
 * before the asynchronous change is completed.
 */
export function OptimisticSwitch({
  checked: controlledChecked,
  onCheckedChange,
  disabled,
  ...props
}: Readonly<OptimisticSwitchProps>) {
  const [internalChecked, setInternalChecked] = React.useState(
    controlledChecked ?? false,
  );

  // Keep internal state in sync with external prop
  React.useEffect(() => {
    setInternalChecked(controlledChecked ?? false);
  }, [controlledChecked]);

  const handleChange = React.useCallback(
    async (newChecked: boolean) => {
      if (disabled) return;

      // Update UI immediately (optimistic)
      setInternalChecked(newChecked);

      try {
        await onCheckedChange(newChecked);
      } catch (error) {
        // Rollback on error
        setInternalChecked(controlledChecked ?? !newChecked);
        debugError("MAIN", "Failed to update switch", error);
      }
    },
    [controlledChecked, disabled, onCheckedChange],
  );

  return (
    <Switch
      {...props}
      checked={internalChecked}
      onCheckedChange={handleChange}
      disabled={disabled}
    />
  );
}

export default OptimisticSwitch;
