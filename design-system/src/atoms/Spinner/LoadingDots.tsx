import { cn } from "../../internal";
import React from "react";

interface LoadingDotsProps {
  /**
   * Dot size
   * @default "sm"
   */
  size?: "xs" | "sm" | "md" | "lg";
  /**
   * Dot color
   * @default "muted"
   */
  variant?: "muted" | "primary" | "secondary";
  /**
   * Additional CSS class
   */
  className?: string;
  /**
   * Spacing between dots
   * @default "gap-1"
   */
  gap?: "gap-0.5" | "gap-1" | "gap-1.5" | "gap-2";
}

const sizeClasses = {
  xs: "w-1 h-1",
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

const variantClasses = {
  muted: "bg-muted-foreground/60",
  primary: "bg-primary/60",
  secondary: "bg-secondary/60",
};

const gapClasses = {
  "gap-0.5": "gap-0.5",
  "gap-1": "gap-1",
  "gap-1.5": "gap-1.5",
  "gap-2": "gap-2",
};

export const LoadingDots: React.FC<LoadingDotsProps> = ({
  size = "sm",
  variant = "muted",
  className,
  gap = "gap-1",
}) => {
  return (
    <div className={cn("flex items-center", gapClasses[gap], className)}>
      <div
        className={cn(
          "animate-pulse rounded-full",
          sizeClasses[size],
          variantClasses[variant],
        )}
      />
      <div
        className={cn(
          "animate-pulse rounded-full",
          sizeClasses[size],
          variantClasses[variant],
        )}
        style={{ animationDelay: "0.2s" }}
      />
      <div
        className={cn(
          "animate-pulse rounded-full",
          sizeClasses[size],
          variantClasses[variant],
        )}
        style={{ animationDelay: "0.4s" }}
      />
    </div>
  );
};

export default LoadingDots;
