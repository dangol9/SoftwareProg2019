import React from "react";
import ItemList from "../components/ItemList.jsx";
import Checkbox from "../components/Checkbox.jsx";
import PropTypes from "prop-types";
import "./homepage.css";
import SortDropdown from "../components/SortDropdown.jsx";
import {connect} from "react-redux";
import {getItems} from "../store/actions";
import {ItemProps} from "./CartPage.jsx";


class HomePage extends React.PureComponent{
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(ItemProps)).isRequired,
  };


  constructor(props){
    super(props);
    this.state = {
      sortDirection: -1,
      allCategories: ["phones", "tvs"],
      selectedCategories: ["phones"],
    };
  }

componentDidMount(){
  this.props.dispatch(getItems());
}


  handleCategoriesSelect = (event) => {
    const categoryName = event.target.name;
     if(this.isSelected(categoryName)) {
       return this.unselectCategory(categoryName);
     }
     this.selectCategory(categoryName);
  };

  selectCategory = (categoryName) => {
    this.setState({
      selectedCategories: this.state.selectedCategories.concat([categoryName])
    });
  };


  unselectCategory = (categoryName) => {
    const newArr = this.state.selectedCategories.filter( cn => cn !== categoryName);
    this.setState({
      selectedCategories: newArr
    });
  };

  getVisibleItems = () => {
    return this.props.items
    .filter(item => this.isSelected(item.category))
    .sort((a, b) => {
      switch(this.state.sortDirection){
        case -1: return b.price - a.price;
        case 1: return a.price - b.price;
      }
    });
  };


  isSelected = (name) => this.state.selectedCategories.indexOf(name) >= 0;


  handleSortDropdown = (event) => {
    this.setState({
      sortDirection: parseInt(event.target.value),
    });
  };


  render(){
    const items = this.getVisibleItems();
    return (
      <>

        <ItemFilters
        allCategories = {this.state.allCategories}
        handleDropdown = {this.handleCategoriesSelect}
        isSelected = {this.isSelected}
        />
        <div className={"items-settings"}>
        <div className={"items-found"}>
        Items found: {items.length} {this.state.selectedCategories.join(", ")}
        </div>
        <SortDropdown
        direction = {this.state.sortDirection}
        onChange = {this.handleSortDropdown}
        />
        </div>

        <ItemList
        items = {items} />
      </>
    );
  }
}

const ItemFilters = ({allCategories, handleDropdown, isSelected}) => {
  return (
    <div className={"itemFilters-wrapper"}>
    {
      allCategories.map(categoryName => {
        return (
        <Checkbox
        key = {categoryName}
        name = {categoryName}
        onChange = {handleDropdown}
        checked = {isSelected(categoryName)}
        />
      );
      })
    }
    </div>
  );
};

ItemFilters.propTypes = {
  allCategories: PropTypes.array.isRequired,
  handleDropdown: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired
};


const mapStateToProps = (store) => {
  return {
    items: store.items,
  };
};


export default connect(mapStateToProps)(HomePage);
