import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { adminConfig } from '../Token/Config';
import 'bootstrap/dist/css/bootstrap.min.css';

const RevenueGenerated = () => {
  const [order, setOrder] = useState([]);
  const [revenue, setRevenue] = useState({ totalProducts: 0, totalRevenue: 0 });

  // Fetch admin order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get('http://localhost:9025/api/admin/allorders', adminConfig);
        setOrder(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderDetails();
  }, []);

  // Fetch admin revenue details
  useEffect(() => {
    const fetchAdminRevenue = async () => {
      try {
        const response = await axios.get('http://localhost:9025/api/admin/status', adminConfig);
        setRevenue(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdminRevenue();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Revenue and Orders</h1>
      <div className="row">
        <div className="col-md-12">
          <h2>Order Details</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">User ID</th>
                <th scope="col">Product ID</th>
                <th scope="col">Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {order.map((x, index) => (
                <tr key={index}>
                  <th scope="row">{x.userId}</th>
                  <td>{x.productId}</td>
                  <td>{x.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6 text-center">
          <div className="card">
            <div className="card-body">
              <h2>Total Products Sold</h2>
              <h4>{revenue.totalProducts}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-6 text-center">
          <div className="card">
            <div className="card-body">
              <h2>Total Revenue Generated</h2>
              <h4>{revenue.totalRevenue}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueGenerated;

