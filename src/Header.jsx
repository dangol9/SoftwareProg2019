import React from "react";
import {Link} from "react-router-dom";
import {userIcon, cartIcon} from "./icons.js";
import "./header.css";
const Header = () => {
  return (
    <div className="my-header">
    <Link to={"/"}>
    <img className="header-logo" src="/images/logo.jpeg"/>
    </Link>
      <div className={"header-buttons"}>
        <div className={"header-button"}>
        <img src={userIcon} style={{height: 35}} />
        <div className={"header-button-text"}>Login/<br/>Register</div>
    </div>
    <div className={"header-button"}>
    <img src={cartIcon} style={{height: 35}} />
    <div className={"header-button-text"}>Cart</div>
  </div>
  </div>
  </div>
  );
};

export default Header;
