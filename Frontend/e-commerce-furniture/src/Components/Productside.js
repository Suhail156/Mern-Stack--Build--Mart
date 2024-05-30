import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { adminConfig } from '../Token/Config';
import 'bootstrap/dist/css/bootstrap.min.css';

const Productside = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  // Admin view all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://backend-deploy-22gs.onrender.com/api/admin/allproducts", adminConfig);
        setProduct(response.data.data);
        console.log(response.data, "dd");
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  // Delete product handler
  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:9025/api/admin/${id}/delete`, adminConfig);
      console.log(response.data, "delete");
      setProduct(product.filter(item => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-4">
        <Button variant="primary" onClick={() => navigate('/admin')}>Back to Admin</Button>
        <Button variant="success" onClick={() => navigate('/addproduct')}>Add Product</Button>
      </div>
      <div className="row">
        {product.map((single) => (
          <div className="col-md-4 mb-4" key={single._id}>
            <Card>
              <Card.Img variant="top" src={single.image} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{single.title}</Card.Title>
                <Card.Text>Quantity: {single.quantity}</Card.Text>
                <Card.Text>Price: ₹{single.price}</Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="danger" onClick={() => deleteHandler(single._id)}>Remove</Button>
                  <Button variant="primary" onClick={() => navigate(`/editpage/${single._id}`)}>Edit</Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productside;
