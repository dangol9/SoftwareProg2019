import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {UserPropTypes} from "../store/reducer";
import FancyButton from "../components/FancyButton.jsx";
import {userUpdate, tokenUpdate} from "../store/actions";
import protectedRedirect from "../components/protectedRedirect.jsx";
import * as selectors from "../store/selectors";

class UserPage extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape(UserPropTypes),
    dispatch: PropTypes.func.isRequired,
  };

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

      </div>


    );
  }
}
const mapStateToProps = (store) => {
  return {
    user: selectors.getUser(store),
  };
};

export default connect(mapStateToProps)(protectedRedirect(UserPage));
