import React from "react";

// redux
import { connect } from "react-redux";

const EditUser = ({ user }) => {
  return <div></div>;
};

const mapStateToProps = (state) => ({
  user: state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
