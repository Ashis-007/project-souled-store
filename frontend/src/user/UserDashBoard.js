import React from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";

// redux
import { connect } from "react-redux";

import "../css/UserDashboard.css";

const UserDashBoard = ({ user }) => {
  const infoPanel = () => (
    <div className="UserDashboard__info-panel">
      <h2 className="UserDashboard__info-panel__heading">Account Details</h2>
      <div className="UserDashboard__info-panel__section">
        <h3 className="UserDashboard__info-panel__section__field">Name</h3>
        <p className="UserDashboard__info-panel__section__value">{user.name}</p>
      </div>
      <div className="UserDashboard__info-panel__section">
        <h3 className="UserDashboard__info-panel__section__field">Email</h3>
        <p className="UserDashboard__info-panel__section__value">
          {user.email}
        </p>
      </div>
      <div className="UserDashboard__info-panel__section">
        <h3 className="UserDashboard__info-panel__section__field">Phone</h3>
        <p className="UserDashboard__info-panel__section__value">
          {user.contactNumber}
        </p>
      </div>
      <div className="UserDashboard__info-panel__section">
        <h3 className="UserDashboard__info-panel__section__field">Address</h3>
        <p className="UserDashboard__info-panel__section__value">
          {user.address}
        </p>
      </div>
      <div className="UserDashboard__info-panel__section">
        <h3 className="UserDashboard__info-panel__section__field">City</h3>
        <p className="UserDashboard__info-panel__section__value">{user.city}</p>
      </div>
      <div className="UserDashboard__info-panel__section">
        <h3 className="UserDashboard__info-panel__section__field">State</h3>
        <p className="UserDashboard__info-panel__section__value">
          {user.state}
        </p>
      </div>

      <button className="btn UserDashboard__info-panel__edit">
        <Link to="/user/edit">Edit</Link>
      </button>
    </div>
  );

  // TODO: complete this
  const purchaseHistory = () => (
    <div className="UserDashboard__purchases"></div>
  );

  return (
    <Base short={true}>
      <div className="UserDashboard">
        <h2 className="UserDashboard__heading">Profile</h2>
        {infoPanel()}
        {purchaseHistory()}
      </div>
    </Base>
  );
};

const mapStateToProps = (state) => ({
  user: state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UserDashBoard);
