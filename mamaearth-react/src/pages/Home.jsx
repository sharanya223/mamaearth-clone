import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Home.css";

function Home() {

  const [products, setProducts] = useState([]);


  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await axios.get("https://mamaearth-clone-1-x7wj.onrender.com/manage-products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
   
     
      
    <div className="home-container">

      <h2 className="home-title">Our Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <div className="product-image-box">
              <img
              className="product-image"
              src={product.image}
              alt={product.name}
              />
            </div>

            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">₹{product.price}</p>
             <Link to={`/product/${product._id}`}>
              <button className="view-btn">View Product</button>
            </Link>

          </div>

        ))}

      </div>

    </div>
    </>
  );
}

export default Home;
