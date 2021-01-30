import React from "react";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";

// redux
import { connect } from "react-redux";

const Base = ({ short = false, children, user }) => {
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

const mapStateToProps = (state) => ({
  user: state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Base);
