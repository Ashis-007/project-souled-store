import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// components
import Base from "../core/Base";

// helper
import { signup } from "../auth/helper";

import "../css/Signup.css";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });

    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error signing up"));
  };

  const successMsg = () => {
    if (success) {
      const msg = "Your account was created successfully!\nPlease log in";
      toast.success(msg, {
        position: "top-center",
        toastId: "v",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const errorMsg = () => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        toastId: "*",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const signUpForm = () => {
    return (
      <div className="form__container">
        <form>
          <div className="">
            <label className="">Name</label>
            <input
              className=""
              type="text"
              onChange={handleChange("name")}
              value={name}
              required
              placeholder="Name"
            />
          </div>
          <div className="">
            <label className="text-light">Email</label>
            <input
              className=""
              type="text"
              onChange={handleChange("email")}
              value={email}
              required
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label className="text-light">Password</label>
            <input
              className=""
              type="password"
              onChange={handleChange("password")}
              value={password}
              required
              placeholder="Password"
            />
          </div>
          <button onClick={onSubmit} className="btn submit">
            Sign Up
          </button>
        </form>
        <div className="other">
          <p>
            Already have an account?{" "}
            <Link to="/signin" className="link">
              Log in
            </Link>
          </p>
        </div>
      </div>
    );
  };

  return (
    <Base title="" description="">
      <h2 className="form__heading">Create Account</h2>
      {successMsg()}
      {errorMsg()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
