import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
// const USER_SUCCESS = "USER_SUCCESS";
// const USER_REQUEST = "USER_REQUEST";
// const USER_FAILURE = "USER_FAILURE";


const ITEMS_SUCCESS = "ITEMS_SUCCESS";
const ITEMS_REQUEST = "ITEMS_REQUEST";
const ITEMS_FAILURE = "ITEMS_FAILURE";


export const getItems = () => (dispatch, getState) => {
  if(getState().items.length > 0) return null;
  dispatch(itemsRequest());
  return fetch("/api/v1/items")
  .then(res =>{
    return res.json();
    })
  .then(items => {
    dispatch(itemsSuccess(items));
  })
  .catch(err => {
    console.error(err);
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



const ITEM_ADDED = "ITEM_ADDED";
const ITEM_REMOVED = "ITEM_REMOVED";

export const removeItem = (_id) => ({
  type: ITEM_REMOVED,
  payload: _id,
});


export const addItem = (item) => ({
  type: ITEM_ADDED,
  payload: item,
});


const initialState = {
  user: {
    email: null,
    _id: null,
    token: null,
  },
  cart: [

  ],
  items: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEMS_SUCCESS: {
      return {
        ...state,
        items: action.payload,
      };
    }


    case ITEM_REMOVED: {
      return {
        ...state,
        cart: removeItemById(state.cart, action.payload)
      };
    }
    case ITEM_ADDED: {
      return {
        ...state,
        cart: state.cart.concat([action.payload])
      };
    }
    default:{
      return state;
    }
  }
};
const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => console.log(store.getState()));


export default store;

const removeItemById = (items, _id) => {
  const index = items.findIndex(item => item._id === _id);
  if(index === -1) return items;
  const copy = items.slice();
  copy.splice(index, 1);
  return copy;
};
