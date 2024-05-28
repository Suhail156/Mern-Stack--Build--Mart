import React, { useContext, useEffect, useState } from 'react'
import { User } from '../App'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Userside = () => {
    const{data}=useContext(User)
    const[user,setUser]=useState([])
    const nav=useNavigate()

 //view admin users
     useEffect(()=>{
      const fetchUsers=async()=>{
        const response=await axios.get("http://localhost:9025/api/admin/viewalluser")
        setUser(response.data)
        console.log(response.data);
      }
      fetchUsers()
     },[])
    console.log(user);
//userblock by admin
   
     const blockuser=async(id)=>{
      console.log(id,"idddddd");
      try {
        const response=await axios.delete(`http://localhost:9025/api/admin/${id}/block`)
        console.log(response.data,"block");
      } catch (error) {
        console.log(error);
      }
        
     }
      //useunblock by admin
      const unBlockuser=async(id)=>{
        console.log(id,"idddddd");
        try {
          const response=await axios.delete(`http://localhost:9025/api/admin/${id}/unblock`)
          console.log(response.data,"unblock");
        } catch (error) {
          console.log(error);
        }
          
       }
    

  return (
    <div>
         <div><Button onClick={()=>nav('/admin')}>Back to Admin</Button></div>

      {user.map((x,index)=>
        <table class="table table-striped">
  <thead>
    <tr>
    <th scope="col">name</th>
      <th scope="col">email</th>
      <th scope="col">username</th>
      
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
      <th scope="row">{x.name}</th>
      <td>{x.email}</td>
      <td>{x.username}</td>
  <Button onClick={()=>blockuser(x._id)} >Block</Button>
  <Button onClick={()=>unBlockuser(x._id)} >unBlock</Button>
      <td></td>
      <td></td>
    </tr>

       </table> 
      )}
    </div>
  )
}

export default Userside
