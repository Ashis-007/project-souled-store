import React from "react";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Base = ({ title = "", description = "", className = "", children }) => {
  return (
    <div>
      <Navbar />
      <div className="">
        <div className="">
          <h2 className="">{title}</h2>
          <p className="">{description}</p>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{ fontSize: "1.7rem", padding: "0.5em" }}
          />
        </div>
        <div className={className}>{children}</div>
      </div>
      <div className="footer">
        <p>All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Base;
