import { Icon, MenuTriggerChevron } from "../../atoms/Icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../molecules/Tooltip";
import { cn } from "../../internal";
import type { ReactNode } from "react";
import { resolveButtonRowJustifyClass } from "./button-state-helpers";
import type {
  ButtonContentAlign,
  ButtonProps,
  ButtonSizeProp,
  ReadonlyRef,
} from "./button-types";

export interface ButtonRowContentProps {
  readonly iconOnly: boolean;
  readonly stateIcon: string | undefined;
  readonly size: ButtonSizeProp;
  readonly children: ReactNode;
  readonly iconPosition: NonNullable<ButtonProps["iconPosition"]>;
  readonly isClampableText: boolean;
  readonly isTextTruncated: boolean;
  readonly stateText: ReactNode;
  readonly textTitle: string | undefined;
  readonly textRef: ReadonlyRef<HTMLSpanElement>;
  readonly iconStyles: string;
  /** Size-based gap between side icon(s) and label (same row as icons + text). */
  readonly iconTextRowGap: string;
  /** When true, row uses full-width label flex rules (e.g. menu rows). */
  readonly fullWidth: boolean;
  /** True when a leading/trailing icon shares the row with the label (e.g. menu rows with `icon` prop). */
  readonly hasSideIcon: boolean;
  readonly contentAlign: ButtonContentAlign;
  readonly menuChevron: boolean;
}

function resolveSideIconLabelClass(
  fullWidth: boolean,
  hasSideIcon: boolean,
  iconPosition: NonNullable<ButtonProps["iconPosition"]>,
  contentAlign: ButtonContentAlign,
): string | undefined {
  if (!fullWidth || !hasSideIcon) {
    return undefined;
  }
  if (contentAlign === "center") {
    return "!justify-center !text-center";
  }
  if (contentAlign === "right") {
    return "!justify-end !text-end";
  }
  return iconPosition === "right"
    ? "!justify-end !text-end"
    : "!justify-start !text-start";
}

function resolveLabelWrapperClassName(params: {
  readonly isRichLabel: boolean;
  readonly fullWidth: boolean;
  readonly iconOnly: boolean;
  readonly contentAlign: ButtonContentAlign;
}): string {
  const { isRichLabel, fullWidth, iconOnly, contentAlign } = params;
  const rowJustify = resolveButtonRowJustifyClass(contentAlign);
  let textAlign: "text-start" | "text-center" | "text-end" = "text-center";
  if (contentAlign === "left") {
    textAlign = "text-start";
  } else if (contentAlign === "right") {
    textAlign = "text-end";
  }

  if (isRichLabel) {
    // Rich labels (e.g. asChild <a>): never use flex-1 unless fullWidth — flex-1 steals
    // horizontal space and makes the side icon look "stuck" left while text centers alone.
    return fullWidth
      ? cn(
          "flex min-h-0 min-w-0 flex-1 items-center",
          rowJustify,
          !iconOnly && textAlign,
        )
      : cn(
          "inline-flex min-h-0 min-w-0 max-w-full items-center",
          rowJustify,
          !iconOnly && textAlign,
        );
  }

  const textLabelAlignmentClasses = fullWidth
    ? cn("min-w-0 flex-1", rowJustify, !iconOnly && textAlign)
    : !iconOnly && cn(rowJustify, textAlign);

  return cn(
    "relative inline-flex items-center gap-x-1 leading-6 whitespace-nowrap",
    textLabelAlignmentClasses,
  );
}

function renderSideIconSlot(
  renderIcon: (iconName: string | undefined) => ReactNode,
  iconName: string | undefined,
  position: "left" | "right",
  currentPosition: NonNullable<ButtonProps["iconPosition"]>,
) {
  if (!iconName || currentPosition !== position) {
    return null;
  }
  return (
    <span className="flex shrink-0 items-center">{renderIcon(iconName)}</span>
  );
}

function CenteredSideIconCluster(params: {
  readonly stateIcon: string | undefined;
  readonly iconPosition: NonNullable<ButtonProps["iconPosition"]>;
  readonly iconTextRowGap: string;
  readonly isRichLabel: boolean;
  readonly labelBody: ReactNode;
  readonly labelWrapperClass: string;
  readonly renderIconSlot: (iconName: string | undefined) => ReactNode;
  readonly contentAlign: ButtonContentAlign;
}) {
  const {
    stateIcon,
    iconPosition,
    iconTextRowGap,
    isRichLabel,
    labelBody,
    labelWrapperClass,
    renderIconSlot,
    contentAlign,
  } = params;

  const rowJustify = resolveButtonRowJustifyClass(contentAlign);

  return (
    <span
      className={cn(
        "flex h-full min-h-0 w-full items-center leading-none",
        rowJustify,
      )}>
      <span
        className={cn(
          "inline-flex h-full max-w-full items-center",
          rowJustify,
          iconTextRowGap,
        )}>
        {renderSideIconSlot(renderIconSlot, stateIcon, "left", iconPosition)}
        {isRichLabel ? (
          <span className="contents">{labelBody}</span>
        ) : (
          <span className={labelWrapperClass}>{labelBody}</span>
        )}
        {renderSideIconSlot(renderIconSlot, stateIcon, "right", iconPosition)}
      </span>
    </span>
  );
}

