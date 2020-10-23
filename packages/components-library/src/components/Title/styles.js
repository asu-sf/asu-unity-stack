/** @jsx h */
/** @jsxFrag Fragment */
/* eslint-disable react/prop-types */
import { h } from "preact";
import { forwardRef } from "preact/compat";
import { cx, css } from "emotion";
import {
  containerSize,
  primaryNavTopPadding,
  BreakpointXl,
  BreakpointLg,
  srOnly,
} from "../../theme";

/**
 * Title
 **/
const titleStyles = breakpoint => css`
  .title {
    line-height: 1;
    font-size: 1rem;
    font-weight: 700;
    margin: 0 2rem 1.5rem 2rem;
    letter-spacing: -1px;
    background-image: linear-gradient(to right,transparent 51%,#FFC626 51%,95%,transparent);
    background-position: 0 0;
    background-size: 200%;
    display: inline-block;
    /*padding-right: 4px;*/
    transition: 0.5s cubic-bezier(0.19, 1, 0.19, 1);
    transition-duration: 1s;

    &.active {
      background-position: -200%;
    }

    > .unit-name {
      display: none;
    }

    .unit-name,
    .subunit-name,
    &.subunit-name {
      color: #191919;
    }

    @media (min-width: ${breakpoint}) {
      line-height: 1;
      font-weight: 700;
      padding: 0;
      margin: 1rem 0 0.5rem 0;

      > .unit-name {
        font-size: 1rem;
        margin-bottom: 0.5rem;
        display: block;
      }

      &.subunit-name {
        font-size: 2rem;
        margin: 1.5rem 0 1rem 0;
        font-weight: 700;
      }

      .subunit-name {
        font-size: 1.5rem;
        margin-bottom: 0;
      }
    }
  }

  &.scrolled .title {
    padding-bottom: 1rem;
  }

  @media (min-width: ${breakpoint}) {
    &.scrolled .title.subunit-name {
      font-size: 1.5rem;
    }

    &.scrolled .title {
      padding-bottom: 0;
    }
  }
`;

const Title = forwardRef(
  ({ children, parentOrg, baseUrl, parentOrgUrl, ...props }, ref) => {
    if (parentOrg) {
      return (
        <div class={cx("title", props.class)} ref={ref}>
          <a class="unit-name" href={parentOrgUrl}>
            {parentOrg}
          </a>
          <a class="subunit-name" href={baseUrl}>
            {children}
          </a>
        </div>
      );
    }
    return (
      <a
        class={cx("title", "subunit-name", props.class)}
        href={baseUrl}
        ref={ref}
      >
        {children}
      </a>
    );
  }
);

const TitleStyled = props => {
  const breakpoint = props.breakpoint ? props.breakpoint : BreakpointLg;

  return (
    <div
      class={css`
        ${titleStyles(breakpoint)}
        display: flex;
        flex-direction: column;

        button {
          max-width: 200px;
        }
      `}
    >
      {props.children}
    </div>
  );
};

export { titleStyles, Title, TitleStyled, BreakpointLg };
