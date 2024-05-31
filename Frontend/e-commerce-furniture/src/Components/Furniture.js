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
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const nav = useNavigate();

    console.log(userConfig);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://backend-deploy-22gs.onrender.com/api/users/products", userConfig);
                setProduct(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products: ", error);
                setError(error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching products: {error.message}</div>;
    }

    const filteredProducts = product.filter((product) => product.category === type);
    console.log(filteredProducts);

    return (
        <div className='d-flex' style={{ flexWrap: 'wrap' }}>
            {(type === undefined ? search : filteredProducts).map((item) => (
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
                            <Button variant="primary" onClick={() => nav(`/${item.category}/${item._id}`)}>Show</Button>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default Furniture;
