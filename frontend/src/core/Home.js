import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";

import "../css/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="" description="">
      <div className="gradient">
        <p>Welcome to the Souled Store.</p>
      </div>
      <div className="home__grid">
        {products.map((product, index) => {
          return (
            <div key={index} className="">
              <Card product={product} />
            </div>
          );
        })}
      </div>
    </Base>
  );
};

export default Home;
