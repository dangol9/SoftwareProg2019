import React from "react";
import "./login.css";

class SignUpPage extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      email:"",
      password:"",
      confirmPassword:""
    };
  }

handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit", this.state);
    fetch("/api/users/signup", {
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
    //console.log("handle changed", e.target.name, e.target.value);
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
                  <input type="text" placeholder="email" name={"email"} onChange={this.handleChange} />
                  <input type="password" placeholder="password" name={"password"} onChange={this.handleChange}/>
                  <input type="password" placeholder="password" name={"confirmPassword"} onChange={this.handleChange}/>
                  <button> Register </button>
                  <a href="/login"> <h3> Already have an account?</h3></a>
                  </form>
                  </div>
      </div>

    );
  }
}
export default SignUpPage;
