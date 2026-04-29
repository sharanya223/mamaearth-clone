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
        `https://mamaearth-clone-1-x7wj.onrender.com/get-cart/${userId}`
      );

      setProducts(
        (res.data.products || []).filter(
          (item) => item.productId !== null
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const totalPrice = products.reduce(
    (total, item) =>
      item.productId
        ? total + item.productId.price * item.quantity
        : total,
    0
  );

  const handleProceed = () => {///
    console.log("BuyNow value:", location.state?.isBuyNow);
    const checkoutData = {
      products,
      totalAmount: totalPrice,
      //isBuyNow: products.length === 1
isBuyNow: location.state?.isBuyNow || false
    };

    localStorage.setItem(
      "checkoutData",
      JSON.stringify(checkoutData)
    );

    navigate("/address", { state: checkoutData });
  };

  return (
    <div className="order-container">
      <h2 className="order-title">Order Summary</h2>

      <div className="order-layout">

        <div className="order-list">
          {products.length > 0 ? (
            products
              .filter((item) => item.productId)
              .map((item) => (
                <div
                  key={item.productId._id}
                  className="order-card"
                >
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                  />

                  <div className="order-info">
                    <h4>{item.productId.name}</h4>
                    <p>Price: ₹{item.productId.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>
                      Subtotal: ₹
                      {item.productId.price *
                        item.quantity}
                    </p>
                  </div>
                </div>
              ))
          ) : (
            <p>No products found</p>
          )}
        </div>

        <div className="summary-box">
          <h3>Price Details</h3>

          <div className="summary-row">
            <span>Items</span>
            <span>{products.length}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>Free</span>
          </div>

          <div className="summary-row summary-total">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          <button
            className="place-order-btn"
            disabled={products.length === 0}
            onClick={handleProceed}
          >
            Proceed to Address
          </button>
        </div>

      </div>
    </div>
  );
}

export default Order;