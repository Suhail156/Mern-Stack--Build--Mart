  import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../App'
import axios from 'axios'
// import { Nav } from 'react-bootstrap'
 
const Signup = () => {
    const{data,setdata}=useContext(User)
    const inputref=useRef()
      
//      const submithandler=()=>{
//       let username=inputref.current.username.value
//       let email=inputref.current.email.value
//       let password=inputref.current.password.value
//       let repassword=inputref.current.repassword.value
//         if(password===repassword){
//           setdata([...data,{name:username,email:email,password:password,cart:[]}])
//           nav('/login')
//         }else{
//           alert('sorry password is not match')
//         }
//      }
//  console.log(data);
//    const nav=useNavigate()
      const[username,setUsername]=useState('')
      const[email,setEmail]=useState('')
      const[password,setPassword]=useState('')
        const nav=useNavigate()
      const handlesubmit=async(e)=>{
         e.preventDefault()
         try {
          const response=await axios.post('http://localhost:9025/api/users/signup',{
            username,email,password
          })
          console.log(response);
          if(response.status===201){
            console.log(response.data.data);
            nav('/login')
          }
         } catch (error) {
          alert(error.response.data.message)
         }
      }
    
  return (
    <div>
   <section>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100" >
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" >
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form class="mx-1 mx-md-4"  onSubmit={handlesubmit}>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" class="form-control"  onChange={(e)=>setUsername(e.target.value)}  />
                      <label class="form-label" for="form3Example1c">Your Name</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" class="form-control" onChange={(e)=>setEmail(e.target.value)} />
                      <label class="form-label" for="form3Example3c">Your Email</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c"   class="form-control" onChange={(e)=>setPassword(e.target.value)} />
                      <label class="form-label" for="form3Example4c">Password</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd"  class="form-control"  />
                      <label class="form-label" for="form3Example4cd">Repeat your password</label>
                    </div>
                  </div>

                  <div class="form-check d-flex justify-content-center mb-5">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label class="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <input type="submit" class="btn btn-primary btn-lg" value="Register"/>
                  </div>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

               

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Signup
