import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../App";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Toast } from "react-bootstrap";

const Singlepage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  // console.log(id, "hii");
  const { dummy, cart, setCart, data, use } = useContext(User);
  const nav = useNavigate();
  let single = dummy.find((item) => item._id === id);
  console.log(dummy, "this is dummy");


  //get by id
  useEffect(() => {
    
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:9025/api/users/products/${id}`);
          console.log(response, "ioeiio");
          setProduct(response.data.data);
        } catch (error) {
          console.log((error.response ? error.response.data.message : "Something went wrong"));
        } 
      };
      
      fetchProduct();
  }, [id]);
 
  console.log(product, "prod");

  const  name= localStorage.getItem("name")
  const userid=localStorage.getItem("id")
  console.log(use);
  // }
  console.log(single);
  const cartshow =async (id) => {

      const response=await axios.post(`http://localhost:9025/api/users/${userid}/cart/${id}`)
      if(response.status===200){
        console.log(response.data);
      
      }
  };
   


  return (
    <div>
      {/* <image src={single.image}/> */}
      {/* <h1></h1> */}
      <div className="d-flex" style={{ flexWrap: "wrap" }}>
        <div>
          <Card style={{ width: "30rem", marginLeft: "400px" }}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Title>{product.qty}</Card.Title>
              <Card>₹{product.price}</Card>

              <Button
                variant="primary"
                onClick={name?()=>cartshow(product._id) : () => nav("/login")}
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Singlepage;
