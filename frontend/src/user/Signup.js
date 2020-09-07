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
    contactNumber: "",
    address: "",
    city: "",
    state: "",
    error: "",
    success: false,
  });

  const [showNextForm, setShowNextForm] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");

  const {
    name,
    email,
    password,
    contactNumber,
    address,
    city,
    state,
    error,
    success,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onNext = (event) => {
    event.preventDefault();
    if (password !== repeatPassword) {
      setValues({ ...values, error: "Passwords must match" });
    } else {
      setShowNextForm(true);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });

    signup({ name, email, password, contactNumber, address, city, state })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          // reset
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            contactNumber,
            address: "",
            city: "",
            state: "",
            error: "",
            success: true,
          });
          setShowNextForm(false);
          setRepeatPassword("");
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

  const signUpForm = () =>
    !showNextForm && (
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
          <div className="form-group">
            <label className="text-light">Repeat Password</label>
            <input
              className=""
              type="password"
              onChange={(e) => setRepeatPassword(e.target.value)}
              value={repeatPassword}
              required
              placeholder="Repeat Password"
            />
          </div>
          <button onClick={onNext} className="btn submit">
            Next
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

  const signUpFormTwo = () =>
    showNextForm && (
      <div className="form__container">
        <form>
          <div className="">
            <label className="">Contact Number</label>
            <input
              className=""
              type="text"
              onChange={handleChange("contactNumber")}
              value={contactNumber}
              required
              placeholder="Contact Number"
            />
          </div>
          <div className="">
            <label className="">Address</label>
            <input
              className=""
              type="text"
              onChange={handleChange("address")}
              value={address}
              required
              placeholder="Address"
            />
          </div>
          <div className="">
            <label className="">City</label>
            <input
              className=""
              type="text"
              onChange={handleChange("city")}
              value={city}
              required
              placeholder="City"
            />
          </div>
          <div className="">
            <label className="">State</label>
            <input
              className=""
              type="password"
              onChange={handleChange("state")}
              value={state}
              required
              placeholder="State"
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

  return (
    <Base short={true}>
      <h2 className="form__heading">Create Account</h2>
      {successMsg()}
      {errorMsg()}
      {signUpForm()}
      {signUpFormTwo()}
    </Base>
  );
};

export default Signup;
