import "./Yorder.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Yorder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    console.log("Updated Orders:", orders);
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://mamaearth-clone-1-x7wj.onrender.com/manage-order"
      );

      console.log("Orders Data:", res.data);
      setOrders(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="orders-page">

      <h2 className="order-title">My Orders</h2>

      <div className="orders-grid">

        {orders.map((order) =>
          order.products.map((p, index) => {

            const imagePath =
              p.productId?.image
                ? `https://mamaearth-clone-1-x7wj.onrender.com/uploads/${p.productId.image}`
                : null;

            return (
              <div
                className="order-card"
                key={`${order._id}-${index}`}
              >

                {/* Product Image */}
                {imagePath ? (
                  <img
                    src={imagePath}
                    alt={p.productId?.name || "product"}
                    className="order-img"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="order-img no-image">🛍️</div>
                )}

                {/* Product Name */}
                <h3>
                  {p.productId?.name || p.name || "Product"}
                </h3>

                {/* Quantity */}
                <p>
                  <strong>Qty:</strong> {p.quantity}
                </p>

                {/* Amount */}
                <p>
                  <strong>Total:</strong> ₹{order.totalAmount}
                </p>

                {/* Payment */}
                <p>
                  <strong>Payment:</strong> {order.paymentMethod}
                </p>

                {/* Status */}
                <p
                  className={`status ${order.status.toLowerCase()}`}
                >
                  {order.status}
                </p>

              </div>
            );
          })
        )}

      </div>

    </div>
  );
}

export default Yorder;