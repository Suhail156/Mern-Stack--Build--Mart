import axios from 'axios'
import React, { useEffect, useState } from 'react'

const RevenueGenrated = () => {
    const[order,setOrder]=useState([])
     const [revenue,setRevenue]=useState([])   

 //admin order details
        

       useEffect(()=>{
        const orderDetails=async()=>{
            try {
                const response=await axios.get(`http://localhost:9025/api/admin/allorders`)
                setOrder(response.data.data)
                console.log(response.data.data,"order");
            } catch (error) {
               console.log(error); 
            }
        }
        orderDetails()
       },[order])
   console.log(order);



      // admin revenue
       useEffect(()=>{
        const adminRevnue=async ()=>{
            try {
               const response=await axios.get(`http://localhost:9025/api/admin/status`) 
               setRevenue(response.data.data)
               console.log(response.data.data,"revenue");
            } catch (error) {
               console.log(error); 
            }
        }
        adminRevnue()
       },[revenue])
       console.log(revenue);
    

        




  return (
    <div>
       {order.map((x,index)=>
        <table class="table table-striped">
  <thead>
    <tr>
    <th scope="col">userid</th>
      <th scope="col">productid</th>
      <th scope="col">totalRevenue</th>
      
    </tr>
  </thead>
  {/* <tbody>
    <tr>
    <th scope="row">1</th>
    <td>Mark</td>
    <td>Otto</td>
    <td>@mdo</td>
    </tr>
  </tbody> */}
    <tr>
      <th scope="row">{x.userId}</th>
      <td>{x.productId}</td>
      <td>{x.totalPrice}</td>
      <td></td>
      <td></td>
    </tr>

       </table> 

)}
<div>
<div className="row mt-4">
        <div className="col-md-6">
            <h2>Total products Sold</h2>
            <h4>{revenue.totalProducts}</h4>
        </div>
        <div className="col-md-6">
            <h2>Total Revenue generated</h2>
            <h4>{revenue.totalRevenue}</h4>
        </div>
    </div>

</div>
    </div>
  )
}

export default RevenueGenrated
