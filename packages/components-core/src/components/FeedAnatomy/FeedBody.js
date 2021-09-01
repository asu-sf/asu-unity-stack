// @ts-check
import PropTypes from "prop-types";
import React from "react";

/**
 *
 * @param {{
 *  children: JSX.Element
 * }} props
 * @returns
 */
const FeedBody = ({ children }) => (
  <div className="row">
    <div className="col">{children}</div>
  </div>
);

FeedBody.propTypes = {
  children: PropTypes.element,
};

export { FeedBody };
