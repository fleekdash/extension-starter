"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";

import { useOverlayEnvironment } from "../../internal";
import { OVERLAY_CONTENT_Z_ABOVE_DRAWER } from "../../internal";
import { registerOverlay, unregisterOverlay } from "../../internal";
import { cn } from "../../internal";

// Context to share timeout reference between components
const PopoverContext = React.createContext<{
  mouseEnteredContent: () => void;
  mouseLeftContent: () => void;
  hasCloseDelay: boolean;
}>({
  mouseEnteredContent: () => {},
  mouseLeftContent: () => {},
  hasCloseDelay: false,
});

type PopoverProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Root
> & {
  closeOnMouseLeave?: boolean;
  closeDelay?: number;
};

const Popover = ({
  closeOnMouseLeave,
  closeDelay = 150,
  ...props
}: PopoverProps) => {
  const [open, setOpen] = React.useState(props.open || false);
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const { containerId } = useOverlayEnvironment();

  React.useEffect(() => {
    if (props.open !== undefined) {
      setOpen(props.open);
    }
  }, [props.open]);

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      if (!closeOnMouseLeave) {
        setOpen(open);
        props.onOpenChange?.(open);
        return;
      }

      // When opening, only update state
      if (open) {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
        setOpen(true);
        props.onOpenChange?.(true);
      } else {
        // When closing, add a delay
        closeTimeoutRef.current = setTimeout(() => {
          setOpen(false);
          props.onOpenChange?.(false);
        }, closeDelay);
      }
    },
    [closeOnMouseLeave, closeDelay, props],
  );

  const handleMouseLeave = React.useCallback(() => {
    if (closeOnMouseLeave) {
      handleOpenChange(false);
    }
  }, [closeOnMouseLeave, handleOpenChange]);

  const handleMouseEnter = React.useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const contextValue = React.useMemo(
    () => ({
      mouseEnteredContent: handleMouseEnter,
      mouseLeftContent: handleMouseLeave,
      hasCloseDelay: !!closeOnMouseLeave,
    }),
    [closeOnMouseLeave, handleMouseEnter, handleMouseLeave],
  );

  const effectiveOpen = props.open ?? open;
  const closeFnRef = React.useRef<() => void>(() => {});

  // Update ref in useEffect to avoid updating during render
  React.useEffect(() => {
    closeFnRef.current = () => handleOpenChange(false);
  }, [handleOpenChange]);

  React.useEffect(() => {
    if (!containerId || !effectiveOpen) {
      return;
    }

    const closer = () => closeFnRef.current();
    registerOverlay(containerId, closer);

    return () => {
      unregisterOverlay(containerId, closer);
    };
  }, [containerId, effectiveOpen]);

  return (
    <PopoverContext.Provider value={contextValue}>
      <PopoverPrimitive.Root
        data-slot="popover"
        {...props}
        open={props.open ?? open}
        onOpenChange={handleOpenChange}
        // ref removed: PopoverPrimitive.Root does not accept ref prop
      />
    </PopoverContext.Provider>
  );
};
Popover.displayName = "Popover";

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>(({ ...props }, ref) => {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      ref={ref}
      {...props}
    />
  );
});
PopoverTrigger.displayName = "PopoverTrigger";

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    showArrow?: boolean;
  }
>(
  (
    {
      className,
      align = "center",
      sideOffset = 4,
      showArrow = false,
      ...props
    },
    ref,
  ) => {
    const { mouseEnteredContent, mouseLeftContent, hasCloseDelay } =
      React.useContext(PopoverContext);

    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          data-slot="popover-content"
          align={align}
          sideOffset={sideOffset}
          className={cn(
            "bg-card text-card-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-border w-72 rounded-md border p-4 shadow-md outline-hidden",
            OVERLAY_CONTENT_Z_ABOVE_DRAWER,
            className,
          )}
          onMouseEnter={hasCloseDelay ? mouseEnteredContent : undefined}
          onMouseLeave={hasCloseDelay ? mouseLeftContent : undefined}
          {...props}>
          {props.children}
          {showArrow && (
            <PopoverPrimitive.Arrow className="fill-card -my-px drop-shadow-[0_1px_0_var(--border)]" />
          )}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    );
  },
);
PopoverContent.displayName = "PopoverContent";

const PopoverAnchor = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Anchor>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Anchor>
>(({ ...props }, ref) => {
  return (
    <PopoverPrimitive.Anchor data-slot="popover-anchor" ref={ref} {...props} />
  );
});
PopoverAnchor.displayName = "PopoverAnchor";

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
