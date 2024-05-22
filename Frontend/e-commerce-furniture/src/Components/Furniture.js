import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { User } from '../App';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Furniture = () => {
    const {type} =useParams()
    const{search}=useContext(User)
    const[product,setProduct]=useState([])
    const nav=useNavigate()
       
    useEffect(() => {
       const fetchProducts = async () => {
            const response = await axios.get("http://localhost:9025/api/users/products")
              setProduct(response.data.data)
       }
       fetchProducts()
    }, [])
  
    const filteredProducts = product.filter((product) => product.category === type);
    console.log(filteredProducts);
  return (
    <div className='d-flex' style={{ flexWrap:'wrap'}}>
      {(type===undefined?search:filteredProducts).map((item)=>(
             <div>
              <Card style={{ width: '18rem',marginLeft:'120px',marginTop:'30px'}}>
      <Card.Img variant="top" src={item.image} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card>₹{item.price}</Card>
        {/* <Button   variant="primary">Buy Now</Button> */}
        <Button   variant="primary" onClick={()=>nav(`/${item.category}/${item.id}`)}>Show</Button>
      </Card.Body>
    </Card>
         </div>
      ))}
       </div>
   
  )
}
  
export default Furniture



