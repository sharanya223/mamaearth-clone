import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./Order.css";

function Order() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const singleProduct = location.state?.singleProduct;

    if (singleProduct) {
      setProducts([singleProduct]);
    } else {
      fetchCart();
    }
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/get-cart/${userId}`
      );
      setProducts(res.data.products || []);
    } catch (err) {
      console.log(err);
    }
  };

  const totalPrice = products.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );

  
  const handleProceed = () => {
    const checkoutData = {
      products,
      totalAmount: totalPrice,
      isBuyNow: products.length === 1  
    };

    
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

    // navigate to address page
    navigate("/address", { state: checkoutData });
  };

  return (
    <div className="order-container">
      <h2>Order Summary</h2>

      {products.length > 0 ? (
        <div className="order-list">
          {products.map((item) => (
            <div key={item.productId._id} className="order-card">
              <img
                src={`http://localhost:5000/uploads/${item.productId.image}`}
                alt={item.productId.name}
              />

              <div>
                <h4>{item.productId.name}</h4>
                <p>Price: ₹{item.productId.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found</p>
      )}

      <h3>Total: ₹{totalPrice}</h3>

      
      <button
        className="place-order-btn"
        disabled={products.length === 0}
        onClick={handleProceed}
      >
        Proceed to Address
      </button>
    </div>
  );
}

export default Order;