import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Address.css";

function Address() {
  const navigate = useNavigate();
  const location = useLocation();

  
  const data =
    location.state || JSON.parse(localStorage.getItem("checkoutData"));

  
  const [address, setAddress] = useState({
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  
  const handleNext = (e) => {
    e.preventDefault();

    const checkoutData = {
      ...data,
      address,
    };

 
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

    
    navigate("/payment", { state: checkoutData });
  };

  return (
    <div className="address-container">
      <h2>Delivery Address</h2>

      <form onSubmit={handleNext}>
        <input
          type="text"
          name="addressLine"
          placeholder="Full Address"
          value={address.addressLine}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={address.state}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={address.phone}
          onChange={handleChange}
          required
        />

        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
}

export default Address;