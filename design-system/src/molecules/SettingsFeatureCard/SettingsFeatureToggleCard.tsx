"use client";

import type { CSSProperties, ReactNode } from "react";
import { OptimisticSwitch } from "../../molecules/Switch";
import { cn } from "../../internal";
import {
  getSettingsFeatureCopyClass,
  getSettingsFeatureIconBoxClass,
  getSettingsFeatureIconColor,
  getSettingsFeatureIconStyle,
  getSettingsFeatureIconTintStyle,
  getSettingsFeatureSwitchClass,
  getSettingsFeatureTitleCombinedClass,
  getSettingsFeatureToggleCardClass,
  SETTINGS_FEATURE_CARD_HOVER_REVEAL_ACTIONS_CLASS,
  SETTINGS_FEATURE_CARD_ROW_CLASS,
  SETTINGS_FEATURE_CARD_SETTINGS_PANEL_CLASS,
  SETTINGS_FEATURE_CARD_TRAILING_COLUMN_CLASS,
  SETTINGS_FEATURE_CARD_BODY_STATIC_CLASS,
  SETTINGS_FEATURE_CARD_TOGGLE_BUTTON_CLASS,
  SETTINGS_FEATURE_DESCRIPTION_CLASS,
} from "./settings-feature-card-classes";

/**
 * Resolves the icon-thumb style: tinted box background plus `color` for the
 * glyph (`currentColor` icons inherit it). `iconTintColor === null` opts out
 * and renders a plain thumb; `undefined` auto-derives a stable palette color.
 */
function resolveIconBoxStyle({
  iconTintColor,
  iconColorSeed,
  title,
  toggleAriaLabel,
}: {
  readonly iconTintColor: string | null | undefined;
  readonly iconColorSeed: string | undefined;
  readonly title: ReactNode;
  readonly toggleAriaLabel: string;
}): CSSProperties | undefined {
  const seed =
    iconColorSeed ?? (typeof title === "string" ? title : toggleAriaLabel);
  // `""` is treated as opt-out, not auto — an explicit-but-empty tint is the
  // caller saying "no color", and `getSettingsFeatureIconTintStyle` would
  // turn it into invalid CSS (`backgroundColor: "15"`).
  const color =
    iconTintColor === undefined
      ? getSettingsFeatureIconColor(seed)
      : iconTintColor || null;
  if (color === null) {
    return undefined;
  }
  return {
    ...getSettingsFeatureIconTintStyle(color),
    ...getSettingsFeatureIconStyle(color),
  };
}

export interface SettingsFeatureToggleCardProps {
  readonly enabled: boolean;
  readonly disabled?: boolean;
  /** Disables the switch only — the card stays clickable (reset, view, etc.). */
  readonly switchDisabled?: boolean;
  /**
   * Drops the switch entirely. Use when the card's on/off state is driven by a
   * dedicated control in `trailingContent` (an eye toggle, say) so the row does
   * not carry two competing affordances for the same thing.
   */
  readonly switchHidden?: boolean;
  readonly inactive?: boolean;
  readonly toggleAriaLabel: string;
  readonly switchAriaLabel?: string;
  /** Defaults to `enabled`. Use for select-vs-toggle cards (pressed = selected). */
  readonly pressed?: boolean;
  /** Field-style focus ring (same as inputs) for the selected/editing state. */
  readonly selected?: boolean;
  /**
   * Renders the card body as a non-interactive element instead of a
   * click-to-toggle button. Use when the whole card is a drag surface and
   * editing is handled by a dedicated control.
   */
  readonly bodyDisabled?: boolean;
  readonly onToggle: () => void;
  readonly onCheckedChange: (checked: boolean) => void | Promise<void>;
  readonly icon: ReactNode;
  /**
   * Hex tint for the icon thumb — box background plus glyph `color`
   * (inherited via `currentColor`). Default is auto: a stable palette color
   * derived from `iconColorSeed`, then a string `title`, then
   * `toggleAriaLabel` — the Fleek Labs colored-thumb pattern with zero
   * wiring. Pass `null` (or `""`) to opt out and render a plain thumb.
   * Hex only: the tint helper appends a `15` alpha suffix, so CSS vars or
   * `rgb()` values silently produce no tint.
   */
  readonly iconTintColor?: string | null;
  /**
   * Seed for the auto thumb color. Localized labels shift per language, so
   * prefer a stable key/id (settings key, resource id) when you have one.
   */
  readonly iconColorSeed?: string;
  readonly title: ReactNode;
  readonly badges?: ReactNode;
  readonly description?: string;
  readonly titleClassName?: string;
  readonly className?: string;
  /** Optional controls rendered inside the card when the toggle is enabled. */
  readonly settingsContent?: ReactNode;
  /** Optional helper content rendered inside the card below the main row. */
  readonly auxiliaryContent?: ReactNode;
  /** Optional controls rendered to the left of the switch. */
  readonly trailingContent?: ReactNode;
  /**
   * Controls revealed on card hover, floating over copy (no layout shift).
   * Applies a copy mask on hover so titles do not run under the action buttons.
   */
  readonly hoverRevealActions?: ReactNode;
}

