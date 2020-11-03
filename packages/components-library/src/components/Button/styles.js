/** @jsx h */
/** @jsxFrag Fragment */
/* eslint-disable react/prop-types */
import { h } from "preact";
import { cx, css } from "emotion";
import PropTypes from "prop-types";
import {
  ComponentButtonHoverStateTransform,
  ComponentButtonActiveStateTransform,
  ComponentButtonDisabledOpacity,
  ComponentButtonSmallFontSize,
  ComponentButtonSmallHeight,
  ComponentButtonSmallMinWidth,
  ComponentButtonPaddingYSmall,
  ComponentButtonPaddingXSmall,
  ComponentButtonLargeFontSize,
  ComponentButtonLargeHeight,
  ComponentButtonLargeMinWidth,
  ComponentButtonGoldColor,
  ComponentButtonGoldBackgroundColor,
  ComponentButtonDarkColor,
  ComponentButtonDarkBackgroundColor,
  ComponentButtonLightColor,
  ComponentButtonLightBackgroundColor,
  ComponentButtonMediumFontSize,
  ComponentButtonMediumHeight,
  ComponentButtonMediumMinWidth,
  ComponentButtonPaddingYMedium,
  ComponentButtonPaddingXMedium,
  ComponentButtonMaroonColor,
  ComponentButtonMaroonBackgroundColor,
} from "../../theme";
import { forwardRef } from "preact/compat";

const Button = forwardRef(
  (
    { disabled, small, medium, large, gold, maroon, dark, type, ...props },
    ref
  ) => {
    const Element = type == "link" ? "a" : "button";


    console.log(gold,  'GOLD');
    console.log(maroon, 'maroon');
    console.log(props, 'the props');

    let light = props.light ? props.light : false;

    if (gold === undefined && dark === undefined && maroon === undefined) {
      light = true;
    }


    return (
      <Element
        {...props}
        class={cx(
          css`
            text-decoration: none;
            font-weight: bold;
            display: inline-block;
            color: #191919;
            text-align: center;
            text-decoration: none;
            vertical-align: middle;
            user-select: none;
            background-color: transparent;
            border: 1px solid transparent;
            padding: 1rem 2rem;
            font-size: 1rem;
            line-height: 1rem;
            border-radius: 400rem;
            transition: 0.03s ease-in-out;

            :not(:disabled):not(.disabled) {
              cursor: pointer;
            }

            :hover {
              transform: ${ComponentButtonHoverStateTransform};
            }

            :active {
              transform: ${ComponentButtonActiveStateTransform};
            }

            ${disabled &&
            css`
              opacity: ${ComponentButtonDisabledOpacity};
            `}

            ${small &&
            css`
              font-size: ${ComponentButtonSmallFontSize};
              height: ${ComponentButtonSmallHeight};
              min-width: ${ComponentButtonSmallMinWidth};
              padding: ${ComponentButtonPaddingYSmall}
                ${ComponentButtonPaddingXSmall};
            `}

        ${medium &&
            css`
              font-size: 0.875rem;
              padding: 0.5rem 1rem;
            `}

        ${large &&
            css`
              font-size: ${ComponentButtonLargeFontSize};
              height: ${ComponentButtonLargeHeight};
              min-width: ${ComponentButtonLargeMinWidth};
            `}

        ${gold &&
            css`
              color: ${ComponentButtonGoldColor};
              background-color: ${ComponentButtonGoldBackgroundColor};

              :hover {
                color: ${ComponentButtonGoldColor};
              }
            `}

        ${maroon &&
            css`
              color: #ffffff;
              background-color: #8c1d40;
              border-color: #8c1d40;

              :visited:not(.btn) {
                color: #ffffff;
              }
            `}

        ${dark &&
            css`
              color: ${ComponentButtonDarkColor};
              background-color: ${ComponentButtonDarkBackgroundColor};

              :visited:not(.btn) {
                color: ${ComponentButtonDarkColor};
              }
            `}

        ${light &&
            css`
              color: ${ComponentButtonLightColor};
              background-color: ${ComponentButtonLightBackgroundColor};
            `}
          `,
          props.class
        )}
        ref={ref}
      >
        {props.children}
      </Element>
    );
  }
);

Button.propTypes = {
  type: PropTypes.string,
  href: PropTypes.string,
  dark: PropTypes.bool,
  light: PropTypes.bool,
  gold: PropTypes.bool,
  maroon: PropTypes.bool,
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  onFocus: PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
};

/**
 * Static class-based CSS for buttons, used in Header component.
 */
const buttonStyles = css`
  .btn {
    text-decoration: none;
    font-weight: bold;
    display: inline-block;
    color: #191919;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 1rem 2rem;
    font-size: 1rem;
    line-height: 1rem;
    border-radius: 400rem;
    transition: 0.03s ease-in-out;

    :not(:disabled):not(.disabled) {
      cursor: pointer;
    }

    :hover {
      transform: ${ComponentButtonHoverStateTransform};
    }

    :active {
      transform: ${ComponentButtonActiveStateTransform};
    }

    &.btn-disabled {
      opacity: ${ComponentButtonDisabledOpacity};
    }

    &.btn-small {
      font-size: ${ComponentButtonSmallFontSize};
      height: ${ComponentButtonSmallHeight};
      min-width: ${ComponentButtonSmallMinWidth};
      padding: ${ComponentButtonPaddingYSmall} ${ComponentButtonPaddingXSmall};
    }

    &.btn-medium {
      font-size: ${ComponentButtonMediumFontSize};
      height: ${ComponentButtonMediumHeight};
      min-width: ${ComponentButtonMediumMinWidth};
      padding: ${ComponentButtonPaddingYMedium} ${ComponentButtonPaddingXMedium};
    }

    &.btn-large {
      font-size: ${ComponentButtonLargeFontSize};
      height: ${ComponentButtonLargeHeight};
      min-width: ${ComponentButtonLargeMinWidth};
    }

    &.btn-gold {
      color: ${ComponentButtonGoldColor};
      background-color: ${ComponentButtonGoldBackgroundColor};
    }

    &.btn-maroon {
      color: ${ComponentButtonMaroonColor};
      background-color: ${ComponentButtonMaroonBackgroundColor};
    }

    &.btn-dark {
      color: ${ComponentButtonDarkColor};
      background-color: ${ComponentButtonDarkBackgroundColor};
    }

    &.btn-light {
      color: ${ComponentButtonLightColor};
      background-color: ${ComponentButtonLightBackgroundColor};
    }
  }
`;

export { Button, buttonStyles };
