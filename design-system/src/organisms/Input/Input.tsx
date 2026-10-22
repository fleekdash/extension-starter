import { Icon } from "../../atoms/Icon";
import {
  FIELD_FOCUS_CONTROL,
  FIELD_FOCUS_HAS_VISIBLE,
  FIELD_FOCUS_TRANSITION,
  FIELD_FOCUS_WITHIN,
  FIELD_FOCUS_WITHIN_INVALID,
} from "../../foundations/focus";
import { cn } from "../../internal";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { debugWarn, readNodeEnv, type MutableRef } from "../../internal";

// Define input size variants
const inputVariants = cva(
  `
    flex w-full bg-card border border-input text-card-foreground placeholder:text-muted-foreground/80
    ${FIELD_FOCUS_CONTROL}
    disabled:cursor-not-allowed disabled:opacity-60
    [[readonly]]:bg-muted/80 [[readonly]]:cursor-not-allowed
    file:h-full [[type=file]]:py-0 file:border-solid file:border-input file:bg-transparent
    file:font-medium file:not-italic file:text-card-foreground file:p-0 file:border-0 file:border-e
  `,
  {
    variants: {
      variant: {
        lg: "h-10 px-4 text-sm rounded-md file:pe-4 file:me-4",
        md: "h-8.5 px-3 text-[0.8125rem] leading-(--text-sm--line-height) rounded-md file:pe-3 file:me-3",
        sm: "h-7 px-2.5 text-xs rounded-sm file:pe-2.5 file:me-2.5",
      },
    },
    defaultVariants: {
      variant: "md",
    },
  },
);

const inputAddonVariants = cva(
  `flex items-center shrink-0 justify-center bg-muted/50 border border-input shadow-xs shadow-[rgba(0,0,0,0.05)] text-card-foreground
   [&_svg]:text-current group-focus-within:text-primary group-aria-invalid:text-destructive`,
  {
    variants: {
      variant: {
        sm: "rounded-md h-7 min-w-7 text-xs px-2.5 [&_svg:not([class*=size-])]:size-3.5",
        md: "rounded-md h-8.5 min-w-8.5 px-3 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4.5",
        lg: "rounded-md h-10 min-w-10 px-4 text-sm [&_svg:not([class*=size-])]:size-4.5",
      },
      mode: {
        default: "",
        icon: "px-0 justify-center",
      },
    },
    defaultVariants: {
      variant: "md",
      mode: "default",
    },
  },
);

const inputGroupVariants = cva(
  `
    group flex items-stretch rounded-md overflow-hidden border border-input bg-[var(--input-bg)]
    ${FIELD_FOCUS_TRANSITION} ${FIELD_FOCUS_WITHIN} ${FIELD_FOCUS_WITHIN_INVALID}

    [&_[data-slot=input]]:grow [&_[data-slot=input]]:border-0 [&_[data-slot=input]]:bg-transparent [&_[data-slot=input]]:shadow-none
    [&_[data-slot=input]]:focus-visible:shadow-none [&_[data-slot=input]]:focus-visible:border-transparent [&_[data-slot=input]]:focus-visible:outline-none
    [&_[data-slot=input-addon]]:border-0 [&_[data-slot=input-addon]]:bg-transparent
    [&_[data-slot=button]]:border-0 [&_[data-slot=button]]:bg-transparent

    [&_[data-slot=input-addon]:has(+[data-slot=input])]:rounded-e-none
    [&_[data-slot=input-addon]:has(+[data-slot=datefield])]:rounded-e-none
    [&_[data-slot=input]+[data-slot=input-addon]]:rounded-s-none
    [&_[data-slot=input-addon]:has(+[data-slot=button])]:rounded-e-none
    [&_[data-slot=input]+[data-slot=button]]:rounded-s-none
    [&_[data-slot=button]+[data-slot=input]]:rounded-s-none
    [&_[data-slot=input-addon]+[data-slot=input]]:rounded-s-none
    [&_[data-slot=input-addon]+[data-slot=datefield]]:[&_[data-slot=input]]:rounded-s-none
    [&_[data-slot=datefield]:has(+[data-slot=input-addon])]:[&_[data-slot=input]]:rounded-e-none
    [&_[data-slot=input]:has(+[data-slot=button])]:rounded-e-none
    [&_[data-slot=input]:has(+[data-slot=input-addon])]:rounded-e-none
    [&_[data-slot=datefield]]:grow
    [&_[data-slot=datefield]+[data-slot=input-addon]]:rounded-s-none

    /* Adjust padding when inside a group */
    [&_[data-slot=input-addon]+[data-slot=input]]:ps-0
    [&_[data-slot=input]:has(+[data-slot=input-addon])]:pe-0
    [&_[data-slot=input]:has(+[data-slot=button])]:pe-0
    [&_[data-slot=button]+[data-slot=input]]:ps-0
  `,
  {
    variants: {},
    defaultVariants: {},
  },
);

