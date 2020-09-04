import * as actions from "./actionTypes";

export const signInUser = (user) => ({
  type: actions.SIGNIN_USER,
  payload: user,
});

export const signOutUser = () => ({ type: actions.SIGNOUT_USER });

export const addProduct = (product) => ({
  type: actions.ADD_PRODUCT,
  payload: product,
});

export const removeProduct = (id) => ({
  type: actions.REMOVE_PRODUCT,
  payload: id,
});

export const increProduct = (id) => ({
  type: actions.INCRE_PRODUCT,
  payload: id,
});

export const decreProduct = (id) => ({
  type: actions.DECRE_PRODUCT,
  payload: id,
});
