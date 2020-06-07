import React from "react";
import { Link } from "react-router-dom";

const Error = ({ msg, error = true, link = "", linkMsg = "" }) => {
  const color = error ? "alert-danger" : "alert-success";

  const dismissError = () => {
    const alert = document.querySelector(".alert");
    alert.style.display = "none";
  };

  return (
    <div className={`alert ${color} alert-dismissible fade show" role="alert`}>
      <strong></strong> {msg}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={dismissError}
      >
        <Link to={link}>{linkMsg}</Link>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Error;
