import * as services from "../services.js";
import * as selectors from "./selectors";
import {toast} from "react-toastify";
export const ITEMS_SUCCESS = "ITEMS_SUCCESS";
export const ITEMS_REQUEST = "ITEMS_REQUEST";
export const ITEMS_FAILURE = "ITEMS_FAILURE";
export const ITEM_ADDED = "ITEM_ADDED";
export const ITEM_REMOVED = "ITEM_REMOVED";
export const USER_UPDATE = "USER_UPDATE";
export const TOKEN_UPDATE = "TOKEN_UPDATE";

export const removeItem = (itemId) => (dispatch, getState) => {
  const store = getState();
  const token = selectors.getToken(store);
  const userId = selectors.getUser(store)._id;
  services.removeItemFromCart({itemId, token, userId})
  .then( () => {
    toast.success("Toode eemaldatud edukalt");
    dispatch({
      type: ITEM_REMOVED,
      payload: itemId,
    });
  })
  .catch( err => {
    console.log("err: ", err);
    toast.error("Toote eemaldamise error");
  });
};



export const addItem = (item) => (dispatch, getState) => {
  const store = getState();
  const itemId = item._id;
  const token = selectors.getToken(store);
  const userId = selectors.getUser(store)._id;
  services.addItemToCart({itemId, token, userId})
  .then( () => {
    dispatch({
      type: ITEM_ADDED,
      payload: itemId,
    });
  })
  .catch( err => {
    console.log("err: ", err);
    toast.error("Toote lisamise error");
  });
};

export const getItems = () => (dispatch, getState) => {
  const store = getState();
  if(selectors.getItems(store).length > 0) return null;
  dispatch(itemsRequest());
  return services.getItems()
  .then(items => {
    dispatch(itemsSuccess(items));
  })
  .catch(err => {
    console.log(err);
    dispatch(itemsFailure());
  });
};



export const itemsSuccess = (items) => ({
  type: ITEMS_SUCCESS,
  payload: items,
});

export const itemsRequest = () => ({
  type: ITEMS_REQUEST,
});


export const itemsFailure = () => ({
  type: ITEMS_FAILURE,
});


export const userUpdate = (user) => ({
  type: USER_UPDATE,
  payload: user,
});

export const tokenUpdate = (token) => ({
  type: TOKEN_UPDATE,
  payload: token,
});