export function SettingsFeatureToggleCard(
  props: Readonly<SettingsFeatureToggleCardProps>,
) {
  const {
    enabled,
    disabled = false,
    switchDisabled = false,
    switchHidden = false,
    inactive = false,
    toggleAriaLabel,
    switchAriaLabel,
    pressed,
    selected = false,
    bodyDisabled = false,
    onToggle,
    onCheckedChange,
    icon,
    iconTintColor,
    iconColorSeed,
    title,
    badges,
    description,
    titleClassName,
    className,
    settingsContent,
    auxiliaryContent,
    trailingContent,
    hoverRevealActions,
  } = props;

  const showInactiveIconBorder = inactive || !enabled;
  const showSettingsPanel = enabled && settingsContent !== undefined;
  const hasHoverRevealActions = hoverRevealActions !== undefined;
  const cardClassName = getSettingsFeatureToggleCardClass({
    enabled,
    disabled,
    inactive,
    selected,
    className,
  });
  const iconBoxClassName = getSettingsFeatureIconBoxClass(
    showInactiveIconBorder,
  );
  const copyClassName = getSettingsFeatureCopyClass(
    inactive,
    hasHoverRevealActions,
  );
  const titleClassNameCombined =
    getSettingsFeatureTitleCombinedClass(titleClassName);
  const isSwitchDisabled = disabled || switchDisabled;
  const switchClassName = getSettingsFeatureSwitchClass(isSwitchDisabled);
  const isPressed = pressed ?? enabled;
  const switchLabel = switchAriaLabel ?? toggleAriaLabel;
  const iconBoxStyle = resolveIconBoxStyle({
    iconTintColor,
    iconColorSeed,
    title,
    toggleAriaLabel,
  });

  const isBodyDisabled = bodyDisabled;
  const cardBodyContent = (
    <>
      <div className="shrink-0">
        <div className={iconBoxClassName} style={iconBoxStyle}>
          {icon}
        </div>
      </div>

      <div className={copyClassName}>
        <div className="mb-1 flex items-center gap-2">
          <h5 className={titleClassNameCombined}>{title}</h5>
          {badges ? (
            <div className="flex shrink-0 items-center gap-2">{badges}</div>
          ) : null}
        </div>

        {description ? (
          <p className={SETTINGS_FEATURE_DESCRIPTION_CLASS}>{description}</p>
        ) : null}
      </div>
    </>
  );

  return (
    <div
      className={cardClassName}
      {...(selected ? { "data-field-focus": "" } : {})}>
      <div className={SETTINGS_FEATURE_CARD_ROW_CLASS}>
        {isBodyDisabled ? (
          <div className={SETTINGS_FEATURE_CARD_BODY_STATIC_CLASS}>
            {cardBodyContent}
          </div>
        ) : (
          <button
            type="button"
            disabled={disabled}
            aria-pressed={isPressed}
            data-field-focus
            aria-label={toggleAriaLabel}
            onClick={onToggle}
            className={SETTINGS_FEATURE_CARD_TOGGLE_BUTTON_CLASS}>
            {cardBodyContent}
          </button>
        )}

        <div
          className={cn(
            SETTINGS_FEATURE_CARD_TRAILING_COLUMN_CLASS,
            hasHoverRevealActions && "relative",
          )}
          onPointerDown={(event) => {
            event.stopPropagation();
          }}>
          {hasHoverRevealActions ? (
            <div className={SETTINGS_FEATURE_CARD_HOVER_REVEAL_ACTIONS_CLASS}>
              {hoverRevealActions}
            </div>
          ) : null}
          {trailingContent}
          {switchHidden ? null : (
            <OptimisticSwitch
              checked={enabled}
              onCheckedChange={onCheckedChange}
              disabled={isSwitchDisabled}
              aria-label={switchLabel}
              className={switchClassName}
            />
          )}
        </div>
      </div>

      {showSettingsPanel ? (
        <div className={SETTINGS_FEATURE_CARD_SETTINGS_PANEL_CLASS}>
          {settingsContent}
        </div>
      ) : null}

      {auxiliaryContent ? (
        <div
          className="mt-2"
          onPointerDown={(event) => {
            event.stopPropagation();
          }}>
          {auxiliaryContent}
        </div>
      ) : null}
    </div>
  );
}
