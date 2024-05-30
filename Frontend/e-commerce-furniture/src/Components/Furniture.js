import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { User } from '../App';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// import { userConfig } from '../Token/Config';

const Furniture = () => {
    const type = useParams()
    console.log("Types: ",type);    
    // const{search}=useContext(User)
    const[product,setProduct]=useState([])
    const nav=useNavigate()
    console.log("TYpe: ",type);
   
       
       useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://mern-stack-build-mart-nqt8.vercel.app/api/users/products");
                setProduct(response)
                // console.log("Response: ", response);
            } catch (error) {
                console.error("Error fetching products: ", error);
                setProduct([]); // Ensure product is an array even if there's an error
            }
       }
       fetchProducts()
    }, [])
      console.log("product c:",product.category);
      const filteredProducts = product.filter(p => p.category === type?.type)
    // console.log("FP",filteredProducts);
  return (
    <div className='d-flex' style={{ flexWrap:'wrap'}}>
      {filteredProducts.map((item)=>(
             <div key={item._id}>
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
        <Button   variant="primary" onClick={()=>nav(`/${item.category}/${item._id}`)}>Show</Button>
      </Card.Body>
    </Card>
         </div>
      ))}
       </div>
   
  )
}
  
export default Furniture