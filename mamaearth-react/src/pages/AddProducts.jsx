import "./AddProducts.css";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddProducts() {

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
    category: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("quantity", form.quantity);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("description", form.description);
    formData.append("image", image);

   

    try {

      await axios.post(
        "https://mamaearth-clone-1-x7wj.onrender.com/save-product-details",
        formData
      );

      alert("Product added successfully!");
      //navigate("/AdminDashboard");

      setForm({
        name: "",
        quantity: "",
        price: "",
        category: "",
        description: ""
      
      });
      
      setImage(null);//state is cleared

      if (fileInputRef.current) {
      fileInputRef.current.value = "";//ui is cleared 
      }

    

    } catch (error) {

      console.log(error);
      alert("Error saving product");

    }
  };

  return (
    <div className="product-page">

      <div className="product-container">

        <span className="close-btn" onClick={() => navigate("/AdminDashboard")}>
          &times;
        </span>

        <div className="product-header">
          <h2>ADD PRODUCT</h2>
        </div>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Product Name*"
            className="product-input"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity*"
            className="product-input"
            value={form.quantity}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price*"
            className="product-input"
            value={form.price}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            className="product-input"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="shampoo">Shampoo</option>
            <option value="face-wash">Face Wash</option>
             <option value="sunscreen">Sunscreen</option>
            <option value="hair-conditioner">Hair Conditioner</option>
            <option value="face-cream">Face Cream</option>
            <option value="serum">Face Serum</option>
            <option value="hair-oil">Hair oil</option>
             <option value="hair-serum">Hair Serum</option>
             <option value="lipstick">Lipstick</option>
             <option value="kajal">Kajal</option>
             <option value="compact">Compact</option>
             <option value="body wash">Body Wash</option>
             <option value="body lotion">Body Lotion</option>
             <option value="soap">Soap</option>
             <option value="scrub">Scrub</option>
             <option value="baby shampoo">Baby Shampoo</option>
             <option value="baby wash">Baby Wash</option>
             <option value="baby soap">Baby Soap</option>
             <option value="baby oil">Baby Oil</option>
            
            
             
             
          </select>

          <textarea
            name="description"
            placeholder="Product Description"
            className="product-input"
            value={form.description}
            onChange={handleChange}
          />

         
          <input
            type="file"
            className="product-input"
            ref={fileInputRef}
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <button type="submit" className="product-btn">
            ADD PRODUCT
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddProducts;
