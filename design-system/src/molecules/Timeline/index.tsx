/**
 * Timeline Component - V2.2
 *
 * Timeline component for events.
 * Migrated from V2 with all features preserved.
 *
 * @version 2.2.0
 */
"use client";

import { cn } from "../../internal";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

// Types
type TimelineContextValue = {
  activeStep: number;
  setActiveStep: (step: number) => void;
};

// Context
const TimelineContext = React.createContext<TimelineContextValue | undefined>(
  undefined,
);

const useTimeline = () => {
  const context = React.useContext(TimelineContext);
  if (!context) {
    throw new Error("useTimeline must be used within a Timeline");
  }
  return context;
};

// Components
interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  orientation?: "horizontal" | "vertical";
}

function Timeline({
  defaultValue = 1,
  value,
  onValueChange,
  orientation = "vertical",
  className,
  ...props
}: TimelineProps) {
  const [activeStep, setInternalStep] = React.useState(defaultValue);

  const setActiveStep = React.useCallback(
    (step: number) => {
      if (value === undefined) {
        setInternalStep(step);
      }
      onValueChange?.(step);
    },
    [value, onValueChange],
  );

  const currentStep = value ?? activeStep;

  return (
    <TimelineContext.Provider
      value={{ activeStep: currentStep, setActiveStep }}>
      <div
        data-slot="timeline"
        className={cn(
          "group/timeline flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
          className,
        )}
        data-orientation={orientation}
        {...props}
      />
    </TimelineContext.Provider>
  );
}

// TimelineContent
function TimelineContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="timeline-content"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

// TimelineDate
interface TimelineDateProps extends React.HTMLAttributes<HTMLTimeElement> {
  asChild?: boolean;
}

function TimelineDate({
  asChild = false,
  className,
  ...props
}: TimelineDateProps) {
  const Comp = asChild ? Slot : "time";

  return (
    <Comp
      data-slot="timeline-date"
      className={cn(
        "text-muted-foreground data-[orientation=vertical]:group/timeline:max-sm:h-4 mb-1 block text-xs font-medium",
        className,
      )}
      {...props}
    />
  );
}

// TimelineHeader
function TimelineHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="timeline-header" className={cn(className)} {...props} />
  );
}

// TimelineIndicator
interface TimelineIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

function TimelineIndicator({
  asChild = false,
  className,
  children,
  ...props
}: TimelineIndicatorProps) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      data-slot="timeline-indicator"
      className={cn(
        "border-primary/20 completed:group/timeline-item:border-primary data-[orientation=horizontal]:group/timeline:-top-6 data-[orientation=horizontal]:group/timeline:start-0 data-[orientation=horizontal]:group/timeline:-translate-y-1/2 data-[orientation=vertical]:group/timeline:top-0 data-[orientation=vertical]:group/timeline:-start-6 data-[orientation=vertical]:group/timeline:-translate-x-1/2 data-[orientation=vertical]:group/timeline:rtl:translate-x-1/2 absolute size-4 rounded-full border-2",
        className,
      )}
      aria-hidden="true"
      {...props}>
      {children}
    </Comp>
  );
}

// TimelineItem
interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
}

function TimelineItem({ step, className, ...props }: TimelineItemProps) {
  const { activeStep } = useTimeline();

  return (
    <div
      data-slot="timeline-item"
      className={cn(
        "group/timeline-item has-[+[data-completed]]:**:data-[slot=timeline-separator]:bg-primary relative flex flex-1 flex-col gap-0.5 group-data-[orientation=horizontal]/timeline:mt-8 group-data-[orientation=horizontal]/timeline:not-last:pe-8 group-data-[orientation=vertical]/timeline:ms-8 group-data-[orientation=vertical]/timeline:not-last:pb-12",
        className,
      )}
      data-completed={step <= activeStep || undefined}
      {...props}
    />
  );
}

// TimelineSeparator
function TimelineSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="timeline-separator"
      className={cn(
        "bg-primary/10 last:group/timeline-item:hidden data-[orientation=horizontal]:group/timeline:-top-6 data-[orientation=horizontal]:group/timeline:h-0.5 data-[orientation=horizontal]:group/timeline:w-[calc(100%-1rem-0.25rem)] data-[orientation=horizontal]:group/timeline:-translate-y-1/2 data-[orientation=horizontal]:group/timeline:translate-x-4.5 data-[orientation=horizontal]:group/timeline:rtl:-translate-x-4.5 data-[orientation=vertical]:group/timeline:-start-6 data-[orientation=vertical]:group/timeline:h-[calc(100%-1rem-0.25rem)] data-[orientation=vertical]:group/timeline:w-0.5 data-[orientation=vertical]:group/timeline:-translate-x-1/2 data-[orientation=vertical]:group/timeline:rtl:translate-x-1/2 data-[orientation=vertical]:group/timeline:translate-y-4.5 absolute self-start",
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

// TimelineTitle
function TimelineTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      data-slot="timeline-title"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
}

export {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
};
