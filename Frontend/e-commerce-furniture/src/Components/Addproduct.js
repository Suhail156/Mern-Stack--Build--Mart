import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    image: null, // Note the change to handle file uploads
    quantity: '',
    category: '',
  });
  const navigate = useNavigate();


  const admintoken = localStorage.getItem("adminToken");
  console.log(admintoken, "token");


  const handleChange = (e) => {
    console.log(e.target);
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Save the file object
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', formData.title);
    form.append('price', formData.price);
    form.append('image', formData.image);
    form.append('description', formData.description);
    form.append('category', formData.category);

    try {
            

      const response = await axios.post("http://localhost:9025/api/admin/createProducts", form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data, 'add pr');
      navigate('/productside');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={addProduct}>
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />
      <input
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />
      <input
        type="file" // Change to file input
        name="image"
        onChange={handleChange}
      />
          <input
        name="description"
        placeholder="description"
        value={formData.description}
        onChange={handleChange}
      />
    
       <input
        name="category"
        placeholder="category"
        value={formData.category}
        onChange={handleChange}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
