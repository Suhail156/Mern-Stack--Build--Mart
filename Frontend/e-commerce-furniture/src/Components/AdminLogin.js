import React, {  useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import axios from "axios"

const AdminLogin = () => {

    const nav=useNavigate()
     const[email,setEmail]=useState('')
     const[password,setPassword]=useState('')
        const submithandler=async(e)=>{
          e.preventDefault()
          try {
            const response=await axios.post('http://localhost:9025/api/admin/login',{
              email,password
            })
            if(response.status===200){
                const AdminData=response.data
                console.log(response ,"hiii");
              localStorage.setItem("adminToken",AdminData.token)
              nav('/admin')
            }
          } catch (error) {
            console.log(error.response.data.message);
          }
         
        }
          

  return (
    <div>
      <div style={{height:"100vh", width:"100%", display:"flex", justifyContent:"center", alignItems:"center"} } >
   <div style={{width:'400px',height:"400px" ,border:"1px solid black", padding:"40px", borderRadius:"20px"}}>
   <form  onSubmit={submithandler}>
 
  <div class="form-outline mb-4">
    <input type="name" id="form2Example1" class="form-control" onChange={(e)=>setEmail(e.target.value)} />
    <label class="form-label" for="form2Example1">Email</label>
  </div>


  <div class="form-outline mb-4">
    <input type="password" id="form2Example2" class="form-control" onChange={(e)=>setPassword(e.target.value)}  />
    <label class="form-label" for="form2Example2">Password</label>
  </div>

  <div class="row mb-4">
    <div class="col d-flex justify-content-center">

      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked required/>
        <label class="form-check-label" for="form2Example31"> Remember me </label>
      </div>
    </div>

    <div class="col">

      <a href="#!">Forgot password?</a>
    </div>
  </div>


  <button type="submit" class="btn btn-primary btn-block mb-4" >Admin Sign in</button>


  <div class="text-center">
    <p>Not a member? <a href="#!"><Link to={"/signup"} >Register</Link></a></p>
    {/* <p>or sign up with:</p> */}
    {/* <button type="button" class="btn btn-link btn-floating mx-1">
      <i class="fab fa-facebook-f"></i>
    </button> */}
{/* 
    <button type="button" class="btn btn-link btn-floating mx-1">
      <i class="fab fa-google"></i>
    </button>

    <button type="button" class="btn btn-link btn-floating mx-1">
      <i class="fab fa-twitter"></i>
    </button>


    <button type="button" class="btn btn-link btn-floating mx-1" >
      <i class="fab fa-github"></i>
    </button> */}
   
  </div>
</form >
   </div>
   </div>
    </div>
  )
}

export default AdminLogin
