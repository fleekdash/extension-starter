/**
 * Pagination Component - V2.2
 *
 * Pagination controls for data navigation.
 * Migrated from V2 with all features preserved.
 *
 * @version 2.2.0
 */
import { Icon } from "../../atoms/Icon";
import * as React from "react";

import { Button } from "../../organisms/Button";
import { cn } from "../../internal";
import {
  getPaginationAriaLabel,
  getPaginationMorePagesLabel,
  getPaginationNextLabel,
  getPaginationNextPageLabel,
  getPaginationPreviousLabel,
  getPaginationPreviousPageLabel,
} from "./pagination-text";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label={getPaginationAriaLabel()}
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  isDisabled?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(isActive ? "outline" : "ghost", size, className)}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label={getPaginationPreviousPageLabel()}
      size="default"
      className={cn("gap-1 px-2.5 sm:pe-4", className)}
      {...props}>
      <Icon
        name="chevronLeft"
        className="size-2 fill-current rtl:-scale-x-100"
      />
      <span>{getPaginationPreviousLabel()}</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label={getPaginationNextPageLabel()}
      size="default"
      className={cn("gap-1 px-2.5 sm:ps-4", className)}
      {...props}>
      <span>{getPaginationNextLabel()}</span>
      <Icon
        name="chevronRight"
        className="size-2 fill-current rtl:-scale-x-100"
      />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}>
      <Icon name="more-horizontal" className="size-2 fill-current" />
      <span className="sr-only">{getPaginationMorePagesLabel()}</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
