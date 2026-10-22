import type { ReactNode } from "react";
import { cn } from "../../internal";
import { getSettingsCategoryTitleClass } from "./settings-feature-card-classes";

export interface SettingsCategoryHeaderProps {
  readonly title: string;
  readonly badge?: ReactNode;
  readonly capitalize?: boolean;
  readonly className?: string;
}

export function SettingsCategoryHeader({
  title,
  badge,
  capitalize = false,
  className,
}: SettingsCategoryHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      <h4 className={getSettingsCategoryTitleClass(capitalize)}>{title}</h4>
      {badge}
    </div>
  );
}
