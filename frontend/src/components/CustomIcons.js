import React from "react";
import PropTypes from "prop-types";

import IconHamburger from "../assets/icons/hamburger.png";

const CustomIcon = ({ name, active, ...other }) => {
  var Icon = null;

  switch (name) {
    case "hamburger":
      Icon = IconHamburger;
      break;
    default:
      return <div {...other} />;
  }

  return <img src={Icon} {...other} />;
};

CustomIcon.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool
};

export default CustomIcon;
