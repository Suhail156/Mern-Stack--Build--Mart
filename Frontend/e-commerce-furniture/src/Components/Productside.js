import React, { useEffect, useState } from 'react'
import { User } from '../App'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';



const Productside = () => {
    const nav=useNavigate()
    const {id}=useParams()
    const[product,setProduct]=useState([])
         
//admin view all products
      useEffect(()=>{
         const fetchProducts=async()=>{
            const response=await axios.get("http://localhost:9025/api/admin/allproducts")
            setProduct(response.data.data)
            console.log(response.data,"dd");
         }
         fetchProducts()
      },[])
  //


   console.log(product);
          
    const deletehandler=async(id)=>{
      try {
         const response=await axios.delete(`http://localhost:9025/api/admin/${id}/delete`)

         console.log(response.data,"delete");
      } catch (error) {
         console.log(error);
      }
          }
       
      

  return (
 <div>   
        <div style={{marginRight:'1000px'}}><Button onClick={()=>nav('/admin')}>Back to Admin</Button></div>
             <div ><Button  onClick={()=>nav('/addproduct')}>Add Product</Button></div>
              
      {product.map((single)=>(

   <div style={{display:"inline-block"}}>
    <Card style={{width: '33rem',marginLeft:'50px',marginTop:'30px'}}>
    <Card.Img variant="top" src={single.image} />
    <Card.Body>
    <Card.Title >{single.title}</Card.Title>
    <Card.Title>{single.quantity}</Card.Title>
    <Card.Title>₹{single.price}</Card.Title>
    <br/> <br/>
    <Button onClick={()=>deletehandler(single._id)}>Remove</Button>
     <Button onClick={()=>nav(`/editpage/${single._id}`)} >Edit</Button>
     <br/>
    


    </Card.Body>
    </Card>
   </div>
                          ))}
 
</div>
      )  
   }

export default Productside







