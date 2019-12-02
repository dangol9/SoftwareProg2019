import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {UserPropTypes} from "../store/reducer";
import FancyButton from "../components/FancyButton.jsx";
import {userUpdate, tokenUpdate} from "../store/actions";
import protectedRedirect from "../components/protectedRedirect.jsx";
import * as selectors from "../store/selectors";
import * as services from "../services";

class UserPage extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape(UserPropTypes),
    dispatch: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  };


state = {
  payments: [],
}

  componentDidMount(){
    const {userId, token} = this.props;
    services.getPayments({userId, token})
    .then( docs =>{
      this.setState( {
        payments: docs,
      });
    });
  }

handleLogout = () => {
  this.props.dispatch(userUpdate(null));
  this.props.dispatch(tokenUpdate(null));
};


  render(){
    return (

        <div className = "aroundInfo">
        <div style = {{display:"flex", justifyContent: "space-around"}}>
        <div className = "field">
          {this.props.user.email}
        </div>
        <div className = "field">
       {this.props.user.createdAt}
       </div>
         <FancyButton onClick={this.handleLogout}>Log out</FancyButton>
        </div>
        <div className = "box">
          {this.state.payments.map(payment =>{
            return (<div key={payment._id} className = {"payment-row"}>
              <div>{payment.createdAt}</div>
              <div>{payment.cart.length}</div>
              <div>{payment.amount}</div>
            </div>);
          } )}
        </div>
      </div>


    );
  }
}
const mapStateToProps = (store) => {
  return {
    user: selectors.getUser(store),
    token: selectors.getToken(store),
    userId: selectors.getUserId(store),
  };
};

export default connect(mapStateToProps)(protectedRedirect(UserPage));
