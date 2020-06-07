import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API, STRIPE_KEY } from "../backend";
import { createOrder } from "./helper/orderHelper";

const StripeCheckout = ({ products, setReload = (f) => f, reload }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const { user, token } = isAuthenticated();

  const getTotalAmount = () => {
    return products.reduce((total, product) => (total += product.price), 0);
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_tjRhKYFAHof3RwOe7WHPaoL300I7jOI1Gy"
        token={makePayment()}
        amount={getTotalAmount() * 100}
        name="Souled Store"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-success">Sign in</button>
      </Link>
    );
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);

        const { status } = response;
        console.log("STATUS ", status);
        cartEmpty();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Total amount: {` $${getTotalAmount()}`}</h2>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
