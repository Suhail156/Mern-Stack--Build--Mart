import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { People, BoxSeam, GraphUp } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex">
      <div className="bg-dark text-white p-3 vh-100" style={{ width: '250px' }}>
        <h2 className="text-center">Admin Dashboard</h2>
        <div className="mt-4">
          <Button 
            variant="dark" 
            className="w-100 text-start mb-3"     
            onClick={() => navigate('/userside')}
          >
            <People className="me-2"/> User Data
          </Button>
          <Button 
            variant="dark" 
            className="w-100 text-start mb-3" 
            onClick={() => navigate('/productside')}
          >
            <BoxSeam className="me-2"/> Product Side
          </Button>
          <Button 
            variant="dark" 
            className="w-100 text-start mb-3" 
            onClick={() => navigate('/revenue')}
          >
            <GraphUp className="me-2"/> Revenue Status
          </Button>
        </div>
      </div>
      <Container className="mt-5">
        <Row className="text-center">
          <Col>
            <h1>Hi Suhail</h1>
          </Col>
        </Row>
        <Row className="mt-4 justify-content-md-center">
          <Col md="auto">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => navigate('/userside')}
              className="mb-3"
            >
              User Data
            </Button>
          </Col>
          <Col md="auto">
            <Button 
              variant="success" 
              size="lg" 
              onClick={() => navigate('/productside')}
              className="mb-3"
            >
              Product Side
            </Button>
          </Col>
          <Col md="auto">
            <Button 
              variant="warning" 
              size="lg" 
              onClick={() => navigate('/revenue')}
              className="mb-3"
            >
              Revenue Status
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Admin;
