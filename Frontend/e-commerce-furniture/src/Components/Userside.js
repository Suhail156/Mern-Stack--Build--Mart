import React, { useContext, useEffect, useState } from 'react';
import { User } from '../App';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Userside = () => {
  const { data } = useContext(User);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  // View admin users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:9025/api/admin/viewalluser");
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  // Block user by admin
  const blockUser = async (id) => {
    console.log(id, "idddddd");
    try {
      const response = await axios.delete(`http://localhost:9025/api/admin/${id}/block`);
      console.log(response.data, "block");
    } catch (error) {
      console.log(error);
    }
  };

  // Unblock user by admin
  const unblockUser = async (id) => {
    console.log(id, "idddddd");
    try {
      const response = await axios.delete(`http://localhost:9025/api/admin/${id}/unblock`);
      console.log(response.data, "unblock");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Users Management</h1>
        <Button variant="primary" onClick={() => navigate('/admin')}>Back to Admin</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.map((x, index) => (
            <tr key={index}>
              <td>{x.username}</td>
              <td>{x.email}</td>
              <td>{x.username}</td>
              <td>
                <Button 
                  variant="danger" 
                  className="me-2" 
                  onClick={() => blockUser(x._id)}
                >
                  Block
                </Button>
                <Button 
                  variant="success" 
                  onClick={() => unblockUser(x._id)}
                >
                  Unblock
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Userside;
