import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header.jsx";
import Pages from "../pages/index.jsx";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../store/actions";

class Router extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount(){
    this.props.dispatch(actions.refreshUser());
  }
  render(){
    return (
      <BrowserRouter>
        <Route path={"/"} component={Header}/>
        <Switch>
          <Route path="/" exact component={Pages.HomePage} />
          <Route path="/login" exact component = {Pages.LoginPage} />
          <Route path="/signup" exact component={Pages.SignUpPage} />
          <Route path="/users/:userId" exact component={Pages.UserPage} />
          <Route path="/items/:itemId" exact component={Pages.ItemPage} />
          <Route path="/checkout/cart" exact component={Pages.CartPage} />
          <Route component = {Pages.NotFound} />
        </Switch>
    </BrowserRouter>
    );
  }
}



export default connect()(Router);
