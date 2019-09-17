import React from "react";
import {phones, tvs} from "./mydatabase";
import Header from "./Header.jsx";
import ItemList from "./ItemList.jsx";

class HomePage extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      items: phones,
    };
  }

  handleChange = (event) => {
    switch (event.target.value) {
      case "phones":{
        this.setState({
          items: phones,
        });
        break;
      }
      case "tvs":{
       this.setState({
        items: tvs,
        });
        break;
      }
    }
  };

  render(){
    return (
      <>
        <Header/>
        <select onChange={this.handleChange}>
        <option value="phones">Phones</option>
        <option value="tvs">TVs</option>
        </select>
        <ItemList items = {this.state.items} />
      </>
    )
  }
}
export default HomePage;
