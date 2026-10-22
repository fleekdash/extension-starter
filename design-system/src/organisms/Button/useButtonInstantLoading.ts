import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
} from "react";
import type { ButtonProps, ButtonState, MutableRef } from "./button-types";

export function useButtonInstantLoading(params: {
  readonly instantLoading: boolean;
  readonly state: ButtonState;
  readonly loadingTimeout: number;
  readonly clickZoom: boolean;
  readonly onClick: ButtonProps["onClick"];
  readonly onLoadingStart?: () => void;
  readonly onLoadingTimeout?: () => void;
}): {
  readonly internalState: ButtonProps["state"];
  readonly setInternalState: Dispatch<SetStateAction<ButtonProps["state"]>>;
  readonly timeoutRef: MutableRef<ReturnType<typeof setTimeout> | undefined>;
  readonly handleClickWithLoading: (
    event: MouseEvent<HTMLButtonElement>,
  ) => Promise<void>;
} {
  const {
    instantLoading,
    state,
    loadingTimeout,
    clickZoom,
    onClick,
    onLoadingStart,
    onLoadingTimeout,
  } = params;

  const [internalState, setInternalState] =
    useState<ButtonProps["state"]>(state);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    setInternalState(state);
  }, [state]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== undefined) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClickWithLoading = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      if (instantLoading && !internalState) {
        onClick?.(event);

        if (clickZoom) {
          await new Promise<void>((resolve) => {
            setTimeout(resolve, 150);
          });
        }

        setInternalState("loading");
        onLoadingStart?.();

        timeoutRef.current = setTimeout(() => {
          setInternalState("error");
          onLoadingTimeout?.();
        }, loadingTimeout);
        return;
      }

      onClick?.(event);
    },
    [
      instantLoading,
      internalState,
      onClick,
      clickZoom,
      onLoadingStart,
      loadingTimeout,
      onLoadingTimeout,
    ],
  );

  return {
    internalState,
    setInternalState,
    timeoutRef,
    handleClickWithLoading,
  };
}
