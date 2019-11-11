import React from "react";
import { FaAngleRight } from "react-icons/fa";
import PropTypes from "prop-types";
import "./fancybutton.css";


const FancyButton = ({children, onClick}) => (
    <div className={"btn btn--fancy"} onClick={onClick}>{children}<FaAngleRight/></div>
);


FancyButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default FancyButton;
