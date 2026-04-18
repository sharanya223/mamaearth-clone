import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "./payment.css";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const data =
  location.state || JSON.parse(localStorage.getItem("checkoutData")) || {};

  if (!data || !data.products) {
  alert("Session expired. Please checkout again.");
  navigate("/cart");
  return null;
}

  const userId = localStorage.getItem("userId");

  const [paymentMethod, setPaymentMethod] = useState("");

  const placeOrder = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    
    if (paymentMethod === "COD") {
      try {
        await axios.post("https://mamaearth-clone-1-x7wj.onrender.com/checkout", {
          userId,
          products: data.products,
          totalAmount: data.totalAmount,
          address: data.address,
          paymentMethod,
          isBuyNow: data.isBuyNow,
        });

        alert("Order placed successfully");
        localStorage.removeItem("checkoutData");
        navigate("/");
      } catch (err) {
        console.log(err);
        alert("Order failed");
      }

      return;
    }

    
    try {
      const { data: order } = await axios.post(
        "https://mamaearth-clone-1-x7wj.onrender.com/create-order",
        { amount: data.totalAmount }
      );

      const options = {
       key: "rzp_test_SabMg6QBJZmARS",
        amount: order.amount,
        currency: "INR",
        name: "Mamaearth Clone",
        description: "Payment",
        order_id: order.id,

        
        handler: async function (response) {
          console.log("PAYMENT SUCCESS:", response);

          try {
            await axios.post("https://mamaearth-clone-1-x7wj.onrender.com/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,

              orderData: {
                userId,
                products: data.products,
                totalAmount: data.totalAmount,
                address: data.address,
                paymentMethod,
                isBuyNow: data.isBuyNow,
              },
            });

            alert("Payment Successful & Order Saved ");
            localStorage.removeItem("checkoutData");
            navigate("/");
          } catch (err) {
            console.log("VERIFY ERROR:", err);
            alert("Payment verification failed ");
          }
        },

        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },

        theme: {
          color: "#00aaff",
        },
      };

    const rzp = new window.Razorpay(options);

rzp.on("payment.failed", function (response) {
  console.log("PAYMENT FAILED:", response);
  alert("Payment failed ");
});

rzp.open();  
    } catch (err) {
      console.log(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="login-overlay">
      <div className="container">
        <span className="close-btn" onClick={() => navigate("/")}>
          &times;
        </span>

        <h1>Payment</h1>

        <div className="input-row">
          <input
            type="radio"
            name="payment"
            value="COD"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label>Cash on Delivery</label>
        </div>

        <div className="input-row">
          <input
            type="radio"
            name="payment"
            value="UPI"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label>UPI</label>
        </div>

        <div className="input-row">
          <input
            type="radio"
            name="payment"
            value="CARD"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label>Debit/Credit Card</label>
        </div>

        <div className="input-row">
          <input
            type="radio"
            name="payment"
            value="WALLET"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label>Wallet</label>
        </div>

        <div className="input-row">
          <input
            type="radio"
            name="payment"
            value="NETBANKING"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label>Netbanking</label>
        </div>

        <button className="place-order-btn" onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Payment;
