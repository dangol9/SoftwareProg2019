import React from "react";
import Header from "./Header.jsx";
import {phones} from "./mydatabase";

class ItemPage extends React.PureComponent{
  render(){
    const item = phones[0];
    return (
      <>
        <Header/>
        <div className={"itemContainer"}>
        <img src={item.imgSrc} />
        <div className = {'item-name'}>{item.title}</div>
        <div className = {'item-price'}>{item.price}</div>
        
        </div>
      </>
    )
  }
}
export default ItemPage;
