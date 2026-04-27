import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ImageCarousel from "./ImageCarousel";

const images = [
  "/image1.avif",
  "/image2.avif",
  "/image3.avif"
];

function Navbar() {
  const navigate = useNavigate();

  const [searchKey, setSearchKey] = useState("");
  const [hoverMenu, setHoverMenu] = useState("");
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

  const handleButtonSearch = () => {
    if (searchKey.trim() === "") return;

    navigate(`/search/${searchKey}`);
  };

  const goCategory = (cat) => {
    navigate(`/search/${cat}`);
    setHoverMenu("");
  };

  const categoryData = {
    FACE: [
      { name: "Face Wash", value: "face-wash" },
      { name: "Sunscreen", value: "sunscreen" },
      { name: "Face Serum", value: "serum" },
      { name: "Face Cream", value: "face-cream" }
    ],

    HAIR: [
      { name: "Shampoo", value: "shampoo" },
      { name: "Hair Oil", value: "hair-oil" },
      { name: "Conditioner", value: "hair-conditioner" },
      { name: "Hair Serum", value: "hair-serum" }
    ],

    MAKEUP: [
      { name: "Lipstick", value: "lipstick" },
      { name: "Kajal", value: "kajal" },
      { name: "Compact", value: "compact" }
    ],

    BODY: [
      { name: "Body Wash", value: "body wash" },
      { name: "Body Lotion", value: "body lotion" },
      { name: "Soap", value: "soap" },
      { name: "Scrub", value: "scrub" }
    ],

    BABY: [
      { name: "Baby Shampoo", value: "baby shampoo" },
      { name: "Baby Wash", value: "baby wash" },
      { name: "Baby Soap", value: "baby soap" },
      { name: "Baby Oil", value: "baby oil" }
    ]
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
        <div className="logo" onClick={() => navigate("/")}>
          mama<span>earth</span>
        </div>

        <div className="search-box">
          <input
            type="text"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
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
            <img src="/images-order.png" alt="Order" />
            <span>Order</span>
          </Link>
        </div>
      </div>

      <div className="menu-bar">
        <div className="menu-link" onClick={() => navigate("/")}>
          HOME
        </div>

        {Object.keys(categoryData).map((mainCat) => (
          <div
            className="menu-item"
            key={mainCat}
            onMouseEnter={() => setHoverMenu(mainCat)}
            onMouseLeave={() => setHoverMenu("")}
          >
            <div className="menu-link">{mainCat}</div>

            {hoverMenu === mainCat && (
              <ul className="dropdown-menu">
                {categoryData[mainCat].map((item, index) => (
                  <li
                    key={index}
                    onClick={() => goCategory(item.value)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="menu-link">NEW LAUNCHES</div>

        <div className="menu-link">INGREDIENT</div>

        <div
          className="menu-link"
          onClick={() => navigate("/search/all")}
        >
          ALL PRODUCTS
        </div>
      </div>

      <ImageCarousel images={images} />
    </>
  );
}

export default Navbar;