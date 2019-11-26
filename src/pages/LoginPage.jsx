import React from "react";
import "./login.css";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {userUpdate, tokenUpdate} from "../store/actions";
import {toast} from "react-toastify";
import * as services from "../services.js";

class LoginPage extends React.PureComponent {
static propTypes = {
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};



constructor(props){
  super(props);
  this.state = {
    email:"",
    password:""
  };
}

handleSubmit = (event) => {
  event.preventDefault();
  services.login(this.state)
  .then(this.handleSuccess)
  .catch(err =>{
    console.log("Error", err);
    toast.error("Logimine ebaynnestus");
  });
};

handleSuccess = ({token, user}) => {
  this.props.dispatch(userUpdate(user));
  this.props.dispatch(tokenUpdate(token));
  this.props.history.push(`/users/${user._id}`);

};

handleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value,
  });
};


  render(){
    return (
      <div>
      <div className="login-wrap">
          <h2>Login</h2>
              <form className="form" onSubmit={this.handleSubmit}>
                <input type="email" placeholder="email" name="email" value = {this.state.email} onChange={this.handleChange}/>
                  <input type="password" placeholder="password" name="password" value = {this.state.password} onChange={this.handleChange}/>
                  <button> Sign in </button>
                  <Link to="/signup"> <h3> Dont have an account? Register </h3></Link>
                  </form>
                  </div>
        </div>

    );
  }
}
export default connect()(LoginPage);
