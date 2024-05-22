import React, { useContext,useRef, useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import { User } from "../App"
import axios from "axios"


const Login = () => {
    const{data,use,setuse, setdata}=useContext(User)
    //  const inputref=useRef(null)
    const nav=useNavigate()
     const[email,setEmail]=useState('')
     const[password,setPassword]=useState('')
        const submithandler=async(e)=>{
          e.preventDefault()
          try {
            const response=await axios.post('http://localhost:9025/api/users/login',{
              email,password
            })
            if(response.status===200){
              console.log(response.data);
              nav('/')
            }
          } catch (error) {
            console.log(error.response.data.message);
          }
         
        }



    //  const submit= (e)=>{
    //   e.preventDefault()
    //       let name=inputref.current.name.value
    //       let password=inputref.current.password.value

    //        let userdata=data.find((item)=>item.name==name&&item.password==password)
    //        if(name=='suhail'&&password==1234){
    //           nav('/admin')
    //        }

    //        if(userdata)
    //      {
    //         setuse(userdata)
    //         nav('/') 
        
          
    //       }
    //  }
    //  console.log(use)
  return (
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


  <button type="submit" class="btn btn-primary btn-block mb-4" >Sign in</button>


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
  )
}

export default Login
