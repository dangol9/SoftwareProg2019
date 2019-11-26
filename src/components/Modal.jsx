import React from "react";
import "./modal.css";
import {IoMdCloseCircleOutline} from "react-icons/all";

const Modal = () => (

  <div className = {"modal"}>
    <div className = {"modal-inner"}>
    <IoMdCloseCircleOutline />
      i am modal
    </div>
  </div>
);

export default Modal;
