import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ManageOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://mamaearth-clone-1-x7wj.onrender.com/manage-order");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://mamaearth-clone-1-x7wj.onrender.com/delete-order/${id}`);
      alert("Order deleted successfully");
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Orders</h2>

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", textAlign: "center" }}
      >
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Address</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
  {orders.map(order =>
    order.products.map((p, index) => (
      <tr key={`${order._id}-${index}`}>

        {/*<td>{p.productId?.name || "N/A"}</td>*/}
        <td>{p.name || p.productId?.name || "N/A"}</td>

        <td>{p.quantity}</td>

        <td>₹{order.totalAmount}</td>

        <td>
          {order.address ? (
            <>
              {order.address.addressLine && (
                <div>{order.address.addressLine}</div>
              )}
              <div>
                {order.address.city || ""}, {order.address.state || ""}
              </div>
              <div>{order.address.pincode || ""}</div>
            </>
          ) : "N/A"}
        </td>

        <td>{order.paymentMethod || "N/A"}</td>

        <td>{order.status}</td>

        <td>
          <Link to={`/edit-order/${order._id}`}>
            <button className="editbtn">Edit</button>
          </Link>

          <button
            className="deletebtn"
            onClick={() => handleDelete(order._id)}
          >
            Delete
          </button>
        </td>

      </tr>
    ))
  )}
</tbody>

      </table>
    </div>
  );
}

export default ManageOrders;
