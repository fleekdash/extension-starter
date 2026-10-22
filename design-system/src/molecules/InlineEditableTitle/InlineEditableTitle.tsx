"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "../../atoms/Icon";
import { Input } from "../../organisms/Input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../molecules/Tooltip";
import { cn } from "../../internal";

export interface InlineEditableTitleProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onCommit?: (value: string) => void;
  readonly onCancel?: () => void;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly isEditable?: boolean;
  readonly autoFocus?: boolean;
  readonly maxLength?: number;
  readonly ariaLabel?: string;
  readonly editLabel?: string;
  readonly saveLabel?: string;
  readonly cancelLabel?: string;
  readonly className?: string;
  readonly inputClassName?: string;
  readonly textClassName?: string;
}

export function InlineEditableTitle({
  value,
  onChange,
  onCommit,
  onCancel,
  placeholder = "",
  disabled = false,
  isEditable = true,
  autoFocus = false,
  maxLength,
  ariaLabel,
  editLabel = "Edit title",
  saveLabel = "Save",
  cancelLabel = "Cancel",
  className,
  inputClassName,
  textClassName,
}: InlineEditableTitleProps) {
  const [isEditing, setIsEditing] = useState(autoFocus);
  const [draftValue, setDraftValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStart = useCallback(() => {
    if (disabled || !isEditable) return;
    setDraftValue(value);
    setIsEditing(true);
  }, [disabled, isEditable, value]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const next = event.target.value;
      setDraftValue(next);
      onChange(next);
    },
    [onChange],
  );

  const handleSave = useCallback(() => {
    if (isEditable) {
      onCommit?.(draftValue);
    }
    setIsEditing(false);
  }, [draftValue, isEditable, onCommit]);

  const handleCancel = useCallback(() => {
    setDraftValue(value);
    setIsEditing(false);
    onCancel?.();
  }, [onCancel, value]);

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (cancelButtonRef.current?.contains(event.relatedTarget as Node)) {
        handleCancel();
        return;
      }
      handleSave();
    },
    [handleCancel, handleSave],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSave();
      } else if (event.key === "Escape") {
        event.preventDefault();
        handleCancel();
      }
    },
    [handleCancel, handleSave],
  );

  if (isEditing) {
    return (
      <div className={cn("group/title flex items-center gap-2", className)}>
        <Input
          ref={inputRef}
          data-slot="inline-editable-title-input"
          value={draftValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          maxLength={maxLength}
          placeholder={placeholder}
          aria-label={ariaLabel ?? placeholder}
          disabled={disabled}
          className={cn("h-7 text-lg font-semibold", inputClassName)}
        />
        {/* mousedown preventDefault keeps focus on the input - without it
            the click blurs first and onBlur commits the draft before
            Cancel/Save can run. */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={handleSave}
              className="text-muted-foreground hover:bg-background hover:text-foreground flex h-7 w-7 items-center justify-center rounded-md transition-colors">
              <Icon name="check" className="h-4 w-4 text-green-600" />
            </button>
          </TooltipTrigger>
          <TooltipContent portal={false}>{saveLabel}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              ref={cancelButtonRef}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={handleCancel}
              className="text-muted-foreground hover:bg-background hover:text-foreground flex h-7 w-7 items-center justify-center rounded-md transition-colors">
              <Icon name="close" className="h-4 w-4 text-red-600" />
            </button>
          </TooltipTrigger>
          <TooltipContent portal={false}>{cancelLabel}</TooltipContent>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className={cn("group/title flex items-center gap-2", className)}>
      <h3 className={cn("truncate text-lg font-semibold", textClassName)}>
        {value || placeholder}
      </h3>
      {!disabled && isEditable ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={handleStart}
              aria-label={editLabel}
              className="text-muted-foreground hover:bg-background hover:text-foreground flex h-5 w-5 cursor-pointer items-center justify-center rounded-md opacity-0 transition-opacity group-hover/title:opacity-100">
              <Icon name="edit" className="h-3.5 w-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent portal={false}>{editLabel}</TooltipContent>
        </Tooltip>
      ) : null}
    </div>
  );
}
