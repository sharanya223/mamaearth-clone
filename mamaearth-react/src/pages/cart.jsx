import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./cart.css";

function ProductCart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  
  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return;

    try {
      await axios.put("https://mamaearth-clone-1-x7wj.onrender.com/update-cart", {
        userId,
        productId,
        quantity: newQty,
      });

      setCartItems((prev) =>//quick ui update in frontend
        //prev.map((item) =>
          //item.productId._id === productId
        prev.map((item) =>
  item.productId && item.productId._id === productId
            ? { ...item, quantity: newQty }
            : item
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  
  const removeItem = async (productId) => {
    try {
      await axios.delete("https://mamaearth-clone-1-x7wj.onrender.com/remove-from-cart", {
        data: { userId, productId },
      });

      setCartItems((prev) =>
        //prev.filter((item) => item.productId._id !== productId)
        // //quick ui update in frontend
        prev.filter((item) => item.productId && item.productId._id !== productId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  
  const handleBuyNow = (item) => {
    navigate("/order", {
      state: { singleProduct: item },
    });
  };

  
  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        alert("Please login first");
        return;
      }

      try {
        const res = await axios.get(
          `https://mamaearth-clone-1-x7wj.onrender.com/get-cart/${userId}`
        );

        //setCartItems(res.data.products || []);
        setCartItems(
  (res.data.products || []).filter(
    (item) => item.productId !== null
  )
);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }, [userId]);

  
  //const totalPrice = cartItems.reduce(
    //(total, item) => total + item.productId.price * item.quantity,
    //0
  //);
  const totalPrice = cartItems.reduce(
  (total, item) =>
    item.productId
      ? total + item.productId.price * item.quantity
      : total,
  0
);

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart</h2>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.length > 0 ? (
            //cartItems.map((item) => (
              cartItems
  .filter((item) => item.productId)
  .map((item) => (
              <tr key={item.productId._id}>
                <td>
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="cart-image"
                  />
                </td>

                <td>{item.productId.name}</td>
                <td>₹{item.productId.price}</td>
                <td>{item.productId.category}</td>

               
                <td>
                  <div className="qty-control">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId._id,
                          item.quantity - 1
                        )
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId._id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </td>

                
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() =>
                        removeItem(item.productId._id)
                      }
                      className="remove-btn"
                    >
                      Remove
                    </button>

                    <button
                      onClick={() => handleBuyNow(item)}
                      className="buy-btn"
                    >
                      Buy Now
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Cart is empty</td>
            </tr>
          )}
        </tbody>

      
        <tfoot>
          <tr>
            <td colSpan="6" style={{ textAlign: "right", padding: "15px" }}>
              <strong>Total: ₹{totalPrice}</strong>

              <button
                className="checkout-btn"
                disabled={cartItems.length === 0}
                onClick={() => navigate("/order")}
                style={{ marginLeft: "20px" }}
              >
                Proceed to Checkout
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ProductCart;
