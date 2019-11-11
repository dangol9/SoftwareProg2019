import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header.jsx";
import Pages from "./pages/index.jsx";
import "./pages/main.css";
import store from "./store/store.js";
import { Provider } from "react-redux";


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
      <Provider store = {store}>
      <AuthContext.Provider value={this.state}>
      <BrowserRouter>
      <Route path={"/"} component={Header}/>
      <Switch>
      <Route path="/" exact component={Pages.HomePage} />
      <Route
      path="/login"
      exact
      render={(props) => <Pages.LoginPage {...props} onLogin = {this.handleLogin} />}
      />
      <Route path="/signup" exact component={Pages.SignUpPage} />
      <Route path="/users/:userId" exact component={Pages.UserPage} />
      <Route path="/items/:itemId" exact component={Pages.ItemPage} />
      <Route path="/checkout/cart" exact component={Pages.CartPage} />
      <Route component = {Pages.NotFound} />
      </Switch>
      </BrowserRouter>
      </AuthContext.Provider>
      </Provider>
    );
  }
}

export default App;
