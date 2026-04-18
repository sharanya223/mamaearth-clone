import "./Signup.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    referral: "",
  });

  // Update text fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = (e) => {
  e.preventDefault();

  axios
    .post("https://mamaearth-clone-1-x7wj.onrender.com/save-user-details", form)
    .then(() => {
      alert("Signup successful!");
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
      alert("Error saving details");
    });
};

  return (
    <div className="signup-page">
      <div className="signup-container">
        <span className="close-btn" onClick={() => navigate("/")}>
      &times;
    </span>   

        

        <div className="signup-header">
          <h2>Signup for the Goodness Inside</h2>
        </div>

        <form onSubmit={handleSubmit}>
          


          <input
            type="text"
            name="firstName"
            placeholder="First Name*"
            className="signup-input"
            value={form.firstName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name*"
            className="signup-input"
            value={form.lastName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email ID*"
            className="signup-input"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="referral"
            placeholder="Referral Code (Optional)"
            className="signup-input"
            value={form.referral}
            onChange={handleChange}
          />

          <button type="submit" className="signup-btn">
            SIGN UP
          </button>

        </form>

      </div>
    </div>
  );
}

export default Signup;
