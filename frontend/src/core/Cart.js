import React, { useState, useEffect } from "react";

// components
import Base from "./Base";
import Card from "./Card";
// import StripeCheckout from "./StripeCheckout";
// import Braintree from "./Braintree";

// helper
import { loadCart } from "./helper/cartHelper";

// redux
import { connect } from "react-redux";

import "../css/Cart.css";

const Cart = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart(user?._id));
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
              showCounter={true}
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
          {/* {products && <Braintree products={products} setReload={setReload} />} */}
        </div>
      </div>
    </Base>
  );
};

const mapStateToProps = (state) => ({
  user: state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
