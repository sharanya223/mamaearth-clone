import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="admin-dashboard">

      <h1>Admin Dashboard</h1>

      <div className="admin-actions">
        <button onClick={() => navigate("/add-product")}>Add Product</button>
        <button onClick={() => navigate("/manage-products")}>Manage Products</button>
        <button onClick={() => navigate("/manage-orders")}>Manage Orders</button>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
}

export default AdminDashboard;