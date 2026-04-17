import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdateProduct.css";

function UpdateProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {

    axios.get("http://localhost:5000/get-Product/" + id)
      .then(result => {

        const product = result.data;

        setName(product.name);
        setQuantity(product.quantity);
        setPrice(product.price);
        setCategory(product.category);
        setDescription(product.description);

        // show current image
        setPreview(`http://localhost:5000/uploads/${product.image}`);

      })
      .catch(err => console.log(err));

  }, [id]);



  const update = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    try {

      await axios.put(
        "http://localhost:5000/update-products/" + id,
        formData,
       
      );

      alert("Product updated successfully");

      navigate("/manage-products");

    } catch (error) {

      console.log(error);

    }

  };



  return (

    <div className="update-page">

      <div className="update-card">

        <h2>Update Product</h2>

        <form onSubmit={update}>

          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e)=>setQuantity(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="shampoo">Shampoo</option>
              <option value="face wash">Face Wash</option>
              <option value="conditioner">Conditioner</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />
          </div>


          
          <div className="form-group">
            <label>Current Image</label>

            {preview && (
              <img
                src={preview}
                alt="product"
                className="preview-img"
              />
            )}

          </div>


          
          <div className="form-group">
            <label>Update Image</label>
            <input
              type="file"
              onChange={(e)=>setImage(e.target.files[0])}
            />
          </div>


          <button className="update-btn">
            Update Product
          </button>

        </form>

      </div>

    </div>

  );

}

export default UpdateProduct;