import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const Editpage = () => {
  const { id } = useParams();
  console.log(id)
  const titleref = useRef(null);
  const priceref = useRef(null);
  const descriptionRef = useRef(null); // Assuming you have a description field
  const imageRef = useRef(null); // Reference for the image input
  const categoryref=useRef(null)
  const nav = useNavigate();

  const admintoken = localStorage.getItem("adminToken");
  console.log(admintoken, "token");

  const [editdata, setEditdata] = useState({
    title: "",
    price: "",
    description: "", // Assuming you have a description field
    image: "",
    category:"" // Image URL or file placeholder
  });

  // Fetch the product details when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Athourization: admintoken,
          },
        };
        const response = await axios.get(
          `http://localhost:9025/api/admin/${id}/product`,
          config
        );
        if (response.data === "success") {
          setEditdata({
            title: response.data.data.title,
            price: response.data.data.price,
            description: response.data.data.description,
            image: response.data.data.image,
            category:response.data.data.category
          });
          console.log(editdata,"editda");
        } else {
          console.error("Failed to fetch product:", response.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const edithandler = async () => {
    const updatetitle = titleref.current.value;
    const updateprice = priceref.current.value;
    const updatecategory=categoryref.current.value;
    const updateDescription = descriptionRef.current.value;
    const updateImage = imageRef.current.files[0]; // Get the file from input

    const formData = new FormData();
    formData.append("title", updatetitle);
    formData.append("price", updateprice);
    formData.append('category', updatecategory);
    formData.append("description", updateDescription);
    formData.append("image", updateImage); // Append the image file

    try {
      const response = await axios.patch(
        `http://localhost:9025/api/admin/${id}/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "success") {
        console.log("Product updated", response.data);
        nav("/productside");
      } else {
        console.error("Error updating product:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <label>Edit Title:</label>
      <input type="text" defaultValue={editdata.title} ref={titleref} />
      <br />
      <label>Edit Price:</label>
      <input type="text" defaultValue={editdata.price} ref={priceref} />
      <br />
      <label>Edit category:</label>
            <input type='text' defaultValue={editdata.category} ref={categoryref} />
            <br />
      <label>Edit Description:</label>
      <input
        type="text"
        defaultValue={editdata.description}
        ref={descriptionRef}
      />
      <br />
      <label>Edit Image:</label>
      <input type="file" ref={imageRef} />
      <br />
      <br />
      <Button onClick={edithandler}>Enter</Button>
    </div>
  );
};

export default Editpage;