const inputWrapperVariants = cva(
  `
    flex items-center gap-1.5
    ${FIELD_FOCUS_TRANSITION} ${FIELD_FOCUS_HAS_VISIBLE}

    **:data-[slot=datefield]:grow
    **:data-[slot=input]:data-focus-within:ring-transparent
    **:data-[slot=input]:data-focus-within:ring-0
    **:data-[slot=input]:data-focus-within:border-0
    **:data-[slot=input]:flex
    **:data-[slot=input]:w-full
    **:data-[slot=input]:outline-none
    **:data-[slot=input]:text-card-foreground
    **:data-[slot=input]:placeholder:text-muted-foreground
    **:data-[slot=input]:border-0
    **:data-[slot=input]:bg-transparent
    **:data-[slot=input]:p-0
    **:data-[slot=input]:shadow-none
    **:data-[slot=input]:focus-visible:border-transparent
    **:data-[slot=input]:focus-visible:shadow-none
    **:data-[slot=input]:focus-visible:ring-0
    **:data-[slot=input]:h-auto
    **:data-[slot=input]:disabled:cursor-not-allowed
    **:data-[slot=input]:disabled:opacity-50

    [&_svg]:text-muted-foreground
  `,
  {
    variants: {
      variant: {
        sm: "gap-1.25 [&_svg:not([class*=size-])]:size-3.5",
        md: "gap-1.5 [&_svg:not([class*=size-])]:size-4",
        lg: "gap-1.5 [&_svg:not([class*=size-])]:size-4",
      },
    },
    defaultVariants: {
      variant: "md",
    },
  },
);

// Safe ref merging utility
function setRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(node);
      } else if (typeof ref === "object" && ref !== null) {
        try {
          (ref as MutableRef<T | null>).current = node;
        } catch (error) {
          if (readNodeEnv() !== "production") {
            debugWarn("MAIN", "[Input] Failed to assign ref", error);
          }
        }
      }
    });
  };
}

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> &
    VariantProps<typeof inputVariants> & {
      autoFocusOnVisible?: boolean;
      prefixIcon?: string;
      suffixIcon?: string;
    }
>(
  (
    {
      className,
      type,
      variant,
      autoFocusOnVisible,
      prefixIcon,
      suffixIcon,
      ...props
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    // Check if we're inside an InputGroup
    const [isInGroup, setIsInGroup] = React.useState(false);

    React.useEffect(() => {
      if (!autoFocusOnVisible || !inputRef.current) return;
      let observer: IntersectionObserver | null = null;
      function handle(entries: IntersectionObserverEntry[]) {
        if (entries[0].isIntersecting) {
          inputRef.current?.focus();
          observer?.disconnect();
        }
      }
      observer = new globalThis.IntersectionObserver(handle, {
        threshold: 0.1,
      });
      observer.observe(inputRef.current);
      return () => observer?.disconnect();
    }, [autoFocusOnVisible]);

    // Check if we're inside an InputGroup
    React.useEffect(() => {
      if (!inputRef.current) return;
      const parent = inputRef.current.closest('[data-slot="input-group"]');
      setIsInGroup(!!parent);
    }, []);

    // Wrapper for icons
    const hasPrefix =
      !!prefixIcon &&
      typeof prefixIcon === "string" &&
      prefixIcon.trim() !== "";
    const hasSuffix =
      !!suffixIcon &&
      typeof suffixIcon === "string" &&
      suffixIcon.trim() !== "";

    // Merge refs via shared utility

    // If we're in a group, we don't need the wrapper
    if (isInGroup) {
      return (
        <>
          {hasPrefix && (
            <span className="text-muted-foreground pointer-events-none absolute start-2 flex items-center">
              <Icon name={prefixIcon} className="h-4 w-4" />
            </span>
          )}
          <input
            data-slot="input"
            type={type}
            ref={setRefs(ref, inputRef)}
            tabIndex={props.tabIndex ?? 0}
            className={cn(
              inputVariants({ variant }),
              hasPrefix && "ps-7",
              hasSuffix && "pe-7",
              "pointer-events-auto",
            )}
            {...props}
          />
          {hasSuffix && (
            <span className="text-muted-foreground pointer-events-none absolute end-2 flex items-center">
              <Icon name={suffixIcon} className="h-4 w-4" />
            </span>
          )}
        </>
      );
    }

    // If not in a group, use the wrapper and apply className to the wrapper
    return (
      <div className={cn("relative flex w-full items-center", className)}>
        {hasPrefix && (
          <span className="text-muted-foreground pointer-events-none absolute start-2.5 flex items-center">
            <Icon name={prefixIcon} className="h-4 w-4" />
          </span>
        )}
        <input
          data-slot="input"
          type={type}
          ref={setRefs(ref, inputRef)}
          tabIndex={props.tabIndex ?? 0}
          className={cn(
            inputVariants({ variant }),
            hasPrefix && "ps-8",
            hasSuffix && "pe-8",
            "pointer-events-auto",
          )}
          {...props}
        />
        {hasSuffix && (
          <span className="text-muted-foreground pointer-events-none absolute end-2.5 flex items-center">
            <Icon name={suffixIcon} className="h-4 w-4" />
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

function InputAddon({
  className,
  variant,
  mode,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputAddonVariants>) {
  return (
    <div
      data-slot="input-addon"
      className={cn(inputAddonVariants({ variant, mode }), className)}
      {...props}
    />
  );
}

function InputGroup({
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupVariants>) {
  return (
    <div
      data-slot="input-group"
      className={cn(inputGroupVariants(), className)}
      {...props}
    />
  );
}

function InputWrapper({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputWrapperVariants>) {
  return (
    <div
      data-slot="input-wrapper"
      className={cn(
        inputVariants({ variant }),
        inputWrapperVariants({ variant }),
        className,
      )}
      {...props}
    />
  );
}

export {
  Input,
  InputAddon,
  inputAddonVariants,
  InputGroup,
  inputVariants,
  InputWrapper,
};
