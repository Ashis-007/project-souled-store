import React from "react";

import "../../css/Image.css";

const ImageHelper = ({ product }) => {
  const imageURL = product
    ? `api/product/photo/${product._id}`
    : "//unsplash.it/200/200";
  return <img src={imageURL} className="card__image" />;
};

export default ImageHelper;
