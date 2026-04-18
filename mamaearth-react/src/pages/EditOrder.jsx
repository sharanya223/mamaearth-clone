import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditOrder() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`https://mamaearth-clone-1-x7wj.onrender.com/get-order/${id}`);
      setOrder(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (index, field, value) => {
    const updatedProducts = [...order.products];
    updatedProducts[index][field] = value;

    setOrder({ ...order, products: updatedProducts });
  };

  const handleSave = async () => {
    try {
      
      for (let i = 0; i < order.products.length; i++) {
        await axios.put(`https://mamaearth-clone-1-x7wj.onrender.com/update-order/${id}`, {
          productIndex: i,
          quantity: order.products[i].quantity,
          status: order.status,
          paymentMethod: order.paymentMethod,
        });
      }

      alert("Order updated!");
      navigate("/manage-orders");

    } catch (error) {
      console.log(error);
    }
  };

  if (!order) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Order</h2>

      <h3>Products</h3>

      {order.products.map((p, index) => (
        <div key={index} style={{ marginBottom: "15px" }}>

          <strong>{p.productId?.name}</strong>

          <br />

          Quantity:
          <input
            type="number"
            value={p.quantity}
            onChange={(e) =>
              handleChange(index, "quantity", Number(e.target.value))
            }
            style={{ marginLeft: "10px", width: "60px" }}
          />

        </div>
      ))}

      <br />

      <h3>Payment Method</h3>
      <select
        value={order.paymentMethod || ""}
        onChange={(e) =>
          setOrder({ ...order, paymentMethod: e.target.value })
        }
      >
        <option value="">Select</option>
        <option value="COD">COD</option>
        <option value="WALLET">WALLET</option>
        <option value="NETBANKING">NETBANKING</option>
      </select>

      <br /><br />

      <h3>Status</h3>
      <select
        value={order.status}
        onChange={(e) =>
          setOrder({ ...order, status: e.target.value })
        }
      >
        <option>Pending</option>
        <option>Shipped</option>
        <option>Delivered</option>
      </select>

      <br /><br />

      <button onClick={handleSave}>Save Changes</button>

    </div>
  );
}

export default EditOrder;
