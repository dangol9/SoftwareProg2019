import {createStore} from "redux";


const USER_LOADED = "USER_LOADED";
const initialState = {
  email: null,
  id: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:{
      return state;
    }
  }
};
const store = createStore(authReducer);
store.subscribe(() => console.log(store.getState()));

store.dispatch({
  type: USER_LOADED,
  payload: {
    email: "gary@mail.com",
    _id: 2,
  }
});
export default store;
