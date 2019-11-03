import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ItemPage from "./pages/ItemPage.jsx";
import Header from "./components/Header.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import CartPage from "./pages/CartPage.jsx";
import store from "./store.js";
import "./pages/main.css";

const root = document.getElementById("app");

console.log(store);

const authDefaultValue = {
  token: null,
  user: {
    email: null,
    _id: null,
    createdAt: null,
    },
};
export const AuthContext = React.createContext(authDefaultValue);

class App extends React.Component{
  state = authDefaultValue;



handleLogin = ({token, user}) => {
  this.setState({
    user, token
  });
};


render(){
    return(
      <AuthContext.Provider value={this.state}>
      <BrowserRouter>
      <Route path={"/"} component={Header}/>
      <Switch>
      <Route path="/" exact component={HomePage} />
      <Route
      path="/login"
      exact
      render={(props) => <LoginPage {...props} onLogin = {this.handleLogin} />}
      />
      <Route path="/signup" exact component={SignUpPage} />
      <Route path="/users/:userId" exact component={UserPage} />
      <Route path="/items/:itemId" exact component={ItemPage} />
      <Route path="/checkout/cart" exact component={CartPage} />
      <Route component = {NotFound} />
      </Switch>
      </BrowserRouter>
      </AuthContext.Provider>
    );
  }
}

ReactDOM.render(<App />, root);
