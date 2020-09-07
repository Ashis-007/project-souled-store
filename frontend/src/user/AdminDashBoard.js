import React from "react";
import { Link } from "react-router-dom";

// components
import Base from "../core/Base";

// helper
import { isAuthenticated } from "../auth/helper";

import "../css/AdminDashboard.css";

const AdminDashBoard = () => {
  const {
    user: { name, email },
  } = isAuthenticated();

  const adminPanel = () => {
    return (
      <div className="admin__panel">
        <h4 className="heading">Admin Panel</h4>
        <div className="">
          <ul className="admin__panel__items">
            <li className="admin__panel__item">
              <Link to="/admin/create/category" className="">
                Create category
              </Link>
            </li>
            <li className="admin__panel__item">
              <Link to="/admin/categories" className="">
                Manage categories
              </Link>
            </li>
            <li className="admin__panel__item">
              <Link to="/admin/create/product" className="">
                Create product
              </Link>
            </li>
            <li className="admin__panel__item">
              <Link to="/admin/products" className="">
                Manage products
              </Link>
            </li>
            <li className="admin__panel__item">
              <Link to="/admin/orders" className="">
                Manage orders
              </Link>
            </li>
            <li className="admin__panel__item">
              <Link to="" className=""></Link>
            </li>
            <li className="admin__panel__item">
              <Link to="" className=""></Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="admin__info">
        <h4 className="heading">Admin Information</h4>

        <ul className="admin__info__items">
          <li className="admin__info__item">
            <span className="">Name:</span> {name}
          </li>
          <li className="admin__info__item">
            <span className="">Email:</span> {email}
          </li>
          <li className="admin__info__item">
            <span className="">Admin Priviledge</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base short={true}>
      <div className="admin-dashboard">
        <div className=""> {adminInfo()}</div>
        <div className=""> {adminPanel()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
