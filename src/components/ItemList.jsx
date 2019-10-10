import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./itemlist.css";

const ItemList = (props) => {
  console.log("items list", props);
  return (
    <div className ={"content"}>
      {
        props.items.map( item => {
          return <Item
          key = {item._id}
          id = {item._id}
          imgSrc={item.imgSrc}
          price={item.price}
          title={item.title}
      />;
    })
      }
    </div>
  );
};

ItemList.propTypes = {
  items: PropTypes.array.isRequired
};

const Item = (props) => {


  return (
    <Link to={`/items/${props.id}`}>
      <div className = {"item"}>
      <img src={props.imgSrc}/>
      <div className="item-name">{props.title}</div>
      <div className="item-price">{props.price}</div>
      </div>
    </Link>


  );

};
Item.propTypes = {
  id: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};


export default ItemList;
