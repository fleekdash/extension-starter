/** Metadata shape for user rows inside SearchablePopover. */
export interface UserSelectItemMetadata {
  display_name: string;
  user_email?: string;
  user_login?: string;
  avatar_url?: string;
  role?: string;
  roles?: string[];
}

function readOptionalString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function readOptionalStringArray(value: unknown): string[] | undefined {
  if (
    !Array.isArray(value) ||
    !value.every((entry) => typeof entry === "string")
  ) {
    return undefined;
  }
  return value;
}

/** Narrows SearchablePopover `metadata` to typed user fields for UserSelectItem. */
export function readUserSelectItemMetadata(
  metadata?: Record<string, unknown>,
): UserSelectItemMetadata | undefined {
  if (!metadata || typeof metadata.display_name !== "string") {
    return undefined;
  }

  return {
    display_name: metadata.display_name,
    user_email: readOptionalString(metadata.user_email),
    user_login: readOptionalString(metadata.user_login),
    avatar_url: readOptionalString(metadata.avatar_url),
    role: readOptionalString(metadata.role),
    roles: readOptionalStringArray(metadata.roles),
  };
}
