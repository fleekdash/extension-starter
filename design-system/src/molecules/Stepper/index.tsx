/**
 * Stepper Component - V2.2
 *
 * Step-by-step progress indicator.
 * Migrated from V2 with all features preserved.
 *
 * @version 2.2.0
 */
"use client";

import { cn } from "../../internal";
import { Slot } from "@radix-ui/react-slot";
import { Icon } from "../../atoms/Icon";
import * as React from "react";
import { createContext, useContext } from "react";

// Types
type StepperContextValue = {
  activeStep: number;
  setActiveStep: (step: number) => void;
  orientation: "horizontal" | "vertical";
};

type StepItemContextValue = {
  step: number;
  state: StepState;
  isDisabled: boolean;
  isLoading: boolean;
};

type StepState = "active" | "completed" | "inactive" | "loading";

// Contexts
const StepperContext = createContext<StepperContextValue | undefined>(
  undefined,
);
const StepItemContext = createContext<StepItemContextValue | undefined>(
  undefined,
);

const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a Stepper");
  }
  return context;
};

const useStepItem = () => {
  const context = useContext(StepItemContext);
  if (!context) {
    throw new Error("useStepItem must be used within a StepperItem");
  }
  return context;
};

// Components
interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  orientation?: "horizontal" | "vertical";
}

function Stepper({
  defaultValue = 0,
  value,
  onValueChange,
  orientation = "horizontal",
  className,
  ...props
}: StepperProps) {
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
    <StepperContext.Provider
      value={{
        activeStep: currentStep,
        setActiveStep,
        orientation,
      }}>
      <div
        data-slot="stepper"
        className={cn(
          "group/stepper inline-flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
          className,
        )}
        data-orientation={orientation}
        {...props}
      />
    </StepperContext.Provider>
  );
}

// StepperItem
interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
  completed?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

function resolveStepState(
  step: number,
  activeStep: number,
  completed: boolean,
): StepState {
  if (completed || step < activeStep) {
    return "completed";
  }
  return activeStep === step ? "active" : "inactive";
}

function StepperItem({
  step,
  completed = false,
  disabled = false,
  loading = false,
  className,
  children,
  ...props
}: StepperItemProps) {
  const { activeStep } = useStepper();

  const state = resolveStepState(step, activeStep, completed);

  const isLoading = loading && step === activeStep;

  return (
    <StepItemContext.Provider
      value={{ step, state, isDisabled: disabled, isLoading }}>
      <div
        data-slot="stepper-item"
        className={cn(
          "group/step flex items-center group-data-[orientation=horizontal]/stepper:flex-row group-data-[orientation=vertical]/stepper:flex-col",
          className,
        )}
        data-state={state}
        {...(isLoading ? { "data-loading": true } : {})}
        {...props}>
        {children}
      </div>
    </StepItemContext.Provider>
  );
}

// StepperTrigger
interface StepperTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const StepperTrigger = React.forwardRef<HTMLButtonElement, StepperTriggerProps>(
  ({ asChild = false, className, children, ...props }, ref) => {
    const { setActiveStep } = useStepper();
    const { step, isDisabled } = useStepItem();

    if (asChild) {
      return (
        <Slot
          ref={ref}
          data-slot="stepper-trigger"
          className={className}
          {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        data-slot="stepper-trigger"
        data-field-focus=""
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 inline-flex items-center gap-3 rounded-full outline-hidden focus-visible:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        onClick={() => setActiveStep(step)}
        disabled={isDisabled}
        {...props}>
        {children}
      </button>
    );
  },
);
StepperTrigger.displayName = "StepperTrigger";

// StepperIndicator
interface StepperIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

function StepperIndicator({
  asChild = false,
  className,
  children,
  ...props
}: StepperIndicatorProps) {
  const { state, step, isLoading } = useStepItem();

  return (
    <span
      data-slot="stepper-indicator"
      className={cn(
        "bg-muted text-muted-foreground data-[state=active]:bg-primary data-[state=completed]:bg-primary data-[state=active]:text-primary-foreground data-[state=completed]:text-primary-foreground relative flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-medium",
        className,
      )}
      data-state={state}
      {...props}>
      {asChild ? (
        children
      ) : (
        <>
          <span className="data-loading:group/step:scale-0 data-loading:group/step:opacity-0 data-loading:group/step:transition-none data-[state=completed]:group/step:scale-0 data-[state=completed]:group/step:opacity-0 transition-all">
            {step}
          </span>
          <Icon
            name="check"
            className="absolute scale-0 opacity-0 transition-all group-data-[state=completed]/step:scale-100 group-data-[state=completed]/step:opacity-100"
          />
          {isLoading && (
            <span className="absolute transition-all">
              <Icon name="loader-circle" className="animate-spin" />
            </span>
          )}
        </>
      )}
    </span>
  );
}

// StepperTitle
function StepperTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      data-slot="stepper-title"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
}

// StepperDescription
function StepperDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="stepper-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

// StepperSeparator
function StepperSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="stepper-separator"
      className={cn(
        "bg-muted group-data-[state=completed]/step:bg-primary m-0.5 group-data-[orientation=horizontal]/stepper:h-0.5 group-data-[orientation=horizontal]/stepper:w-full group-data-[orientation=horizontal]/stepper:flex-1 group-data-[orientation=vertical]/stepper:h-12 group-data-[orientation=vertical]/stepper:w-0.5",
        className,
      )}
      {...props}
    />
  );
}

export {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
};
