import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function PaymentSuccess() {
  const navigate = useNavigate();


  useEffect(() => {
    let isSuccess = true;

    const fetchData = async () => {
      try {

        const response = await axios.get(`http://localhost:9025/api/users/payment/success`);
        if (response.status === 200 && isSuccess) {
          alert("Payment successful");
          navigate("/");
        }
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
    <div className="payment-success d-flex justify-content-md-center">
      <img
        src="https://cdn.dribbble.com/users/253392/screenshots/6906291/check.gif"
        alt="Success"
      />
    </div>
  );
}

export default PaymentSuccess;