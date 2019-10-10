import React from "react";
import "./login.css";

class LoginPage extends React.PureComponent {

constructor(props){
  super(props);
  this.state = {
    email:"",
    password:""
  };
}

handleSubmit = (event) => {
  event.preventDefault();
  console.log("submit", this.state);
  fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(this.state),
  })
  .then(res=>{
    console.log("response", res);
  })
  .catch(err =>{
    console.log("Error", err);
  });
};

handleChange = (e) => {
//  console.log("handle changed", e.target.name, e.target.value);
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
                <input type="text" placeholder="email" name="email" value = {this.state.email} onChange={this.handleChange}/>
                  <input type="password" placeholder="password" name="password" value = {this.state.password} onChange={this.handleChange}/>
                  <button> Sign in </button>
                  <a href="/signup"> <h3> Dont have an account? Register </h3></a>
                  </form>
                  </div>
        </div>

    );
  }
}
export default LoginPage;
