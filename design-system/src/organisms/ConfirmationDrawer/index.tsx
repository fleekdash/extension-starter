/**
 * ConfirmationDrawer Component - V2.2
 *
 * Generic confirmation drawer for ANY action type.
 * Supports multiple variants: destructive, warning, info, success.
 * Uses VaulContainer for consistent UX (mobile drawer + desktop modal).
 *
 * @version 2.2.0
 */
"use client";

import { Icon } from "../../atoms/Icon";
import { Button } from "../../organisms/Button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "../../molecules/Drawer";
import { cn } from "../../internal";
import { ReactNode } from "react";

export type ConfirmationVariant =
  | "destructive"
  | "warning"
  | "info"
  | "success";

export interface ConfirmationDrawerProps {
  /** Whether the drawer is open */
  readonly open: boolean;
  /** Callback when open state changes */
  readonly onOpenChange: (open: boolean) => void;
  /** Visual variant */
  readonly variant?: ConfirmationVariant;
  /** Iconify icon name */
  readonly icon?: string;
  /** Title of the confirmation */
  readonly title: string;
  /** Description/message */
  readonly description: string | ReactNode;
  /** Confirm button label */
  readonly confirmLabel?: string;
  /** Cancel button label */
  readonly cancelLabel?: string;
  /** Confirm button callback */
  readonly onConfirm: () => void;
  /** Cancel button callback (optional) */
  readonly onCancel?: () => void;
  /** Loading state */
  readonly isLoading?: boolean;
  /** Trigger element (optional, can use controlled mode) */
  readonly trigger?: ReactNode;
}

const variantConfig: Record<
  ConfirmationVariant,
  {
    iconColor: string;
    iconBgColor: string;
    confirmVariant: "destructive" | "default";
    defaultIcon: string;
  }
> = {
  destructive: {
    iconColor: "text-destructive",
    iconBgColor: "bg-destructive/10",
    confirmVariant: "destructive",
    defaultIcon: "delete",
  },
  warning: {
    iconColor: "text-orange-600",
    iconBgColor: "bg-orange-100",
    confirmVariant: "default",
    defaultIcon: "warning",
  },
  info: {
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100",
    confirmVariant: "default",
    defaultIcon: "info",
  },
  success: {
    iconColor: "text-green-600",
    iconBgColor: "bg-green-100",
    confirmVariant: "default",
    defaultIcon: "check",
  },
};

export function ConfirmationDrawer({
  open,
  onOpenChange,
  variant = "info",
  icon,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isLoading = false,
  trigger = <></>,
}: ConfirmationDrawerProps) {
  const config = variantConfig[variant];
  const iconName = icon || config.defaultIcon;

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange?.(false);
  };

  return (
    <>
      {trigger}
      <Drawer open={open} onOpenChange={onOpenChange} direction="bottom">
        <DrawerContent className="border-border bg-card fixed inset-x-0 bottom-0 z-110 mx-auto max-h-[85vh] w-full max-w-md rounded-t-xl border p-6">
          <div className="mb-4 flex flex-col items-center">
            <div
              className={cn(
                "mb-3 flex h-12 w-12 items-center justify-center rounded-full",
                config.iconBgColor,
              )}>
              <Icon
                name={iconName}
                className={cn("h-6 w-6", config.iconColor)}
              />
            </div>
            <DrawerTitle className="text-lg font-semibold">{title}</DrawerTitle>
            {typeof description === "string" ? (
              <DrawerDescription className="text-muted-foreground mt-1 text-center text-sm">
                {description}
              </DrawerDescription>
            ) : (
              <div className="text-muted-foreground mt-1 text-center text-sm">
                {description}
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row">
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "w-full max-w-80",
                isLoading && "pointer-events-none opacity-50",
              )}
              onClick={handleCancel}
              disabled={isLoading}>
              {cancelLabel}
            </Button>
            <Button
              variant={config.confirmVariant}
              size="lg"
              className="w-full max-w-80"
              onClick={handleConfirm}
              disabled={isLoading}>
              {isLoading ? "Loading..." : confirmLabel}
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
