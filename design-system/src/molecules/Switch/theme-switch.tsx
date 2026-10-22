"use client";

import { useId, useState } from "react";
import { Icon } from "../../atoms/Icon";
import { tv, type VariantProps } from "tailwind-variants";

import { Label } from "../../organisms/Label";
import Switch from "./switch";

const themeSwitch = tv({
  slots: {
    wrapper: "relative inline-grid items-center font-medium",
    switchBase: [
      "peer",
      "data-[state=checked]:bg-input/50",
      "data-[state=unchecked]:bg-input/50",
      "absolute",
      "inset-0",
      "h-[inherit]",
      "w-auto",
      "[&_span]:h-full",
      "[&_span]:w-1/2",
      "[&_span]:transition-transform",
      "[&_span]:duration-300",
      "[&_span]:ease-[cubic-bezier(0.16,1,0.3,1)]",
      "[&_span]:data-[state=checked]:translate-x-full",
      "[&_span]:data-[state=checked]:rtl:-translate-x-full",
    ],
    iconWrapper:
      "pointer-events-none relative flex items-center justify-center text-center",
    moonIcon: "peer-data-[state=checked]:text-white/40 ms-0.5",
    sunIcon: "peer-data-[state=unchecked]:text-muted-foreground/70 me-0.5",
    label: "sr-only",
  },
  variants: {
    size: {
      sm: {
        wrapper: "h-7 grid-cols-[1fr_1fr] text-xs",
        iconWrapper: "min-w-6",
      },
      md: {
        wrapper: "h-9 grid-cols-[1fr_1fr] text-sm",
        iconWrapper: "min-w-8",
      },
      lg: {
        wrapper: "h-11 grid-cols-[1fr_1fr] text-base",
        iconWrapper: "min-w-10",
      },
    },
    variant: {
      default: {
        switchBase: "bg-input/50",
        moonIcon: "text-foreground",
        sunIcon: "text-foreground",
      },
      ghost: {
        switchBase: "hover:bg-accent/50 bg-transparent",
        moonIcon:
          "text-muted-foreground peer-data-[state=checked]:text-muted-foreground/10",
        sunIcon: "text-muted-foreground",
      },
    },
  },
  defaultVariants: {
    size: "sm",
    variant: "default",
  },
});

// Extract variant props type
type ThemeSwitchVariants = VariantProps<typeof themeSwitch>;

// Component props
interface ThemeSwitchProps extends ThemeSwitchVariants {
  className?: string;
  defaultChecked?: boolean;
}

export default function ThemeSwitch({
  size,
  variant,
  className,
  defaultChecked = true,
}: Readonly<ThemeSwitchProps>) {
  const id = useId();
  const [checked, setChecked] = useState<boolean>(defaultChecked);
  const styles = themeSwitch({ size, variant, className });

  return (
    <div>
      <div className={styles.wrapper()}>
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={setChecked}
          className={styles.switchBase()}
        />
        <span className={`${styles.iconWrapper()} ${styles.moonIcon()}`}>
          <Icon name="moon" className="size-2 fill-current" />
        </span>
        <span className={`${styles.iconWrapper()} ${styles.sunIcon()}`}>
          <Icon name="sun" className="size-2 fill-current" />
        </span>
      </div>
      <Label htmlFor={id} className={styles.label()}>
        Theme switch
      </Label>
    </div>
  );
}
