import React from "react";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";

const Base = ({ short = false, children }) => {
  return (
    <div>
      <Navbar />
      <div className="">
        <div className="">
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
        <div>{children}</div>
      </div>
      <Footer short={short} />
    </div>
  );
};

export default Base;
