import React from "react";
import PropTypes from "prop-types";
import "./itempage.css";
import FancyButton from"../components/FancyButton.jsx";
import {connect} from "react-redux";
import { addItem } from "../store/actions";
import {toast} from "react-toastify";
import * as services from "../services.js";

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
  services.getItem({itemId: this.props.match.params.itemId})
  .then(item => {
    this.setState({
      ...item
    });
  })
  .catch(err => {
    console.log("item page error: ", err);
  });
}

handleBuy = () => {
  this.props.dispatch(addItem(this.state));
  toast.success("Toode lisatud");
}


  render(){
    return (
      <>
    <div className={"box spacer itemPage"}>
        <div>
            <div className={"itemPage-left"}>
                <img src={this.state.imgSrc} />
            </div>
            <div className={"item-name"}>
                <div>
                    <h2>{this.state.title}</h2>
                </div>
                </div>
                    <div className={"item-price"}>
                            {this.state.price} €
                    <div>
                        <p style={{textAlign: "justify"}}>
                        Toote info
                        </p>
                    </div>
                </div>
            </div>

        <div className={"itemPage-footer"}>
            <FancyButton onClick={this.handleBuy}>Osta</FancyButton>
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
