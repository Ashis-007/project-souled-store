import React, { useState } from "react";
import { Redirect } from "react-router-dom";

// helper
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

// redux
import { connect } from "react-redux";
import {
  addProduct,
  removeProduct,
  increProduct,
  decreProduct,
} from "../actions";

import "../css/Card.css";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  showCounter = false,
  setReload = (f) => f,
  reload,
  user,
  addProduct,
  removeProduct,
  increProduct,
  decreProduct,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(1); //TODO: Add count feature in cart section

  const getRedirect = () => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const AddToCart = () => {
    addItemToCart(product, user._id, () => {
      setRedirect(true);
      addProduct(product);
    });
  };

  const addItem = () => {
    // TODO: check for max stock
    setCount((prevCount) => prevCount + 1);
    increProduct(product._id);
  };

  const removeItem = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
      decreProduct(product._id);
    }
  };

  const showAddToCart = () => {
    return (
      addToCart && (
        <button onClick={AddToCart} className="btn card__btn card__btn__add">
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = () => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id, user._id);
            removeProduct(product._id);
            setReload(!reload);
          }}
          className="btn card__btn card__btn__remove"
        >
          Remove
        </button>
      )
    );
  };

  const showCounterInCart = () => {
    return (
      <div className="card__counter">
        <button className="btn card__counter__btn btn__add" onClick={addItem}>
          <i className="fas fa-plus-circle"></i>
        </button>
        <p>{count}</p>
        <button
          className="btn card__counter__btn btn__remove"
          onClick={removeItem}
        >
          <i className="fas fa-minus-circle"></i>
        </button>
      </div>
    );
  };

  return (
    <div className="">
      <div className="card">
        <ImageHelper product={product} />
        <div className="card__info">
          <h3 className="card__info__title">{product.name}</h3>
          <p className="card__info__desc">{product.description}</p>
          <p className="card__info__price">&#x20B9;{` ${product.price}`}</p>
          <div className="card__info__options">
            {showAddToCart()}
            {getRedirect(redirect)}
            {showRemoveFromCart()}
            {showCounter && showCounterInCart()}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: (product) => dispatch(addProduct(product)),
  removeProduct: (id) => dispatch(removeProduct(id)),
  increProduct: (id) => dispatch(increProduct(id)),
  decreProduct: (id) => dispatch(decreProduct(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
