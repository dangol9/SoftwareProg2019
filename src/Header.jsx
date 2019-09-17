import React from "react";
import {Link} from "react-router-dom";
const Header = () => {
  return (
    <div className="my-header">
    <Link to={"/"}>
    <img className="header-logo" src="./images/logo.jpeg"/>
    </Link>
      <div className="header-buttons">
        <button>Login/Singup</button>
        <button>My Cart</button>
    </div>
  </div>
  )
};

export default Header;
