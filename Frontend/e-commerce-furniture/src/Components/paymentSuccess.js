import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userConfig } from "../Token/Config";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const navigate = useNavigate();
    // const OrderId=localStorage.getItem('orderId')
    const [orderId,setOrderId] = useState('')
    const [totalPrice,setTotalPrice] = useState('')
    console.log("Order_id:",orderId);
      
  //  console.log(OrderId,'orderid');
       

  useEffect(() => {
    let isSuccess = true;
      
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:9025/api/users/payment/success`, userConfig);
        setOrderId(response.data.orderId)
        setTotalPrice(response.data.totalPrice)
        // console.log("Response sg:",response);
        if (response.status === 200 && isSuccess) {
          toast.success("Payment successful");
        }
        // navigate("/");
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    const timeoutId = setTimeout(fetchData, 3000);

    return () => {
      isSuccess = false;
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img
          src="https://cdn.dribbble.com/users/253392/screenshots/6906291/check.gif"
          alt="Success"
          style={styles.image}
        />
        <h2 style={styles.message}>Payment Successful!</h2>
        <p>Order_Id: {orderId}</p>
        <p>Total Price: {totalPrice}</p>
        <p style={styles.description}>
          Thank you for your payment. You will be redirected to the homepage shortly.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    padding: '20px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  image: {
    width: '150px',
    height: '150px',
    marginBottom: '20px',
  },
  message: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: '10px',
  },
  description: {
    fontSize: '16px',
    color: '#6c757d',
  },
};

export default PaymentSuccess;
