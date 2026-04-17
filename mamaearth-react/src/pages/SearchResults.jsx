import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // ✅ add navbar
import "./Home.css"; // reuse same styling

function SearchResults() {
  const { query } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchResults();
  }, [query]);

  const fetchResults = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/search/${query}`
      );
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* ✅ Navbar on top */}
      <Navbar />

      <div className="home-container">
        
        {/* ✅ Styled title */}
        <h2 className="home-title">
          Search Results for "{query}"
        </h2>

        {/* ✅ Product grid same as home */}
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="product-card">
                
                <div className="product-image-box">
                  <img
                    className="product-image"
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.name}
                  />
                </div>

                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">₹{product.price}</p>

                <Link to={`/product/${product._id}`}>
                  <button className="view-btn">View Product</button>
                </Link>

              </div>
            ))
          ) : (
            <h3>No products found 😢</h3>
          )}
        </div>

      </div>
    </>
  );
}

export default SearchResults;