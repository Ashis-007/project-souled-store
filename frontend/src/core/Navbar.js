import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import { signout, isAuthenticated } from "../auth/helper";

import "../css/Navbar.css";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#ffffff" };
  }
};

const Navbar = ({ history }) => {
  const navbarAnimation = () => {
    const burger = document.querySelector(".nav__burger");
    const close = document.querySelector(".nav__close");
    const navLinks = document.querySelector(".nav__nav-links");

    burger.addEventListener("click", () => {
      navLinks.classList.add("nav__nav-links--nav-active");
      navLinks.style.zIndex = 2;
    });

    close.addEventListener("click", () => {
      navLinks.classList.remove("nav__nav-links--nav-active");
    });
  };

  return (
    <div className="nav">
      <div className="nav__brand">
        <div className="nav__brand-logo"></div>
        <h2 className="nav__brand-name">Souled Store</h2>
      </div>
      <div className="nav__burger hide-desktop" onClick={navbarAnimation}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <ul className="nav__nav-links">
        <li>
          <div className="nav__close hide-desktop">&#x2715;</div>
        </li>
        <li className="nav__nav-item ">
          <Link
            style={currentTab(history, "/")}
            className="nav__nav-link"
            to="/"
          >
            Home
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated.role === 0 && (
          <li className="nav__nav-item">
            <Link
              style={currentTab(history, "/user/dashboard")}
              className="nav__nav-link"
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav__nav-item">
            <Link
              style={currentTab(history, "/admin/dashboard")}
              className="nav__nav-link"
              to="/admin/dashboard"
            >
              Admin Panel
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav__nav-item">
              <Link
                style={currentTab(history, "/signup")}
                className="nav__nav-link"
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
            <li className="nav__nav-item">
              <Link
                style={currentTab(history, "/signin")}
                className="nav__nav-link"
                to="/signin"
              >
                Sign In
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <Fragment>
            <li className="nav__nav-item">
              <Link
                style={currentTab(history, "/cart")}
                className="nav__nav-link"
                to="/cart"
              >
                <i class="fas fa-shopping-cart hide-mobile show-desktop">
                  <p>Cart</p>
                </i>
              </Link>
            </li>
            <li className="nav__nav-item">
              <button
                className="nav__signout"
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                Signout
              </button>
            </li>
          </Fragment>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Navbar);
