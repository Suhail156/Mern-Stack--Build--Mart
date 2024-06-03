import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { User } from '../App';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { userConfig } from '../Token/Config';

const Furniture = () => {
  const { type } = useParams();
  const { search } = useContext(User);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://backend-deploy-22gs.onrender.com/api/users/products`);    //usrconfig
        setProducts(response.data.data || []);
      } catch (err) {
        console.error("Error fetching products: ", err);
      } 
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => product.category === type);


  const productsToDisplay = type === undefined ? search : filteredProducts;

  return (
    <div className='d-flex' style={{ flexWrap: 'wrap' }}>
      {productsToDisplay.map((item) => (
        <div key={item._id}> {/* Add a unique key prop */}
          <Card style={{ width: '18rem', marginLeft: '120px', marginTop: '30px' }}>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
              <Card>₹{item.price}</Card>
              <Button variant="primary" onClick={() => navigate(`/${item.category}/${item._id}`)}>Show</Button>
            </Card.Body>
          </Card>
        </div>
      
      ))}
    </div>
    
  );
  
};

export default Furniture;
