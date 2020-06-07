import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

import { loadCart, cartEmpty } from "./helper/cartHelper";
import { getToken, makePayment } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";

import "../css/Cart.css";

const Braintree = ({ products, setReload = (f) => f, reload }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    error: "",
    clientToken: null,
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getTotalAmount = () => {
    return products.reduce((total, product) => (total += product.price), 0);
  };

  const getMeToken = (userId, token) => {
    //   fire request to backend
    getToken(userId, token)
      .then((info) => {
        if (info.error) {
          setInfo({ ...info, error: info.error });
        } else {
          const clientToken = info.clientToken;
          setInfo({ clientToken });
        }
      })
      .catch();
  };

  useEffect(() => {
    getMeToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getTotalAmount(),
      };
      makePayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, loading: false, success: response.success });
          console.log("PAYMENT SUCCESS");

          const orderData = {
            products,
            transaction_id: response.transaction_id,
            amount: response.transaction.amount,
          };
          createOrder(userId, token, orderData).then((response) => {});

          cartEmpty(() => {
            console.log("Did we crash?!");
          });
          setReload(!reload);
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  };

  const showDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products && products.length > 0 ? (
          <div className="wrapper">
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button
              className="btn purchase"
              onClick={() => {
                onPurchase();
              }}
            >
              Pay with Braintree
            </button>
          </div>
        ) : (
          <h3>Please log in first or add something to cart</h3>
        )}
      </div>
    );
  };

  return (
    <div>
      <h2 className="amount">Total amount: &#x20B9; {getTotalAmount()}</h2>
      {showDropIn()}
    </div>
  );
};

export default Braintree;
