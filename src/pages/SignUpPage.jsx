import React from "react";
import "./login.css";
import PropTypes from "prop-types";
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
    console.log("submit", this.state);
    fetch("/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state),
    })
    .then(res => res.json())
    .then( data => {
      console.log("data", data);
      this.props.history.push("/login");
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
          <h2>Register</h2>
              <form className="form" onSubmit={this.handleSubmit}>
                  <input type="email" placeholder="email" name={"email"} onChange={this.handleChange} />
                  <input type="password" placeholder="password" name={"password"} onChange={this.handleChange}/>
                  <button> Register </button>
                  <a href="/login"> <h3> Already have an account?</h3></a>
                  </form>
                  </div>
      </div>

    );
  }
}
export default SignUpPage;
