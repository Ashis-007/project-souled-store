import React from "react";
import { Link } from "react-router-dom";

// helper
import ImageHelper from "./helper/ImageHelper";

const ManageCard = ({ product, deleteThisProduct }) => {
  return (
    <div className="Manage">
      <div className="card Manage__card">
        <ImageHelper product={product} />
        <div className="card__info">
          <h3 className="card__info__title">{product.name}</h3>
          <p className="card__info__desc">{product.description}</p>
          <p className="card__info__price">&#x20B9;{` ${product.price}`}</p>
          <div className="card__info__options">
            <Link className="" to={`/admin/product/update/${product._id}`}>
              <button className="btn card__update">Update</button>
            </Link>
            <button
              onClick={() => {
                deleteThisProduct(product._id);
              }}
              className="btn card__delete"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCard;
