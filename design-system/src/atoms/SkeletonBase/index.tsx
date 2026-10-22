import { cn } from "../../internal";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly className?: string;
  readonly variant?:
    | "default"
    | "card"
    | "title"
    | "text"
    | "avatar"
    | "button";
}

export function Skeleton({
  className,
  variant = "default",
  ...props
}: Readonly<SkeletonProps>) {
  return (
    <div
      className={cn(
        "skeleton-bg animate-pulse rounded-md",
        {
          "h-4 w-full": variant === "text",
          "h-8 w-[250px]": variant === "title",
          "h-12 w-12 rounded-full": variant === "avatar",
          "h-10 w-[120px]": variant === "button",
          "h-[200px] w-full": variant === "card",
        },
        className,
      )}
      {...props}
    />
  );
}
