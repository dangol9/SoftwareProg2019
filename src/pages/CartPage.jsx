import React from "react";
import PropTypes from "prop-types";
import {getItems} from "../actions/ItemsActions";
import {FaRegTrashAlt, FaAngleRight} from "react-icons/fa";
import "../components/cart.css";


class CartPage extends React.PureComponent {
  state = {
  rows: []
};

componentDidMount() {
  getItems()
  .then(items => {
    this.setState({
      rows: items.slice(0,4)
    });
  })
  .catch(err=>{
    console.log(err);
  });

}


render(){
  return (
    <div className={"spacer"}>
    <h1>My Cart</h1>
      <div className={"box cart"}>
        <Table
          rows={this.state.rows}
        />
    </div>
    <div className={"box cart-summary"}>
      <table>
        <tbody>
        <div className={"table-box"}>
        <tr><td>Summa:</td><td>200</td></tr>
        <tr><td>Maksud:</td><td>200</td></tr>
        <tr><td>Kokku:</td><td>200</td></tr>
        </div>
        </tbody>
    </table>
    <tr>
    </tr>
    <tr>
      <div className={"submit-button"}>Vormista ost<FaAngleRight/></div>
    </tr>
  </div>
</div>
    );
  }
}

const Table = ({rows}) => {
  return (
    <div className={"table"}>
      <div className={"row"}>
        <div className={"cell"}>Toode</div>
        <div className={"cell cell--grow"}>Nimetus</div>
        <div className={"cell cell-left"}>Kategooria</div>
        <div className={"cell cell-right"}>Summa</div>
        <div className={"cell cell--small"}></div>
      </div>
        {rows.map ( (row) => <Row key={row._id} {...row} />)}
    </div>
  );
};

Table.propTypes ={
  rows: PropTypes.array.isRequired,
};

const Row = ({title, imgSrc, category, price}) => {
  return(
    <div className = {"row"}>
      <div className = {"cell"}>
      <img src={imgSrc} />
    </div>
    <div className = {"cell cell--grow"}>
      {title}
    </div>
    <div className = {"cell"}>
      {category}
    </div>
    <div className = {"cell cell--right"}>
      {price}
    </div>
    <div className = {"cell cell--small cell--center"}>
      <FaRegTrashAlt/>
    </div>
  </div>
  );
};

export const ItemProps = {
  _id: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};



Row.propTypes = ItemProps;

export default CartPage;
