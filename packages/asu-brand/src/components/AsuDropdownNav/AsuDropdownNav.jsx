import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./AsuDropdownNav.css";
import classNames from "classnames";

const TopItem = props => {

  // if the item doesn't have an href property, render as a toggle
  let topItem = (
    <span onClick={!props.href ? props.toggle : undefined}>{props.text}</span>
  );

  // Wrap in a link if href provided for top level item
  if (props.href) {
    topItem = (
      <a className={styles.asuNavA} href={props.href} target={props.target} >
        {topItem}
      </a>
    );
  }

  // Add the arrow toggle icon
  return (
    <React.Fragment>
      {topItem}
      <span
        className={props.open ? styles.icoSortUp : styles.icoSortDown}
        onClick={props.toggle}
      ></span>
    </React.Fragment>
  );
};

/** TODO: test */
const AsuDropdownNav = props => {
  const navClass = styles.asuNavItemTop;
  const [open, setOpen] = useState(false);
  const toggle = React.useCallback(() => setOpen(oldOpen => !oldOpen), []);

  const navOpen = React.useCallback(() => {
    setOpen(true);
  }, [open]);

  const navClose = React.useCallback(() => {
    setOpen(false);
  }, [open]);

  const subStyles = classNames(
    styles.subMenu,
    open ? styles.subSlideIn : styles.subSlideOut
  );

  let linkRefs = [];

  if (props.items) {
    for (let i = 0; i < props.items.length; i++) {
      let newRef = React.createRef();
      linkRefs.push(newRef);
    }
  }

  return (

      <div
        title={props.title ? props.title : props.text}
        role="navigation"
        className={navClass}
        onMouseEnter={navOpen}
        onMouseLeave={navClose}
        onFocus={navOpen}
        onBlur={navClose}
      >
        <TopItem {...props} toggle={toggle} open={open} focus={navOpen}/>

        <ul className={subStyles}>
          {props.items.map((item, index) => {
            return (
              <li className={styles.asuNavItem} key={index}>
                <a
                  title={item.title}
                  href={item.href}
                  ref={linkRefs[index]}
                  tabIndex="0"
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
  );
};

AsuDropdownNav.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  href: PropTypes.string,
  target: PropTypes.string
};

AsuDropdownNav.defaultProps = {};

TopItem.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  href: PropTypes.string,
  target: PropTypes.string,
  toggle: PropTypes.func.isRequired,
  focus: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

TopItem.defaultProps = {};

export default AsuDropdownNav;
