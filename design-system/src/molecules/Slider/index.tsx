/**
 * Slider Component - V2.2
 *
 * Range slider input component.
 * Migrated from V2 with all features preserved.
 *
 * @version 2.2.0
 */
"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../molecules/Tooltip";
import { cn } from "../../internal";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  showTooltip = false,
  tooltipContent,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
  showTooltip?: boolean;
  tooltipContent?: (value: number) => React.ReactNode;
}) {
  const [internalValues, setInternalValues] = React.useState<number[]>(
    Array.isArray(value)
      ? value
      : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max],
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValues(Array.isArray(value) ? value : [value]);
    }
  }, [value]);

  const handleValueChange = (newValue: number[]) => {
    setInternalValues(newValue);
    props.onValueChange?.(newValue);
  };

  const [showTooltipState, setShowTooltipState] = React.useState(false);

  const handlePointerDown = () => {
    // Defer tooltip showing to prevent forced reflows
    requestAnimationFrame(() => {
      setShowTooltipState(true);
    });
  };

  const handlePointerUp = React.useCallback(() => {
    // Defer tooltip hiding with triple RAF for smooth performance
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShowTooltipState(false);
        });
      });
    });
  }, []);

  React.useEffect(() => {
    // Use passive listeners for better performance
    const handlePointerUpGlobal = (_e: PointerEvent) => {
      handlePointerUp();
    };

    if (showTooltip) {
      document.addEventListener("pointerup", handlePointerUpGlobal, {
        passive: true,
      });
      return () => {
        document.removeEventListener("pointerup", handlePointerUpGlobal);
      };
    }
  }, [showTooltip, handlePointerUp]);

  const renderThumb = (thumbValue: number) => {
    const thumb = (
      <SliderPrimitive.Thumb
        data-slot="slider-thumb"
        className="border-primary bg-background block size-4 shrink-0 rounded-full border shadow-xs outline-transparent transition-colors focus-visible:outline-blue-600 dark:focus-visible:outline-gray-600"
        onPointerDown={handlePointerDown}
      />
    );

    if (!showTooltip) return thumb;

    return (
      <TooltipProvider>
        <Tooltip open={showTooltipState}>
          <TooltipTrigger asChild>{thumb}</TooltipTrigger>
          <TooltipContent
            className="px-2 py-1 text-xs"
            sideOffset={8}
            side={props.orientation === "vertical" ? "right" : "top"}>
            <p>{tooltipContent ? tooltipContent(thumbValue) : thumbValue}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      onValueChange={handleValueChange}
      {...props}>
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
        )}>
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: internalValues.length }, (_, index) => (
        <React.Fragment key={index}>
          {renderThumb(internalValues[index])}
        </React.Fragment>
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
