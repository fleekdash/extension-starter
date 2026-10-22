/**
 * SelectButton Component - V2.2
 *
 * Dropdown select styled as a button with icon support.
 * Combines Button + DropdownMenu for select functionality.
 *
 * @version 2.2.0
 */

import { Icon, IconName } from "../../atoms/Icon";
import { Button } from "../../organisms/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../molecules/DropdownMenu";
import { Label } from "../../organisms/Label";
import { cn } from "../../internal";
import { useId, useState } from "react";

export interface SelectButtonOption {
  value: string;
  label: string;
  icon?: IconName;
}

interface SelectButtonProps {
  label?: string;
  options: SelectButtonOption[];
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  onValueChange?: (value: string) => void;
  buttonVariant?: "default" | "outline" | "ghost" | "ghost-default";
  buttonSize?: "xs" | "sm" | "default" | "lg" | "xl";
  buttonIcon?: IconName;
}

export function SelectButton({
  label,
  options,
  defaultValue,
  placeholder = "Select an option",
  className,
  buttonClassName,
  menuClassName,
  onValueChange,
  buttonVariant = "default",
  buttonSize = "default",
  buttonIcon,
}: SelectButtonProps) {
  const id = useId();
  const [value, setValue] = useState(defaultValue);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onValueChange?.(newValue);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`*:not-first:mt-2 ${className}`}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            id={id}
            variant={buttonVariant}
            size={buttonSize}
            className={cn(
              "dark:border-border w-40 justify-between border dark:hover:border-white/20",
              buttonClassName,
            )}
            icon={buttonIcon as string | undefined}>
            <div className="flex min-w-0 flex-1 items-center gap-2">
              {selectedOption?.icon && (
                <Icon
                  name={selectedOption.icon as string}
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                />
              )}
              <span className="truncate">
                {selectedOption?.label || placeholder}
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={cn("w-40", menuClassName)}>
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleValueChange(option.value)}
              className="flex items-center gap-2">
              {option.icon && (
                <Icon
                  name={option.icon as string}
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                />
              )}
              <span>{option.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
