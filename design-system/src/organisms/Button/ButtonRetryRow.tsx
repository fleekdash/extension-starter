import { Icon } from "../../atoms/Icon";
import { motion } from "motion/react";
import type { Dispatch, SetStateAction } from "react";
import type { ButtonProps, MutableRef } from "./button-types";

export interface ButtonRetryRowProps {
  readonly retryText: string;
  readonly onRetry: (() => void) | undefined;
  readonly setInternalState: Dispatch<SetStateAction<ButtonProps["state"]>>;
  readonly timeoutRef: MutableRef<ReturnType<typeof setTimeout> | undefined>;
}

export function ButtonRetryRow({
  retryText,
  onRetry,
  setInternalState,
  timeoutRef,
}: ButtonRetryRowProps) {
  const handleRetryClick = () => {
    setInternalState(null);
    if (timeoutRef.current !== undefined) {
      clearTimeout(timeoutRef.current);
    }
    onRetry?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className="text-muted-foreground hover:text-card-foreground flex cursor-pointer items-center gap-1.5 text-xs"
      onClick={handleRetryClick}
      role="button"
      tabIndex={0}>
      <span className="inline-block h-3.5 w-3.5">
        <Icon name="reset" className="h-full w-full" />
      </span>
      {retryText}
    </motion.div>
  );
}
