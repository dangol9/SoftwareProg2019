import React from "react";
import {Link} from "react-router-dom";
import {userIcon, cartIcon} from "../icons.js";
import "./header.css";
import PropTypes from "prop-types";


const Header = ({token, user}) => {
  console.log(token);
  return (
    <div className="my-header">
    <Link to={"/"}>
    <img className="header-logo" src="/images/logo.jpeg"/>
    </Link>

      <div className={"header-buttons"}>

      {user.email && <WelcomeIcon user = {user}/>}

      {!user.email && <LoginRegisterIcon />}

    <div className={"header-button"}>
    <img src={cartIcon} style={{height: 35}} />
    <div className={"header-button-text"}>Cart</div>
  </div>
  </div>
  </div>
  );
};

Header.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object,
};

const LoginRegisterIcon = () => (
  <Link className={"header-button"} to={"/login"}>
  <img src={userIcon} style={{height: 35}} />
  <div className={"header-button-text"}>Login/<br/>Register</div>
</Link>
);

const WelcomeIcon = ({user}) => (
  <Link className={"header-button"} to={`/users/${user._id}`}>
  <img src={userIcon} style={{height: 35}} />
  <div className={"header-button-text"}>Welcome, {user.email}</div>
</Link>
);

WelcomeIcon.propTypes = {
  user: PropTypes.object.isRequired,
};


export default Header;
