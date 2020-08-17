import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllCategories, deleteCategory } from "./helper/adminapicall";

import "../css/ManageCategories.css";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryId) => {
    deleteCategory(user._id, token, categoryId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base>
      <Link className="btn return-home" to={`/admin/dashboard`}>
        <i className="fas fa-arrow-left"></i>
        <span className=""> Admin Home</span>
      </Link>

      <div className="Manage">
        <h2 className="Manage__heading">Manage Categories</h2>
        <h2 className="Manage__subheading">
          Total {categories.length} categories
        </h2>

        {categories.map((category, index) => {
          return (
            <div key={index} className="Manage__category">
              <h3 className="Manage__category__name">{category.name}</h3>

              <Link className="" to={`/admin/category/update/${category._id}`}>
                <button className="btn Manage__category__update">Update</button>
              </Link>

              <button
                onClick={() => {
                  deleteThisCategory(category._id);
                }}
                className="btn Manage__category__delete"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </Base>
  );
};

export default ManageCategories;
