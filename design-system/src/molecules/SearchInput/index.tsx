/**
 * SearchInput Component - V2.2
 *
 * Search input with autocomplete.
 * Migrated from V2 with all features preserved.
 *
 * @version 2.2.0
 */
import { Icon } from "../../atoms/Icon";
import { Button } from "../../organisms/Button";
import { Input } from "../../organisms/Input";
import {
  FIELD_FOCUS_ACTIVE,
  FIELD_FOCUS_TRANSITION,
} from "../../foundations/focus";
import { cn } from "../../internal";
import { getSearchInputCloseAriaLabel } from "./search-input-text";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface SearchInputProps {
  readonly placeholder?: string;
  readonly value?: string;
  readonly onValueChange?: (value: string) => void;
  readonly onClose?: () => void;
  readonly className?: string;
  readonly autoFocus?: boolean;
  readonly debounceMs?: number;
  readonly compact?: boolean;
}

const SEARCH_INPUT_SIZE = {
  compact: {
    container: "h-8 max-w-[180px] min-w-0 px-2 py-0 text-xs",
    searchIcon: "start-1 h-3 w-3",
    input: "h-8 pe-6 ps-7 text-xs",
    clearButton: "end-1 h-4 w-4",
    clearIcon: "h-3 w-3",
    closeButton: "ms-1 h-7 w-7",
    closeIcon: "h-4 w-4",
  },
  default: {
    container: "h-10 max-w-md px-3 py-1 text-sm",
    searchIcon: "start-3 h-4 w-4",
    input: "h-10 pe-8 ps-10 text-sm",
    clearButton: "end-2 h-5 w-5",
    clearIcon: "h-4 w-4",
    closeButton: "ms-2 h-8 w-8",
    closeIcon: "h-5 w-5",
  },
} as const;

function getSearchInputSize(compact: boolean) {
  return compact ? SEARCH_INPUT_SIZE.compact : SEARCH_INPUT_SIZE.default;
}

const INPUT_FIELD_CLASS = "pointer-events-auto";

/** Neutralize nested Input chrome — focus lives on the SearchInput shell. */
const SEARCH_SHELL_INPUT_RESET =
  "[&_[data-slot=input]]:border-0 [&_[data-slot=input]]:bg-transparent [&_[data-slot=input]]:shadow-none " +
  "[&_[data-slot=input]]:focus-visible:border-transparent [&_[data-slot=input]]:focus-visible:shadow-none " +
  "[&_[data-slot=input]]:focus-visible:outline-none [&_[data-slot=input]]:focus-visible:ring-0";

export function SearchInput({
  placeholder = "Search posts...",
  value = "",
  onValueChange,
  onClose,
  className,
  autoFocus = true,
  debounceMs = 300,
  compact = false,
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const [isFocused, setIsFocused] = useState(false);

  // Auto focus when component mounts
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Sync with external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounced value change
  const debouncedOnValueChange = useCallback(
    (newValue: string) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        onValueChange?.(newValue);
      }, debounceMs);
    },
    [onValueChange, debounceMs],
  );

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);
      debouncedOnValueChange(newValue);
    },
    [debouncedOnValueChange],
  );

  // Handle clear
  const handleClear = useCallback(() => {
    setLocalValue("");
    onValueChange?.("");
    inputRef.current?.focus();
  }, [onValueChange]);

  // Handle close
  const handleClose = useCallback(() => {
    setLocalValue("");
    onValueChange?.("");
    onClose?.();
  }, [onValueChange, onClose]);

  // Handle key down
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        handleClose();
      }
    },
    [handleClose],
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Focus/blur handlers for outline
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const size = getSearchInputSize(compact);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={cn(
        "bg-background relative flex items-center gap-2 rounded-md border",
        FIELD_FOCUS_TRANSITION,
        isFocused ? FIELD_FOCUS_ACTIVE : "border-input shadow-none",
        SEARCH_SHELL_INPUT_RESET,
        size.container,
        className,
      )}
      data-field-focus-shell="">
      <div className="relative flex-1">
        <Icon
          name="search"
          className={cn(
            "text-muted-foreground absolute top-1/2 -translate-y-1/2 transform",
            size.searchIcon,
          )}
        />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={localValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(INPUT_FIELD_CLASS, size.input)}
        />
        <AnimatePresence>
          {localValue && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.1 }}
              onClick={handleClear}
              className={cn(
                "hover:bg-muted absolute top-1/2 -translate-y-1/2 transform rounded-sm p-1 transition-colors",
                size.clearButton,
              )}>
              <Icon
                name="close"
                className={cn("text-muted-foreground", size.clearIcon)}
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      {onClose && (
        <Button
          variant="ghost"
          size={compact ? "xs" : "sm"}
          onClick={handleClose}
          aria-label={getSearchInputCloseAriaLabel()}
          className={cn(
            "text-muted-foreground hover:text-foreground p-0",
            size.closeButton,
          )}>
          <Icon name="close" className={size.closeIcon} />
        </Button>
      )}
    </motion.div>
  );
}
