import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import {} from "./helper/coreapicalls";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
import Braintree from "./Braintree";

import "../css/Cart.css";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2 className="Cart__heading">Items in cart</h2>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              addToCart={false}
              removeFromCart={true}
              reload={reload}
              setReload={setReload}
            />
          );
        })}
      </div>
    );
  };

  return (
    <Base title="" description="">
      <div className="Cart">
        <div className="Cart__products">
          {products ? loadAllProducts(products) : <h3>No products in cart!</h3>}
        </div>
        <div className="Cart__payment">
          {/* <StripeCheckout products={products} setReload={setReload} /> */}
          {products && <Braintree products={products} setReload={setReload} />}
        </div>
      </div>
    </Base>
  );
};

export default Cart;
