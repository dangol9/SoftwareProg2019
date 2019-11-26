import React from "react";
import {Link} from "react-router-dom";
import {userIcon, cartIcon} from "../icons.js";
import "./header.css";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ItemProps} from "../pages/CartPage.jsx";
import {UserPropTypes} from "../store/reducer";
import * as selectors from "../store/selectors";

const Header = ({user, cart}) => {
  console.log("header", cart);
  return (

        <div className="my-header">
        <Link to={"/"}>
        <img className="header-logo" src="/static/images/logo.jpeg"/>
        </Link>

          <div className={"header-buttons"}>

          {user && <WelcomeIcon user = {user}/>}

          {!user && <LoginRegisterIcon />}

        <Link to={"/checkout/cart"} className={"header-button"}>
        <img src={cartIcon} style={{height: 35}} />
        <div className={"header-button-text"}>Cart</div>
        <Badge>{cart.length}</Badge>
            </Link>
          </div>
        </div>
  );
};

 Header.propTypes = {
  token: PropTypes.string,
  user: PropTypes.shape(UserPropTypes),
  cart: PropTypes.arrayOf(ItemProps).isRequired,
};

const Badge = ({children}) => {
  if(children === 0) return null ;
  return (
    <span className = {"badge"}>
    {children}
    </span>
  );
};


Badge.propTypes = {
  children: PropTypes.number.isRequired,
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
  user: PropTypes.shape(UserPropTypes),
};

const mapStateToProps = (store) => {
  return {
    cart: selectors.getCart(store),
    user: selectors.getUser(store),
  };
};


export default connect(mapStateToProps)(Header);
