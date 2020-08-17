import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import ManageCard from "../core/ManageCard";
import { isAuthenticated } from "../auth/helper";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";

import "../css/ManageProducts.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(user._id, token, productId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base title="">
      <Link className="btn return-home" to={`/admin/dashboard`}>
        <i className="fas fa-arrow-left"></i>
        <span className=""> Admin Home</span>
      </Link>
      <div className="ManageProducts">
        <h2 className="ManageProducts__heading">Manage Products</h2>
        <h2 className="ManageProducts__subheading">
          Total {products.length} products
        </h2>
        <div className="ManageProducts__products">
          {products.map((product, index) => {
            return (
              <ManageCard
                product={product}
                key={index}
                deleteThisProduct={deleteThisProduct}
              />
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
