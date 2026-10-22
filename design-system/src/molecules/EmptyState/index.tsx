/**
 * EmptyState Component - V2.2
 *
 * Empty state display with icons, title, description, and optional action.
 * Features animated icons on hover.
 *
 * @version 2.2.0
 */

import type { ReactElement } from "react";
import { cn } from "../../internal";
import { Icon } from "../../atoms/Icon";
import { Button } from "../../organisms/Button";

interface EmptyStateAction {
  readonly label: string;
  onClick: () => void;
  readonly disabled?: boolean;
}

interface EmptyStateProps {
  readonly title: string;
  readonly description: string;
  readonly icon?: string;
  readonly icons?: string[];
  readonly action?: EmptyStateAction;
  readonly className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  icons = [],
  action,
  className,
}: Readonly<EmptyStateProps>) {
  // Use either the single icon or the icons array
  const iconList = icon ? [icon] : icons;
  const showStackedIcons = iconList.length === 3;
  const showSingleIcon = iconList.length > 0 && !showStackedIcons;
  let iconContent: ReactElement | null = null;

  if (showStackedIcons) {
    iconContent = (
      <>
        <div className="bg-card border-border relative start-2.5 top-1.5 grid size-12 -rotate-6 place-items-center rounded-xl border shadow-lg group-hover:-translate-y-0.5 group-hover:-rotate-12 ltr:group-hover:-translate-x-5 rtl:group-hover:translate-x-5">
          <Icon name={iconList[0]} className="text-muted-foreground h-6 w-6" />
        </div>
        <div className="bg-card border-border relative z-10 grid size-12 place-items-center rounded-xl border shadow-lg group-hover:-translate-y-0.5">
          <Icon name={iconList[1]} className="text-muted-foreground h-6 w-6" />
        </div>
        <div className="bg-card border-border relative end-2.5 top-1.5 grid size-12 rotate-6 place-items-center rounded-xl border shadow-lg group-hover:-translate-y-0.5 group-hover:rotate-12 ltr:group-hover:translate-x-5 rtl:group-hover:-translate-x-5">
          <Icon name={iconList[2]} className="text-muted-foreground h-6 w-6" />
        </div>
      </>
    );
  } else if (showSingleIcon) {
    iconContent = (
      <div className="bg-card border-border grid size-12 place-items-center rounded-xl border shadow-lg group-hover:-translate-y-0.5">
        <Icon name={iconList[0]} className="text-muted-foreground h-6 w-6" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border-border hover:border-border/80 from-muted via-background to-muted h-full bg-linear-to-br text-center",
        "flex w-full flex-col items-center justify-center rounded-xl border border-dashed p-14",
        "group hover:bg-muted/50",
        className,
      )}>
      <div className="isolate flex items-center justify-center">
        {iconContent}
      </div>
      <h2 className="text-foreground mt-6 font-medium">{title}</h2>
      {description !== "" && (
        <p className="text-muted-foreground mt-2 max-w-sm text-sm whitespace-pre-line">
          {description}
        </p>
      )}
      {action && (
        <Button
          onClick={action.onClick}
          variant="outline"
          disabled={action.disabled}
          className={cn("mt-4", "shadow-xs active:shadow-none")}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
