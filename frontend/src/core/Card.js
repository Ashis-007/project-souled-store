import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

import "../css/Card.css";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const getRedirect = () => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const AddToCart = () => {
    addItemToCart(product, () => {
      setRedirect(true);
    });
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
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn card__btn card__btn__remove"
        >
          Remove
        </button>
      )
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
