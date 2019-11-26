import React from "react";
import "./login.css";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import * as services from "../services.js";

class SignUpPage extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }
  constructor(props){
    super(props);
    this.state = {
      email:"",
      password:"",
    };
  }

handleSubmit = (event) => {
    event.preventDefault();
    services.signup(this.state)
    .then( () => {
      this.props.history.push("/login");
      toast.success( "Registreerimine edukas!");
    })
    .catch(err =>{
      toast.error("Registreerimise ebaynnestus");
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
          <h2>Register</h2>
              <form className="form" onSubmit={this.handleSubmit}>
                  <input type="email" placeholder="email" name={"email"} onChange={this.handleChange} />
                  <input type="password" placeholder="password" name={"password"} onChange={this.handleChange}/>
                  <button> Register </button>
                  <Link to="/login"> <h3> Already have an account?</h3></Link>
                  </form>
                  </div>
      </div>

    );
  }
}
export default SignUpPage;
