import React, { useState } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import Error from "../core/Error";
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";

import "../css/AddCategory.css";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const categoryForm = () => {
    return (
      <div>
        <form>
          <div className="category__form">
            <label className="category__form__label">Enter category</label>
            <input
              type="text"
              id="category__input"
              onChange={handleChange}
              value={name}
              autoFocus
              required
              placeholder="For Example, Summer Tee"
            />
            <button onClick={onSubmit} className="btn category__form__submit">
              Create
            </button>
          </div>
        </form>
      </div>
    );
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

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    // backend request fired
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data === undefined || data.error) {
          setError(true);
        } else {
          setError(false);
          setSuccess(true);
          setName("");
        }
      })
      .catch();
  };

  const successMsg = () => {
    if (success) {
      return <Error msg="New category added successfully!" error={false} />;
    }
  };

  const errorMsg = () => {
    if (error) {
      return <Error msg="Could not create new category" />;
    }
  };

  return (
    <div>
      <Base title="" className="">
        <div className="category__container">
          <h2 className="category__container__heading">Create new category</h2>
          {successMsg()}
          {errorMsg()}
          {categoryForm()}
          {goBack()}
        </div>
      </Base>
    </div>
  );
};

export default AddCategory;
