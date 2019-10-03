import React from "react";
import Header from "./Header.jsx";
import PropTypes from "prop-types";


class ItemPage extends React.PureComponent{

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.fetchItem();
  }

fetchItem = () => {
  fetch (`/api/items/${this.props.match.params.itemId}`)
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

  render(){
    return (
      <>
        <Header/>
        <div className={"itemContainer"}>
        <img src={this.state.imgSrc} />
        <div className = {"item-name"}>{this.state.title}</div>
        <div className = {"item-price"}>{this.state.price}</div>

        </div>
      </>
    );
  }


}

ItemPage.propTypes = {
  match: PropTypes.object.isRequired,
};



export default ItemPage;
