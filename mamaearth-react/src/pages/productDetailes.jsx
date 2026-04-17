import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProductDetailes.css";
import { useNavigate } from "react-router-dom";

function ProductDetails() {

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  
  const addProduct = async () => {
    const userId = localStorage.getItem("userId"); // make sure login stores this

    if (!userId) {
      alert("Please login first");
      return;
    }

    try {
      await axios.post("http://localhost:5000/add-to-cart", {
        userId,
        productId: product._id
      });

      alert("Product added to cart");
      navigate("/cart");

    } catch (error) {
      console.log(error);
    }
  };

  // Fetch single product
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/get-Product/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product-detail-container">

      <div className="product-detail-card">

        <div className="image-section">
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.name}
          />
        </div>

        <div className="info-section">

          <h2>{product.name}</h2>

          <h3 className="price">₹{product.price}</h3>

          <p className="desc">{product.description}</p>

          <p className="category">Category: {product.category}</p>

          <button onClick={addProduct} className="cart-btn">
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;