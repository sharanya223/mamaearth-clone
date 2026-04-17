import "./Yorder.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function  Yorder() {
     const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/manage-order");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };
    /*const userEmail = localStorage.getItem("userEmail");
    
    const userId = localStorage.getItem("userId");*/
    return (
        
        <div style={{ padding: "20px" }}>
             <h2> Your Orders</h2>
       
             {/*<table
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
                   
                 </tr>
               </thead>
       
               <tbody>*/}
         {orders.map(order =>
           order.products.map((p, index) => (
             <p key={`${order._id}-${index}`}>
       
               {/*<td>{p.productId?.name || "N/A"}</td>*/}
               <p>{p.name || p.productId?.name || "N/A"}</p>
       
               <p>{p.quantity}</p>
       
               <p>₹{order.totalAmount}</p>
       
               <p>
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
               </p>
       
               <p>{order.paymentMethod || "N/A"}</p>
       
               <p>{order.status}</p>
       
               
       
             </p>
           ))
         )}
       
       
             
           </div>
         );
       }
export default Yorder;