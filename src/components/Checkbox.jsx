import React from "react";
import PropTypes from "prop-types";
import "./checkbox.css";



const Checkbox = ({name, onChange, checked}) => (


  <div className="inputGroup">
  <div>{name}</div>
    <input id={name} name={name} type="checkbox" onChange={onChange} checked = {checked}/>
    <label htmlFor={name}></label>
  </div>



);

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default Checkbox;
