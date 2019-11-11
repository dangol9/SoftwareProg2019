import React from "react";
import PropTypes from "prop-types";
import "./itempage.css";
import FancyButton from"../components/FancyButton.jsx";
import {connect} from "react-redux";
import { addItem } from "../store/store.js";

class ItemPage extends React.PureComponent{

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };


  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.fetchItem();
  }

fetchItem = () => {
  fetch (`/api/v1/items/${this.props.match.params.itemId}`)
  .then(res => {
    return res.json();
    })
  .then(item => {
    console.log(item);
    this.setState({
      ...item
    });
  })
  .catch(err => {
    console.log(err);
  });
}

handleBuy = () => {
  console.log("handlebuy");
  this.props.dispatch(addItem(this.state));
}


  render(){
    return (
      <>
        <div className={"itemContainer"}>
        <img src={this.state.imgSrc} />
        <div className = {"item-name"}>{this.state.title}</div>
        <div className = {"item-price"}>Price: {this.state.price} eurot</div>
        <div className={"itemPage-footer"}>
        <FancyButton onClick={this.handleBuy}>Buy</FancyButton>
        </div>
        </div>

      </>
    );
  }


}

ItemPage.propTypes = {
  match: PropTypes.object.isRequired
};



export default connect()(ItemPage);
