import React from "react";
import "./login.css";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
class LoginPage extends React.PureComponent {

static propTypes = {
  history: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired,
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
  //console.log("submit", this.state);
  fetch("/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.state),
  })
  .then(res => res.json())
  .then(({token, user})=>{
    //console.log("response", token, user);
    this.props.onLogin({token, user});
    this.props.history.push(`/users/${user._id}`);
  })
  .catch(err =>{
    console.log("Error", err);
  });
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
export default LoginPage;
