"use client";

import type { ReactNode } from "react";
import { Switch, OptimisticSwitch } from "../../molecules/Switch";
import { Label } from "../../organisms/Label";
import { cn } from "../../internal";

export interface SettingsToggleRowProps {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly checked: boolean;
  readonly onCheckedChange: (checked: boolean) => void | Promise<void>;
  readonly disabled?: boolean;
  readonly pending?: boolean;
  readonly optimistic?: boolean;
  readonly className?: string;
  readonly children?: ReactNode;
}

const ROW_CLASS =
  "flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0";
const COPY_CLASS = "min-w-0 flex-1 space-y-1";
const HINT_CLASS = "text-sm text-muted-foreground";

export function SettingsToggleRow(props: SettingsToggleRowProps) {
  const {
    id,
    title,
    description,
    checked,
    onCheckedChange,
    disabled = false,
    pending = false,
    optimistic = false,
    className,
    children,
  } = props;

  const isDisabled = disabled || pending;

  const switchProps = {
    id,
    checked,
    disabled: isDisabled,
    onCheckedChange: (value: boolean) => onCheckedChange(!!value),
  } as const;

  return (
    <div className={cn(ROW_CLASS, className)}>
      <div className={COPY_CLASS}>
        <Label htmlFor={id}>{title}</Label>
        {description ? <p className={HINT_CLASS}>{description}</p> : null}
        {children}
      </div>
      {optimistic ? (
        <OptimisticSwitch {...switchProps} />
      ) : (
        <Switch {...switchProps} />
      )}
    </div>
  );
}
