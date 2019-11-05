import React from "react";
import {Link} from "react-router-dom";
import {userIcon, cartIcon} from "../icons.js";
import "./header.css";
import PropTypes from "prop-types";
import authConsumer from "./authConsumer.jsx";

const Header = ({user}) => {
  return (

        <div className="my-header">
        <Link to={"/"}>
        <img className="header-logo" src="/static/images/logo.jpeg"/>
        </Link>

          <div className={"header-buttons"}>

          {user.email && <WelcomeIcon user = {user}/>}

          {!user.email && <LoginRegisterIcon />}

        <Link to={"/checkout/cart"} className={"header-button"}>
        <img src={cartIcon} style={{height: 35}} />
        <div className={"header-button-text"}>Cart</div>
            </Link>
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


export default authConsumer(Header);
