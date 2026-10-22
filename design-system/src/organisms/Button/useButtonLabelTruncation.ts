import {
  startTransition,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { ReadonlyRef } from "./button-types";

export function useButtonLabelTruncation(
  isClampableText: boolean,
  stateText: ReactNode,
): {
  readonly textRef: ReadonlyRef<HTMLSpanElement>;
  readonly isTextTruncated: boolean;
} {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isTextTruncated, setIsTextTruncated] = useState(false);

  useEffect(() => {
    const element = textRef.current;
    if (!element || !isClampableText) {
      startTransition(() => {
        setIsTextTruncated(false);
      });
      return;
    }

    const checkTruncation = () => {
      const truncated = element.scrollWidth > element.clientWidth;
      startTransition(() => {
        setIsTextTruncated(truncated);
      });
    };

    checkTruncation();
    const resizeObserver = new ResizeObserver(checkTruncation);
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isClampableText, stateText]);

  return { textRef, isTextTruncated };
}
