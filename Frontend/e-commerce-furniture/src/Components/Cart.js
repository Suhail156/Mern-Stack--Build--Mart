
import { useNavigate} from 'react-router-dom'
import { User } from '../App'
import Button from 'react-bootstrap/Button';




import React,{useContext, useEffect, useState} from 'react';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import axios from 'axios';

const Cart = () => {
    
    
    const{ use,render,setrender}=useContext(User)
    const[cartProduct,setCartProduct]=useState([])
    
      const nav=useNavigate()

      const userId=localStorage.getItem("id")
   

      //user view thier cart
       
         useEffect(()=>{
          const fetchProduct=async ()=>{
            const response=await axios.get(`http://localhost:9025/api/users/${userId}/cart`) 
            setCartProduct(response.data)
          }
          fetchProduct()
         },[userId])
         console.log(cartProduct,"cart");




         
         
         //cart product increment

      const increment=async(id)=>{
        console.log(id,"iddd");
        try {
          const response=await axios.patch(`http://localhost:9025/api/users/${userId}/cart/${id}/increment`)
            console.log(response.data,"increment")
        } catch (error) {
          console.log(error);
        }
      }
      //decrement
      const decrement=async(id)=>{
      try {
        const response=await axios.patch(`http://localhost:9025/api/users/${userId}/cart/${id}/decrement`)
          console.log(response.data);
      } catch (error) {
        console.log(error);
      }
         }
  
      
       const deletehandler=async(id)=>{
        // const filterdata=use.cart.filter((item)=>item.id !== parseInt(id))
         console.log(id,"iddddd");
        // use.cart = filterdata
        try {
             const response=await axios.delete(`http://localhost:9025/api/users/${userId}/cart/${id}/remove`)
               console.log(response.data,"hiifg");

        } catch (error) {
          console.log(error);
        }
       
       }
   
       const handlepay = async()=>{

        if(cartProduct.length !==0){
  
        
  
        const response =await axios.post(`http://localhost:9025/api/users/${userId}/payment`,{})
        const url=response.data.url
        const confirmation = window.confirm("payment gateway is redirecting do you want to continue")
        if(confirmation)window.location.replace(url)
  
  
        console.log(response.data.url,"url of stripe payment");
       nav("/payment")
      }
      else{
        alert('please add some product')
      }
    }
  
         


       
  return (
    <div>
      <h3>My Cart</h3>
      {cartProduct?.map((single)=>(
    <MDBCard style={{ maxWidth: '1540px' }}>
    <MDBRow className='g-0'>
      <MDBCol md='4'>
        <MDBCardImage src={single.productId.image} alt='...' fluid />
      </MDBCol>
      <MDBCol md='8'>
        <MDBCardBody>
          <MDBCardTitle> {single.productId.title}</MDBCardTitle>
          <MDBCardText>
             {single.quantity}
          </MDBCardText>
          <MDBCardText>
          ₹{single.productId.quantity*single.productId.price}
          </MDBCardText>
          {/* <MDBCardText>
            <small className='text-muted'>Last updated 3 mins ago</small>
          </MDBCardText> */}
          <Button  onClick={()=>increment(single.productId._id)}>+</Button>
             <Button  onClick={()=>decrement(single.productId._id)}>-</Button>
            <Button  variant="primary" onClick={()=>handlepay(userId)}>Payment</Button>
          <br/> <br/>
          <Button className='bg-danger' onClick={()=>deletehandler(single.productId._id)}>Remove</Button>
        </MDBCardBody>
      </MDBCol>
    </MDBRow>
  </MDBCard>
  )) }
  <div>  <h1>
                Total:
                {cartProduct.reduce(
                  (acc, item) => (acc += item.productId.price * item.quantity),
                  0
                )}
              </h1></div>
  </div>
 )
 }
 export default Cart
 