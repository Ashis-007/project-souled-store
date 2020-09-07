import React, { useState, useEffect } from "react";

import "../styles.css";

// components
import Base from "./Base";
import Card from "./Card";

// helper
import { getAllProducts } from "./helper/coreapicalls";

import "../css/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadAllProducts = () => {
      getAllProducts().then((data) => {
        if (data.error) {
          setError(data.error);
          console.log(error);
        } else {
          for (let i = data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = data[i];
            data[i] = data[j];
            data[j] = temp;
          }
          setProducts(data);
        }
      });
    };
    loadAllProducts();
  }, []);

  return (
    <Base>
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
