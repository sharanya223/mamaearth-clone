import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./AdminLogin.css";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if(email === "admin@mamaearth.com" && password === "admin123"){
        alert("Admin Login Successful");
        navigate("/AdminDashboard");
    } else {
        alert("Invalid Admin Credentials");
    }
  }

  return (
    <div className="admin-overlay">
      <div className="admin-container">

        <span className="admin-close" onClick={()=>navigate("/")}>
          &times;
        </span>

        <h1>Admin Login</h1>

        <form onSubmit={handleAdminLogin}>

          <div className="admin-input">
            <input
              type="email"
              placeholder="Enter Admin Email"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="admin-input">
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button className="admin-btn">Login</button>

        </form>

      </div>
    </div>
  );
}

export default AdminLogin;