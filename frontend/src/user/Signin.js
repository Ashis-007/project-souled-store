import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import Base from "../core/Base";
import { signin, authenticate, isAuthenticated } from "../auth/helper";
import Error from "../core/Error";

import "../css/Signin.css";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: true });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("Sign in request failed!"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }

    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const errorMsg = () => {
    return <Error msg={error} />;
  };

  const signInForm = () => {
    return (
      <div className="form__container">
        <form>
          <div className="">
            <label className="">Email</label>
            <input
              className=""
              type="text"
              onChange={handleChange("email")}
              value={email}
              required
              placeholder="Email"
            />
          </div>
          <div className="">
            <label className="">Password</label>
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
            Login
          </button>
        </form>
        <div className="other">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    );
  };

  return (
    <Base title="" description="">
      <h2 className="form__heading">Sign In</h2>

      {/* {loadingMsg()} */}
      {errorMsg()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
