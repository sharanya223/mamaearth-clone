import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ManageProducts() {

  const [products, setProducts] = useState([]);
 
  

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {

      const res = await axios.get("https://mamaearth-clone-1-x7wj.onrender.com/manage-products");
      setProducts(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  //Delete
  const handleDelete = async (id) => {

    try {

      await axios.delete(`http://localhost:5000/delete-product/${id}`);

      alert("Product deleted successfully");

      fetchProducts();

    } catch (error) {
      console.log(error);
    }

  };

return (

    <div style={{ padding: "20px" }}>

      <h2>Manage Products</h2>

<table
        border="1"
        cellPadding="10"
        style={{ width: "100%", textAlign: "center" }}
      >

        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
           
          </tr>
        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product._id}>

              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>₹{product.price}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              

              <td>

                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                  width="60"
                />

              </td>

              <td>

                <Link to={`/update-products/${product._id}`}><button className="editbtn">Edit</button></Link>

                <button
                  className="deletebtn"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default ManageProducts;
