/**
 * UserSelectItem Component - V2.2
 *
 * Rich user selection item with avatar, name, email, and role badge.
 * Designed for use in SearchablePopover, Select, or other dropdowns.
 *
 * @version 2.2.0
 */

import { EnhancedAvatar } from "../Avatar/EnhancedAvatar";
import type { SearchablePopoverItem } from "../SearchablePopover/searchable-popover-types";
import { Badge } from "../../atoms/Badge";
import { cn } from "../../internal";
import { Icon } from "../../atoms/Icon";
import { readUserSelectItemMetadata } from "./user-select-item-metadata";

export interface UserSelectItemProps {
  /** User ID */
  readonly id: string;
  /** Display name */
  readonly name: string;
  /** Email address */
  readonly email?: string;
  /** Avatar URL */
  readonly avatarUrl?: string;
  /** Primary role (displayed as badge) */
  readonly role?: string;
  /** Additional roles (optional) */
  readonly roles?: string[];
  /** Whether the item is selected */
  readonly selected?: boolean;
  /** Whether the item is disabled */
  readonly disabled?: boolean;
  /** Custom class name */
  readonly className?: string;
  /** Whether to show email */
  readonly showEmail?: boolean;
  /** Whether to show role badge */
  readonly showRole?: boolean;
  /** Whether to show avatar */
  readonly showAvatar?: boolean;
  /** Size of the avatar */
  readonly avatarSize?: "sm" | "md" | "lg";
  /** Click handler */
  readonly onClick?: () => void;
}

export function UserSelectItem({
  id,
  name,
  email,
  avatarUrl,
  role,
  roles = [],
  selected = false,
  disabled = false,
  className,
  showEmail = true,
  showRole = true,
  showAvatar = true,
  avatarSize = "sm",
  onClick,
}: Readonly<UserSelectItemProps>) {
  const avatarSizeMap = {
    sm: "sm" as const,
    md: "md" as const,
    lg: "lg" as const,
  };
  const avatarClass = {
    sm: "size-6",
    md: "size-8",
    lg: "size-10",
  }[avatarSize];

  const primaryRole = role || roles[0];

  return (
    <button
      type="button"
      data-field-focus=""
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm",
        "hover:bg-muted/50 active:bg-muted",
        "transition-colors duration-150",
        "text-start",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
        selected && "bg-muted/70 hover:bg-muted",
        className,
      )}
      data-user-id={id}
      aria-pressed={selected}>
      {/* Avatar */}
      {showAvatar && (
        <EnhancedAvatar
          className={cn(avatarClass, "shrink-0")}
          src={avatarUrl}
          alt={name}
          fallbackText={name}
          size={avatarSizeMap[avatarSize]}
        />
      )}

      {/* User Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium">{name}</span>
          {showRole && primaryRole && (
            <Badge
              variant="secondary"
              className="max-w-24 truncate px-1.5 py-0 text-xs">
              {primaryRole}
            </Badge>
          )}
        </div>
        {showEmail && email && (
          <p className="text-muted-foreground mt-0.5 truncate text-xs">
            {email}
          </p>
        )}
      </div>

      {/* Selected Indicator */}
      {selected && (
        <Icon name="check" className="text-primary h-4 w-4 shrink-0" />
      )}
    </button>
  );
}

type UserSelectItemDisplayProps = Pick<
  UserSelectItemProps,
  | "avatarSize"
  | "showEmail"
  | "showRole"
  | "showAvatar"
  | "className"
  | "disabled"
>;

export interface UserSelectItemFromPopoverProps
  extends UserSelectItemDisplayProps {
  readonly item: SearchablePopoverItem;
  readonly selected?: boolean;
}

export function UserSelectItemFromPopover({
  item,
  selected,
  ...displayProps
}: Readonly<UserSelectItemFromPopoverProps>) {
  const metadata = readUserSelectItemMetadata(item.metadata);

  return (
    <UserSelectItem
      id={item.id}
      name={metadata?.display_name ?? item.label}
      email={metadata?.user_email}
      avatarUrl={metadata?.avatar_url}
      role={metadata?.role}
      roles={metadata?.roles}
      onClick={item.onClick}
      selected={selected}
      {...displayProps}
    />
  );
}

export default UserSelectItem;

export type { UserSelectItemMetadata } from "./user-select-item-metadata";
export { readUserSelectItemMetadata } from "./user-select-item-metadata";
