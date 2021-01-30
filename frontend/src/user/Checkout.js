import React from "react";

// components
import Braintree from "../core/Braintree";

// redux
import { connect } from "react-redux";

const Checkout = ({ user }) => {
  return (
    <div className="Checkout">
      <h1>Checkout</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
