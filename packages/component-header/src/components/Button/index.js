// @ts-check
import React from "react";

import { ButtonPropTypes } from "../../core/models/app-prop-types";
import { ButtonWrapper } from "./index.styles";

/**
 * @typedef {import('../../core/models/types').Button} ButtonProps
 */

/**
 * @param {ButtonProps} props
 * @returns {JSX.Element}
 */

const Button = ({ href, color, text, onClick }) => {
  return (
    <ButtonWrapper href={href} className={`button-${color}`} onClick={onClick}>
      {text}
    </ButtonWrapper>
  );
};

Button.propTypes = { ...ButtonPropTypes };

export { Button };