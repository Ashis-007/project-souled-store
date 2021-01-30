import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// redux
import { connect } from "react-redux";
import { signInUser } from "./actions";

// helper
import { isAuthenticated } from "./auth/helper";
import { loadCart } from "./core/helper/cartHelper";

import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";

import AdminRoute from "./auth/helper/AdminRoute";
import PrivateRoute from "./auth/helper/PrivateRoute";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";

import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import UpdateCategory from "./admin/UpdateCategory";

import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";

import Cart from "./core/Cart";
import EditUser from "./user/EditUser";
import Checkout from "./user/Checkout";

const Routes = ({ user, signInUser }) => {
  useEffect(() => {
    const { user: userInfo } = isAuthenticated();
    const cart = loadCart(userInfo?._id);

    if (userInfo) {
      user = { ...userInfo, cart };
      signInUser(user);
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <PrivateRoute path="/user/edit" exact component={EditUser} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />

        {/* CATEGORY */}
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoute
          path="/admin/categories"
          exact
          component={ManageCategories}
        />
        <AdminRoute
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCategory}
        />

        {/* PRODUCT */}
        <AdminRoute path="/admin/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />

        {/* CART */}
        <PrivateRoute path="/:userId/checkout" exact component={Checkout} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  user: state,
});

const mapDispatchToProps = (dispatch) => ({
  signInUser: (user) => dispatch(signInUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
