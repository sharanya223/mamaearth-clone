import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
    .post("https://mamaearth-clone-1-x7wj.onrender.com/send-otp", { email })
    .then((res) => {
      alert("OTP sent to your email!");

      // navigate to OTP Page send email as state
      navigate("/otp", { state: { email } });
    })
    .catch((err) => {
      console.log(err);
      alert("Failed to send OTP");
    });
};

  return (
    <div className="login-overlay">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <span className="close-btn" onClick={() => navigate("/")}>
            &times;
          </span>

          <h1>Login/Signup</h1>

          <div className="input-row">
            <input
              type="email"
              placeholder="Enter the Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p className="terms">
            By continuing, you agree to mamaearth's <br />
            <a href="#">Terms and Conditions</a> and{" "}
            <a href="#">Privacy Policy</a>
          </p>

          <button type="submit" className="opp-btn">
            Login with Email
          </button>
          <p className="admin-page" style={{color : '#68696a'}}>
            Are u an Admin? <Link to="/AdminLogin" style={{ color: '#2f94c3', fontWeight: 'bold' }}>Login here</Link>
          </p>

          

          
        </form>
      </div>
    </div>
  );
}

export default Login;
