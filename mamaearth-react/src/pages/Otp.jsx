import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./Otp.css";

function Otp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const verifyOtp = async () => {
  try {
    const res = await axios.post("http://localhost:5000/verify-otp", { email, otp });

    
    localStorage.setItem("userId", res.data.user._id);

  
    localStorage.setItem("user", JSON.stringify(res.data.user));

    if (res.data.alreadyRegistered) {
      navigate("/");   // existing user =home
    } else {
      navigate("/signup", { state: { email } }); // new user = signup
    }

  } catch (err) {
    console.log(err);
    alert("Invalid OTP");
  }
};
  

  return (
    <div className="otp-overlay">
      <div className="otp-container">
        
        <span className="otp-close-btn" onClick={() => navigate("/")}>
          &times;
        </span>

        <h2>Enter OTP sent to</h2>
        <p style={{ marginTop: "-8px", fontWeight: "bold" }}>{email}</p>

        <input
          type="text"
          className="otp-input"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button className="otp-btn" onClick={verifyOtp}>
          Verify OTP
        </button>
      </div>
    </div>
  );
}

export default Otp;