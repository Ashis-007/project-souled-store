import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  INCRE_PRODUCT,
  DECRE_PRODUCT,
  SIGNIN_USER,
  SIGNOUT_USER,
} from "../actions/actionTypes";

const initialState = null;

/* const initialState = {
  _id: null,
  name: null,
  email: null,
  role: 0,
  cart: [],
}; */

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_USER:
      return { ...action.payload };

    case SIGNOUT_USER:
      return null;

    case ADD_PRODUCT:
      return { ...state, cart: [...state.cart, action.payload] };

    case REMOVE_PRODUCT:
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== action.payload),
      };

    case INCRE_PRODUCT:
      return {
        ...state,
        cart: state.cart.map((product) =>
          product.id === action.payload ? (product.count += 1) : product
        ),
      };

    case DECRE_PRODUCT:
      return {
        ...state,
        cart: state.cart.map((product) =>
          product.id === action.payload ? (product.count -= 1) : product
        ),
      };

    default:
      return state;
  }
};
