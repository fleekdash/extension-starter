/**
 * PressHoldDeleteButton Component - V2.2
 *
 * Safe delete button requiring press-and-hold interaction.
 * Shows circular progress animation during hold.
 *
 * @version 2.2.0
 */

"use client";

import { Icon } from "../../atoms/Icon";
import { Button } from "../../organisms/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../molecules/Tooltip";
import { cn } from "../../internal";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/** Theme tokens — avoids Tailwind stroke utilities and survives .btn-base overflow clipping */
const HOLD_RING_TRACK_STROKE =
  "color-mix(in srgb, var(--destructive) 52%, transparent)";
const HOLD_RING_PROGRESS_STROKE = "var(--destructive-active)";

interface PressHoldDeleteButtonProps {
  readonly onDelete: (e?: React.MouseEvent) => void;
  readonly className?: string;
  readonly size?: "sm" | "md" | "lg";
  readonly variant?: "ghost" | "destructive" | "outline";
  readonly holdDuration?: number; // Duration in milliseconds
  readonly disabled?: boolean;
  readonly ariaLabel?: string;
  readonly tooltipText?: string;
  /** When false, omits the Radix tooltip wrapper (use inside another tooltip/popover). */
  readonly showTooltip?: boolean;
}

export function PressHoldDeleteButton({
  onDelete,
  className,
  size = "sm",
  variant = "ghost",
  holdDuration = 1500, // 1.5 seconds default
  disabled = false,
  ariaLabel = "Delete",
  tooltipText = "Hold",
  showTooltip = true,
}: PressHoldDeleteButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const pressStartTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  /** Ring progress — updated imperatively to avoid ~60 React commits/sec during hold (main-thread jank). */
  const progressCircleRef = useRef<SVGCircleElement | null>(null);
  const onDeleteRef = useRef(onDelete);
  onDeleteRef.current = onDelete;

  const progressSizes = useMemo(
    () =>
      ({
        sm: 14,
        md: 18,
        lg: 22,
      }) as const,
    [],
  );

  const strokeWidthBySize = useMemo(
    () =>
      ({
        sm: 2.5,
        md: 3,
        lg: 3.5,
      }) as const,
    [],
  );

  const radius = progressSizes[size];
  const circumference = 2 * Math.PI * radius;

  const resetRingToStart = useCallback(() => {
    progressCircleRef.current?.style.setProperty(
      "stroke-dashoffset",
      String(circumference),
    );
  }, [circumference]);

  // Calculate progress based on hold time; drive SVG via ref (no per-frame setState).
  const updateProgress = useCallback(
    function step() {
      if (!pressStartTimeRef.current) {
        return;
      }

      const now = Date.now();
      const elapsed = now - pressStartTimeRef.current;

      const rawProgress = (elapsed / holdDuration) * 100;
      const easedProgress = Math.min(rawProgress, 100);

      const strokeDashoffset =
        circumference - (easedProgress / 100) * circumference;
      progressCircleRef.current?.style.setProperty(
        "stroke-dashoffset",
        String(strokeDashoffset),
      );

      if (easedProgress >= 100) {
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        pressStartTimeRef.current = null;
        setIsPressed(false);
        setIsDeleting(true);
        onDeleteRef.current();
        return;
      }

      animationFrameRef.current = requestAnimationFrame(step);
    },
    [circumference, holdDuration],
  );

  // Start press and hold (animation starts in useLayoutEffect after progress <circle> exists)
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || isPressed) return; // Prevent multiple presses

      e.preventDefault();
      e.stopPropagation();

      pressStartTimeRef.current = Date.now();
      setIsPressed(true);
    },
    [disabled, isPressed],
  );

  // Cancel press and hold
  const handleMouseUp = useCallback(() => {
    if (!isPressed) return;

    setIsPressed(false);
    pressStartTimeRef.current = null;
    resetRingToStart();

    // Cancel animation
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, [isPressed, resetRingToStart]);

  // Handle mouse leave (cancel if mouse leaves button)
  const handleMouseLeave = useCallback(() => {
    handleMouseUp();
  }, [handleMouseUp]);

  // Handle touch events for mobile
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled || isDeleting) return;

      e.preventDefault();
      e.stopPropagation();

      pressStartTimeRef.current = Date.now();
      setIsPressed(true);
    },
    [disabled, isDeleting],
  );

  const handleTouchEnd = useCallback(() => {
    handleMouseUp();
  }, [handleMouseUp]);

  useLayoutEffect(() => {
    if (!isPressed || disabled || isDeleting) {
      return;
    }
    resetRingToStart();
    animationFrameRef.current = requestAnimationFrame(updateProgress);
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [disabled, isDeleting, isPressed, resetRingToStart, updateProgress]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Size variants
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const strokeWidth = strokeWidthBySize[size];

  const deleteButton = (
    <Button
      variant={variant}
      size="icon"
      radius="full"
      className={cn(
        sizeClasses[size],
        "relative",
        isPressed && !isDeleting && "scale-105",
        isDeleting && "cursor-not-allowed opacity-50",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      disabled={disabled || isDeleting}
      aria-label={ariaLabel}>
      {/* Delete Icon */}
      <Icon
        name="trash"
        className={cn(
          iconSizes[size],
          "transition-all duration-200",
          isPressed && !isDeleting && "text-destructive",
          isDeleting && "text-destructive animate-pulse",
        )}
      />

      {/* Circular Progress Overlay - Only show during active press */}
      {isPressed && (
        <svg
          className="pointer-events-none absolute inset-0 size-full -rotate-90"
          viewBox="0 0 40 40"
          aria-hidden
          style={{
            filter:
              "drop-shadow(0 0 1px color-mix(in srgb, var(--foreground) 12%, transparent))",
          }}>
          {/* Track: stays inside button — .btn-base uses overflow:hidden */}
          <circle
            cx="20"
            cy="20"
            r={radius}
            stroke={HOLD_RING_TRACK_STROKE}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            ref={progressCircleRef}
            cx="20"
            cy="20"
            r={radius}
            stroke={HOLD_RING_PROGRESS_STROKE}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference,
            }}
          />
        </svg>
      )}

      {/* Completion indicator */}
      {isDeleting && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon
            name="check"
            className={cn(iconSizes[size], "text-destructive")}
          />
        </div>
      )}
    </Button>
  );

  if (!showTooltip) {
    return deleteButton;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{deleteButton}</TooltipTrigger>
      <TooltipContent side="top" showArrow className="text-xs">
        <span>{tooltipText}</span>
      </TooltipContent>
    </Tooltip>
  );
}
