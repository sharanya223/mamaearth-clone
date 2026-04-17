import "./Navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import axios from "axios";

import ImageCarousel  from "./ImageCarousel";


const images = [
  "/image1.avif",
  "/image2.avif",
  "/image3.avif"
];





function Navbar () {
    const [searchKey, setSearchKey] = useState("");
    const [hoverMenu, setHoverMenu] = useState("");
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
useEffect(() => {
  const user = localStorage.getItem("userId");

  if (user) {
    setIsLogin(true);
  } else {
    setIsLogin(false);
  }
}, []);
const handleLogout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  setIsLogin(false);
  navigate("/");
};
    


const handleSearch = (e) => {
    setSearchKey(e.target.value);
  };

    
    
  
  const handleButtonSearch = () => {
    if (searchKey.trim() === "") return;

    navigate(`/search/${searchKey}`);
  };

 

const categoryData = {
  FACE: ["Face Wash", "Face Serum", "Face Cream", "Face Mask"],
  HAIR: ["Shampoo", "Hair Oil", "Conditioner", "Hair Serum"],
  MAKEUP: ["Lipstick", "Kajal", "Compact", "Foundation"],
  BODY: ["Body Wash", "Body Lotion", "Soap", "Scrub"],
  BABY: ["Baby Lotion", "Baby Wash", "Baby Oil", "Baby Cream"],
  COMBOS: ["Skin Combo", "Hair Combo", "Glow Combo", "Gift Combo"],
  login:["Your Profile", "Your Order"]
};


  return (
    <>
    <div className="top-bar">
    Asia's 1st Brand with MADE SAFE Certified Products
    <span className="offer-text">
        OMG Sale Ends Tonight | Buy 1 Get 1 FREE | Use Coupon: OMG | Shop Now
    </span>
</div>

<div className="navbar">
    <div className="logo">mama<span>earth</span></div>


    <div className="search-box">
          <input
            type="text"
            value={searchKey}
            onChange={handleSearch}
            placeholder="Search for Vitamin C"
          />
          <button onClick={handleButtonSearch}>Search</button>
        </div>
    

    <div className="nav-right">
    
    <Link to="/cart" className="nav-item">
  <img src="/shopping-cart.png" alt="Cart" />
  <span>Cart</span>
   </Link>
    

   {isLogin ? (
  <div className="nav-item" onClick={handleLogout}>
    <img src="/login.png" alt="Logout" />
    <span>Logout</span>
  </div>
) : (
  <Link to="/login" className="nav-item">
    <img src="/login.png" alt="Login" />
    <span>Login</span>
</Link>
)}

<Link to="/Profile" className="nav-item">
    <img src="/8847419-profile.png" alt="Profile" />
    <span>Profile</span>
</Link>

<Link to="/Yorder" className="nav-item">
    <img src="/images-order.png" alt="order" />
    <span>Order</span>
</Link>

</div>
</div>


<div className="menu-bar">
  <div className="menu-link" onClick={() => navigate("/")}>HOME</div>

<div
  className="menu-item"
  onMouseEnter={() => setHoverMenu("HAIR")}
  onMouseLeave={() => setHoverMenu("")}
>
  <div className="menu-link">HAIR</div>

  {hoverMenu === "HAIR" && (
    <ul className="dropdown-menu">
      <li>Shampoo</li>
      <li>Hair Oil</li>
      <li>Conditioner</li>
      <li>Hair Serum</li>
    </ul>
  )}
</div>

<div
  className="menu-item"
  onMouseEnter={() => setHoverMenu("MAKEUP")}
  onMouseLeave={() => setHoverMenu("")}
>
  <div className="menu-link">MAKEUP</div>

  {hoverMenu === "MAKEUP" && (
    <ul className="dropdown-menu">
      <li>Lipstick</li>
      <li>Kajal</li>
      <li>Compact</li>
      <li>Foundation</li>
    </ul>
  )}
</div>

<div
  className="menu-item"
  onMouseEnter={() => setHoverMenu("BODY")}
  onMouseLeave={() => setHoverMenu("")}
>
  <div className="menu-link">BODY</div>

  {hoverMenu === "BODY" && (
    <ul className="dropdown-menu">
      <li>Body Wash</li>
      <li>Body Lotion</li>
      <li>Soap</li>
      <li>Scrub</li>
    </ul>
  )}
</div>

<div
  className="menu-item"
  onMouseEnter={() => setHoverMenu("BABY")}
  onMouseLeave={() => setHoverMenu("")}
>
  <div className="menu-link">BABY</div>

  {hoverMenu === "BABY" && (
    <ul className="dropdown-menu">
      <li>Baby Lotion</li>
      <li>Baby Wash</li>
      <li>Baby Oil</li>
      <li>Baby Cream</li>
    </ul>
  )}
</div>

<div
  className="menu-item"
  onMouseEnter={() => setHoverMenu("COMBOS")}
  onMouseLeave={() => setHoverMenu("")}
>
  <div className="menu-link">COMBOS</div>

  {hoverMenu === "COMBOS" && (
    <ul className="dropdown-menu">
      <li>Skin Combo</li>
      <li>Hair Combo</li>
      <li>Glow Combo</li>
      <li>Gift Combo</li>
    </ul>
  )}
</div>
<div
  className="menu-item"
  onMouseEnter={() => setHoverMenu("login")}
  onMouseLeave={() => setHoverMenu("")}
>
  <div className="menu-link">login</div>

  {hoverMenu === "login" && (
    <ul className="dropdown-menu">
      <li>Skin Combo</li>
      <li>Hair Combo</li>
      <li>Glow Combo</li>
      <li>Gift Combo</li>
    </ul>
  )}
</div>

<div className="menu-link">NEW LAUNCHES</div>
<div className="menu-link">INGREDIENT</div>
<div className="menu-link">ALL PRODUCTS</div>

</div>

<ImageCarousel images={images} />
</>


);
}
export default Navbar;
