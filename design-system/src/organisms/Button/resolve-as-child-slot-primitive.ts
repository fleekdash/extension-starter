import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

export interface AsChildSlotPrimitive {
  readonly element: ReactElement<{ children?: ReactNode }>;
  /** Original `element.props.children` — used for label / snapshot text instead of the wrapper element. */
  readonly labelSource: ReactNode;
}

function isSlotPrimitiveElement(
  element: ReactElement,
): element is ReactElement<{ children?: ReactNode }> {
  return (
    typeof element.type === "string" &&
    (element.type === "a" || element.type === "button")
  );
}

/**
 * When `Button` uses `asChild` with a single native `<a>` or `<button>`, Radix `Slot` must merge onto
 * that element (not an inner layout `<span>`), otherwise size/padding classes apply to the wrong node.
 */
export function tryResolveAsChildSlotPrimitive(
  children: ReactNode,
): AsChildSlotPrimitive | null {
  const items = Children.toArray(children);
  if (items.length !== 1) {
    return null;
  }
  const only = items[0];
  if (!isValidElement(only) || !isSlotPrimitiveElement(only)) {
    return null;
  }
  return { element: only, labelSource: only.props.children };
}
