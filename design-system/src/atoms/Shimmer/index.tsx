/**
 * Shimmer Component - V2.2
 *
 * Loading shimmer effect overlay.
 * Pure CSS animation with configurable duration.
 *
 * @version 2.2.0
 */

import { cn } from "../../internal";
import React from "react";

interface ShimmerProps {
  /**
   * Additional CSS class
   */
  className?: string;
  /**
   * Whether to show shimmer
   * @default true
   */
  show?: boolean;
  /**
   * Animation duration in seconds
   * @default 1.5
   */
  duration?: number;
}

export const Shimmer: React.FC<ShimmerProps> = ({
  className,
  show = true,
  duration = 1.5,
}) => {
  if (!show) return null;

  return (
    <div
      className={cn(
        "via-muted/20 absolute inset-0 bg-linear-to-r from-transparent to-transparent",
        "animate-pulse",
        className,
      )}
      style={{
        animationDuration: `${duration}s`,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
      }}
    />
  );
};

export default Shimmer;
