import React from "react";
import Navbar from "./Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Base = ({
  title = "",
  description = "",
  className = "",
  children,
}) => {
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
      {/* <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>If you got any questions, feel free to reach out!</h4>
          <button className="btn btn-warning btn-lg">Contact Us</button>
        </div>
        <div className="container">
          <span className="text-muted">An amazing place to buy t-shirts!</span>
        </div>
      </footer> */}
    </div>
  );
};

export default Base;
