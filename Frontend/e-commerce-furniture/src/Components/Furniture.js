import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { userConfig } from '../Token/Config';

const Furniture = () => {
    const { type } = useParams();
    const [product, setProduct] = useState([]);
    const nav = useNavigate();

    console.log(userConfig);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://mern-stack-build-mart-nqt8.vercel.app/api/users/products", userConfig);
                setProduct(response.data.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = product ? product.filter((product) => product.category === type) : [];
    console.log(filteredProducts);

    return (
        <div className='d-flex' style={{ flexWrap: 'wrap' }}>
            {filteredProducts.map((item) => (
                <div key={item._id}>
                    <Card style={{ width: '18rem', marginLeft: '120px', marginTop: '30px' }}>
                        <Card.Img variant="top" src={item.image} />
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Card>₹{item.price}</Card>
                            {/* <Button variant="primary">Buy Now</Button> */}
                            <Button variant="primary" onClick={() => nav(`/${item.category}/${item._id}`)}>Show</Button>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default Furniture;
