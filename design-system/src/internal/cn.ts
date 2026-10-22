import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 *
 * Uses clsx for conditional class names and tailwind-merge to handle conflicts.
 * This is the canonical implementation - use this instead of scattered versions.
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 *
 * @example
 * ```tsx
 * cn('px-4 py-2', condition && 'bg-blue-500', { 'text-white': isActive })
 * // Returns: "px-4 py-2 bg-blue-500 text-white" (if condition and isActive are true)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
