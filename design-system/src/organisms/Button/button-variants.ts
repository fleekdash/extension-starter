import { tv } from "tailwind-variants";

export const button = tv({
  base: "inline-flex items-center justify-center text-sm font-medium focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background leading-none duration-200",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline:
        "bg-card border border-border text-card-foreground hover:bg-card-5 hover:text-card-foreground",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:text-card-foreground dark:!text-card-foreground dark:hover:!text-card-foreground",
      ghost:
        "hover:bg-[var(--ghost-hover-bg)] hover:text-[var(--ghost-hover-text)]",
      "ghost-default":
        "bg-muted/80 dark:bg-white/20 hover:bg-muted hover:text-[var(--ghost-hover-text)]",
      link: "underline-offset-4 hover:underline text-primary hover:text-primary-darken",
      mono: "dark:bg-[var(--background)] dark:text-[var(--card-foreground)] bg-[var(--background)] text-[var(--card-foreground)] hover:bg-[var(--muted)] hover:text-[var(--card-foreground)]",
      success:
        "border text-green-700 bg-green-50 border-green-300/60 hover:bg-green-100 hover:text-green-800 hover:border-green-400/80 dark:bg-green-950/50 dark:text-green-300 dark:border-green-700/50 dark:hover:bg-green-900/60 dark:hover:text-green-200 dark:hover:border-green-600/70 transition-colors",
      warning:
        "border text-yellow-700 bg-yellow-50 border-yellow-300/60 hover:bg-yellow-100 hover:text-yellow-800 hover:border-yellow-400/80 dark:bg-yellow-950/50 dark:text-yellow-300 dark:border-yellow-700/50 dark:hover:bg-yellow-900/60 dark:hover:text-yellow-200 dark:hover:border-yellow-600/70 transition-colors",
      danger:
        "border text-red-700 bg-red-50 border-red-300/60 hover:bg-red-100 hover:text-red-800 hover:border-red-400/80 dark:bg-red-950/50 dark:text-red-300 dark:border-red-700/50 dark:hover:bg-red-900/60 dark:hover:text-red-200 dark:hover:border-red-600/70 transition-colors",
      info: "border text-blue-700 bg-blue-50 border-blue-300/60 hover:bg-blue-100 hover:text-blue-800 hover:border-blue-400/80 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-700/50 dark:hover:bg-blue-900/60 dark:hover:text-blue-200 dark:hover:border-blue-600/70 transition-colors",
    },
    size: {
      xs: "h-7 px-3 text-xs [&.icon-button]:w-7 [&.icon-button]:p-0 [&.icon-button]:aspect-square",
      sm: "h-9 px-4 [&.icon-button]:w-9 [&.icon-button]:p-0 [&.icon-button]:aspect-square",
      default:
        "h-10 px-4 [&.icon-button]:w-10 [&.icon-button]:p-0 [&.icon-button]:aspect-square",
      lg: "h-11 px-8 [&.icon-button]:w-11 [&.icon-button]:p-0 [&.icon-button]:aspect-square",
      xl: "h-12 px-12 [&.icon-button]:w-12 [&.icon-button]:p-0 [&.icon-button]:aspect-square",
      icon: "h-10 w-10 p-0 aspect-square",
      "filter-xs":
        "h-7 ps-2.5 pe-0.5 text-xs [&.icon-button]:w-7 [&.icon-button]:p-0 [&.icon-button]:aspect-square",
    },
    radius: {
      none: "rounded-(--radius-none)",
      xs: "rounded-(--radius-xs)",
      sm: "rounded-(--radius-sm)",
      default: "rounded-(--radius-default)",
      md: "rounded-(--radius-md)",
      lg: "rounded-(--radius-lg)",
      xl: "rounded-(--radius-xl)",
      "2xl": "rounded-(--radius-2xl)",
      "3xl": "rounded-(--radius-3xl)",
      full: "rounded-(--radius-full)",
    },
    state: {
      success: "bg-success text-success-foreground hover:bg-success/90",
      error:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      loading: "",
      disabled: "opacity-50 cursor-not-allowed",
      default: "",
    },
    fullWidth: {
      true: "w-full",
      false: "w-auto",
    },
    isLightVariant: {
      true: "light",
      false: "",
    },
    enableRipple: {
      true: "btn-ripple",
      false: "",
    },
    shiny: {
      hover: "animation animation-hover",
      permanent: "animation animation-permanent",
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: ["outline", "ghost", "link"],
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "default",
    radius: "default",
    enableRipple: true,
    state: "default",
    fullWidth: false,
  },
});
