import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Button } from "..";

const meta = {
  title: "Components/Inputs/Button",
  component: Button,
  parameters: {
    layout: "centered",
    controls: {
      exclude: [
        "asChild",
        "ref",
        "className",
        "style",
        "onAnimationStart",
        "onDragStart",
        "onDragEnd",
        "onDrag",
        "aria-label",
        "aria-labelledby",
        "aria-describedby",
        "aria-details",
        "aria-hidden",
        "onMouseDown",
        "onMouseUp",
        "onClick",
        "onClickCapture",
        "onDoubleClick",
        "onDoubleClickCapture",
        "onMouseMove",
        "onMouseMoveCapture",
        "onMouseEnter",
        "onMouseLeave",
        "onMouseOver",
        "onMouseOut",
        "onFocus",
        "onBlur",
        "type",
        "disabled",
        "name",
        "value",
        "form",
        "slot",
        "title",
        "translate",
        "lang",
        "role",
        "tabIndex",
        "hidden",
        "dir",
        "accessKey",
        "draggable",
        "spellCheck",
        "inputMode",
        "autoCapitalize",
        "autoCorrect",
        "autoSave",
        "itemProp",
        "itemScope",
        "itemType",
        "itemID",
        "itemRef",
        "enterKeyHint",
        "onAnimationEnd",
        "onAnimationIteration",
        "onTransitionEnd",
        "onTransitionStart",
        "onPointerDown",
        "onPointerMove",
        "onPointerUp",
        "onPointerCancel",
        "onPointerEnter",
        "onPointerLeave",
        "onPointerOver",
        "onPointerOut",
        "onGotPointerCapture",
        "onLostPointerCapture",
        "onScroll",
        "onTouchStart",
        "onTouchMove",
        "onTouchEnd",
        "onTouchCancel",
        "onCompositionStart",
        "onCompositionEnd",
        "onCompositionUpdate",
        "onSelect",
        "onSelectCapture",
        "onKeyDown",
        "onKeyUp",
        "onKeyPress",
        "onCopy",
        "onCut",
        "onPaste",
        "onWheel",
        "onContextMenu",
      ],
      include: [
        "variant",
        "size",
        "radius",
        "state",
        "icon",
        "iconPosition",
        "iconClassName",
        "loadingSpinner",
        "loadingText",
        "successText",
        "errorText",
        "squircle",
        "squircleSmoothing",
        "enableRipple",
        "clickZoom",
        "shiny",
        "instantLoading",
        "loadingTimeout",
        "timeoutErrorText",
        "minWidth",
        "showRetry",
        "retryText",
        "clickableInFinalState",
        "brandColor",
        "children",
      ],
    },
  },
  args: {
    onClick: fn(),
    onLoadingStart: fn(),
    onLoadingTimeout: fn(),
    onRetry: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
      description: "Visual style variant of the button",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg", "xl", "icon"],
      description: "Size variant of the button",
    },
    radius: {
      control: "select",
      options: ["none", "sm", "default", "md", "lg", "xl", "2xl", "full"],
      description: "Border radius of the button",
    },
    state: {
      control: "select",
      options: [null, "loading", "disabled", "success", "error"],
      description: "Current state of the button",
    },
    icon: {
      control: "text",
      description: "Icon map key (e.g., 'mail')",
    },
    iconPosition: {
      control: "radio",
      options: ["left", "right"],
      description: "Position of the icon relative to text",
    },
    iconClassName: {
      control: "text",
      description: "Additional classes for the icon",
    },
    loadingSpinner: {
      control: "select",
      options: ["default", "alt", "infinity", "twist"],
      description: "Style of loading spinner",
    },
    loadingText: {
      control: "text",
      description: "Text shown during loading state",
    },
    successText: {
      control: "text",
      description: "Text shown in success state",
    },
    errorText: {
      control: "text",
      description: "Text shown in error state",
    },
    squircle: {
      control: "boolean",
      description: "Enable squircle shape (overrides theme setting)",
    },
    squircleSmoothing: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Smoothing level for squircle corners",
    },
    enableRipple: {
      control: "boolean",
      description: "Enable ripple effect on click",
    },
    clickZoom: {
      control: "boolean",
      description: "Enable zoom effect on click",
    },
    shiny: {
      control: "select",
      options: [false, "hover", "permanent"],
      description: "Shiny effect style",
    },
    instantLoading: {
      control: "boolean",
      description: "Enable instant loading state",
    },
    loadingTimeout: {
      control: "number",
      description: "Timeout in ms for instant loading",
    },
    timeoutErrorText: {
      control: "text",
      description: "Error text shown on timeout",
    },
    minWidth: {
      control: "number",
      description: "Minimum width in pixels",
    },
    showRetry: {
      control: "boolean",
      description: "Show retry option on error",
    },
    retryText: {
      control: "text",
      description: "Text for retry button",
    },
    clickableInFinalState: {
      control: "boolean",
      description: "Allow clicks in success/error states",
    },
    brandColor: {
      control: "color",
      description: "Custom brand color (overrides variant)",
    },
    children: {
      control: "text",
      description: "Button content",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "default",
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
    shiny: "permanent",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
};

export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
  },
};

export const ExtraSmall: Story = {
  args: {
    children: "Extra Small",
    size: "xs",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
};

export const Icon: Story = {
  args: {
    size: "icon",
    icon: "search",
    "aria-label": "Search",
  },
};