function WideSideIconRow(params: {
  readonly stateIcon: string | undefined;
  readonly iconPosition: NonNullable<ButtonProps["iconPosition"]>;
  readonly iconTextRowGap: string;
  readonly isRichLabel: boolean;
  readonly fullWidth: boolean;
  readonly labelBody: ReactNode;
  readonly labelWrapperClass: string;
  readonly contentAlign: ButtonContentAlign;
  readonly renderIconSlot: (iconName: string | undefined) => ReactNode;
}) {
  const {
    stateIcon,
    iconPosition,
    iconTextRowGap,
    isRichLabel,
    fullWidth,
    labelBody,
    labelWrapperClass,
    contentAlign,
    renderIconSlot,
  } = params;

  const rowJustify = resolveButtonRowJustifyClass(contentAlign);

  return (
    <span
      className={cn(
        "flex h-full w-full min-w-0 leading-none",
        isRichLabel && fullWidth ? "items-stretch" : "items-center",
        rowJustify,
        iconTextRowGap,
      )}>
      {renderSideIconSlot(renderIconSlot, stateIcon, "left", iconPosition)}
      <span className={labelWrapperClass}>{labelBody}</span>
      {renderSideIconSlot(renderIconSlot, stateIcon, "right", iconPosition)}
    </span>
  );
}

function wrapLabelWithMenuChevron(
  labelBody: ReactNode,
  menuChevron: boolean,
): ReactNode {
  if (!menuChevron) {
    return labelBody;
  }

  return (
    <span className="inline-flex items-center gap-1">
      {labelBody}
      <MenuTriggerChevron />
    </span>
  );
}

export function ButtonRowContent({
  iconOnly,
  stateIcon,
  size,
  children,
  iconPosition,
  isClampableText,
  isTextTruncated,
  stateText,
  textTitle,
  textRef,
  iconStyles,
  iconTextRowGap,
  fullWidth,
  hasSideIcon,
  contentAlign,
  menuChevron,
}: ButtonRowContentProps) {
  const renderIconSlot = (iconName: string | undefined) => {
    if (!iconName) {
      return null;
    }

    return (
      <Icon
        name={iconName}
        className={cn(iconStyles, "shrink-0")}
        showSkeleton={true}
        skeletonClassName={cn(iconStyles, "shrink-0")}
        aria-hidden="true"
      />
    );
  };

  if (iconOnly && stateIcon) {
    return <>{renderIconSlot(stateIcon)}</>;
  }

  if (size === "icon" && children) {
    return <>{children}</>;
  }

  let labelBody: ReactNode;
  const sideIconLabelClass = resolveSideIconLabelClass(
    fullWidth,
    hasSideIcon,
    iconPosition,
    contentAlign,
  );

  if (isClampableText && isTextTruncated) {
    labelBody = (
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            ref={textRef}
            className={cn("btn-label truncate", sideIconLabelClass)}>
            {stateText}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{textTitle}</p>
        </TooltipContent>
      </Tooltip>
    );
  } else if (isClampableText) {
    labelBody = (
      <span ref={textRef} className={cn("btn-label", sideIconLabelClass)}>
        {stateText}
      </span>
    );
  } else {
    labelBody = stateText;
  }

  labelBody = wrapLabelWithMenuChevron(labelBody, menuChevron);

  const isRichLabel = !isClampableText;

  const labelWrapperClass = resolveLabelWrapperClassName({
    isRichLabel,
    fullWidth,
    iconOnly,
    contentAlign,
  });

  // Non–full-width + side icon: keep icon + label as one centered cluster (fixes asChild <a>
  // expanding in the outer row and "centering" only the link text).
  if (hasSideIcon && !fullWidth) {
    return (
      <CenteredSideIconCluster
        stateIcon={stateIcon}
        iconPosition={iconPosition}
        iconTextRowGap={iconTextRowGap}
        isRichLabel={isRichLabel}
        labelBody={labelBody}
        labelWrapperClass={labelWrapperClass}
        renderIconSlot={renderIconSlot}
        contentAlign={contentAlign}
      />
    );
  }

  return (
    <WideSideIconRow
      stateIcon={stateIcon}
      iconPosition={iconPosition}
      iconTextRowGap={iconTextRowGap}
      isRichLabel={isRichLabel}
      fullWidth={fullWidth}
      labelBody={labelBody}
      labelWrapperClass={labelWrapperClass}
      contentAlign={contentAlign}
      renderIconSlot={renderIconSlot}
    />
  );
}
