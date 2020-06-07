import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import Error from "../core/Error";
import { isAuthenticated } from "../auth/helper";
import { createProduct, getAllCategories } from "./helper/adminapicall";

import "../css/AddProduct.css";
const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(photo);
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
          console.log(data.error);
        }
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          stock: "",
          photo: "",
          loading: false,
          createdProduct: data.name,
        });
      })
      .catch((err) => console.log(err));
  };

  const successMsg = () => {
    if (createdProduct) {
      return <Error msg="Created new product successfully!" error={false} />;
    }
  };

  const errorMsg = () => {
    if (error) {
      return <Error msg="Failed to create new product" />;
    }
  };

  const goBack = () => {
    return (
      <div className="">
        <Link className="btn return-home" to="/admin/dashboard">
          <i class="fas fa-arrow-left"></i> Admin Home
        </Link>
      </div>
    );
  };

  const createProductForm = () => (
    <form className="product__form">
      <span className="product__form__photo-label">Choose product photo</span>
      <div className="">
        <label className="btn">
          <input
            onChange={handleChange("photo")}
            type="file"
            accept="image"
            placeholder=""
          />
        </label>
      </div>
      <div className="">
        <input
          onChange={handleChange("name")}
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="">
        <input
          onChange={handleChange("description")}
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select Category</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn product__form__submit"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base>
      <div className="">
        <div className="">
          <h2 className="heading">Add new product</h2>
          {successMsg()}
          {errorMsg()}
          {createProductForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
