
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="avatar">
          {storedUser?.email?.charAt(0).toUpperCase()}
        </div>

        <h2>My Profile</h2>

        <p><strong>User ID:</strong> {storedUser?._id}</p>

        <p><strong>Email:</strong> {storedUser?.email}</p>

        <p>
          <strong>Status:</strong>{" "}
          {storedUser?.isVerified ? "Verified ✅" : "Not Verified"}
        </p>

        <button onClick={() => navigate("/")}>
          Back to Home
        </button>

      </div>
    </div>
  );
}

export default Profile;