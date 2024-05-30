import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Furniture = () => {
  const { type } = useParams();
  console.log("Types: ", type);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://mern-stack-build-mart-nqt8.vercel.app/api/users/products");
        setProducts(response.data.data);
        console.log("response: ", response);
      } catch (error) {
        console.error("Error fetching products: ", error);
        setError(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => p.category === type);

  console.log("FP", filteredProducts);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching products: {error.message}</div>;
  }

  return (
    <div className='d-flex' style={{ flexWrap: 'wrap' }}>
      {filteredProducts.map((item) => (
        <div key={item._id}>
          <Card style={{ width: '18rem', marginLeft: '120px', marginTop: '30px' }}>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
              <Card>₹{item.price}</Card>
              {/* <Button variant="primary">Buy Now</Button> */}
              <Button variant="primary" onClick={() => navigate(`/${item.category}/${item._id}`)}>Show</Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Furniture;
