import React from "react";

import "../css/Footer.css";
const Footer = ({ short = false }) => {
  return (
    <footer
      className="Footer"
      style={{
        position: short ? "absolute" : "",
      }}
    >
      <p>All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
