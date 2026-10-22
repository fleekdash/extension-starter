import { cn } from "../../internal";
import React from "react";
import { getButtonDefaultLoadingText } from "../../organisms/Button/button-text";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: "default" | "circular" | "rounded";
  animation?: "pulse" | "shimmer" | "none";
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width,
  height,
  variant = "default",
  animation = "pulse",
}) => {
  const baseClasses = "skeleton-bg";

  const variantClasses = {
    default: "rounded",
    circular: "rounded-full",
    rounded: "rounded-lg",
  };

  const animationClasses = {
    pulse: "animate-pulse",
    shimmer: "animate-shimmer",
    none: "",
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height)
    style.height = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className,
      )}
      style={style}
    />
  );
};

// Dashboard-specific skeleton components
export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton width={200} height={24} />
          <Skeleton width={300} height={16} />
        </div>
        <Skeleton width={120} height={40} variant="rounded" />
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="mb-4 flex items-center justify-between">
              <Skeleton width={100} height={16} />
              <Skeleton width={40} height={40} variant="circular" />
            </div>
            <Skeleton width={80} height={24} className="mb-2" />
            <Skeleton width={60} height={14} />
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="rounded-lg border p-4">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton width={150} height={20} />
          <Skeleton width={100} height={32} variant="rounded" />
        </div>
        <Skeleton width="100%" height={300} />
      </div>

      {/* Grid skeleton */}
      <div className="rounded-lg border p-4">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton width={120} height={20} />
          <Skeleton width={80} height={32} variant="rounded" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton width={40} height={40} variant="circular" />
              <div className="flex-1 space-y-2">
                <Skeleton width="60%" height={16} />
                <Skeleton width="40%" height={14} />
              </div>
              <Skeleton width={60} height={20} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Widget-specific skeleton
export const WidgetSkeleton: React.FC<{
  type?: "stats" | "chart" | "grid" | "progress";
  size?: "sm" | "md" | "lg";
}> = ({ type = "stats", size = "md" }) => {
  const sizeClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const renderSkeleton = () => {
    switch (type) {
      case "stats":
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton width={80} height={16} />
              <Skeleton width={32} height={32} variant="circular" />
            </div>
            <Skeleton width={60} height={24} />
            <Skeleton width={40} height={14} />
          </div>
        );

      case "chart":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton width={100} height={18} />
              <Skeleton width={80} height={28} variant="rounded" />
            </div>
            <Skeleton width="100%" height={150} />
          </div>
        );

      case "grid":
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton width={120} height={18} />
              <Skeleton width={60} height={28} variant="rounded" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <Skeleton width={32} height={32} variant="circular" />
                  <div className="flex-1 space-y-1">
                    <Skeleton width="70%" height={14} />
                    <Skeleton width="50%" height={12} />
                  </div>
                  <Skeleton width={40} height={16} />
                </div>
              ))}
            </div>
          </div>
        );

      case "progress":
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton width={80} height={16} />
              <Skeleton width={32} height={32} variant="circular" />
            </div>
            <Skeleton width={60} height={24} />
            <div className="space-y-2">
              <Skeleton width="100%" height={8} variant="rounded" />
              <Skeleton width={40} height={14} />
            </div>
          </div>
        );

      default:
        return <Skeleton width="100%" height={100} />;
    }
  };

  return (
    <div className={`rounded-lg border ${sizeClasses[size]}`}>
      {renderSkeleton()}
    </div>
  );
};

// Loading overlay
export const LoadingOverlay: React.FC<{
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ isLoading = false, children, className }) => {
  if (!isLoading) return <>{children}</>;

  return (
    <div className={cn("relative", className)}>
      {children}
      <div className="bg-background/80 absolute inset-0 flex items-center justify-center backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
          <span className="text-muted-foreground text-sm">
            {getButtonDefaultLoadingText()}
          </span>
        </div>
      </div>
    </div>
  );
};

export { Skeleton };
