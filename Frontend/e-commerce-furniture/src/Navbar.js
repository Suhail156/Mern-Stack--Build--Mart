import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { User } from './App';
import { RiLogoutCircleRLine } from "react-icons/ri";
import axios from 'axios';
import { userConfig } from './Token/Config';


function CustomNavbar() {
    
const nav=useNavigate()
const{setsearch}=useContext(User)
const[data,setData]=useState([])
   
 const searchedinput=async(e)=>{
        e.preventDefault()
        let searching = e.target[0].value
      
             const response=await axios.get(`http://localhost:9025/api/users/products`,userConfig)
              console.log(response.data.data,'products');
               setData(response.data.data)
            let searched = data.filter((x)=>x.title.includes(searching))
            console.log(searched);
            if(searched[0]!==undefined){
                setsearch(searched)
                nav('/furniture')

            }
 }

 const logout =()=>{
     localStorage.clear()
     nav('/')
 }

  const name=localStorage.getItem("name")

    return (
        <div style={{}}>
            <div  style={{backgroundColor:'black'}}>
                <Navbar expand="lg" className="bg-body-dark" >
                    <Container fluid>

                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Form className="d-flex" onSubmit={searchedinput}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    
                                />
                                <Button type='submit' variant="outline-success" >Search</Button>
                            </Form>
                            <Navbar.Brand className='buil' style={{marginLeft:'350px',color:'white'}} >BUiLd MaRt</Navbar.Brand>
                            <Nav
                                className="me-auto my-2 my-lg-0 "
                                style={{ maxHeight: '100px',marginLeft:'500px'}}
                                navbarScroll 
                            > 
                                <Nav.Link style={{color:'white'}}  >
                                    {!name?<FaUser onClick={()=>nav('/login')} />:
                                    <><RiLogoutCircleRLine onClick={logout} />
                                    <span style={{color:'white'}}>{name}</span></>}</Nav.Link>
                                <Nav.Link style={{color:'white'}} onClick={()=>nav(name?`/cart`:'/login')} ><FaShoppingCart /></Nav.Link>
                            </Nav>
                                <Nav.Link style={{color:'white'}} onClick={()=>nav('/adminlogin')} ><FaUser /></Nav.Link>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <div style={{marginLeft:'400px'}} > 
                <Container >

                    <Nav className="me-auto "  >
                         <Nav.Link style={{color:'black'}} onClick={()=>nav('/')}>Home</Nav.Link>
                        <Nav.Link style={{color:'black'}} onClick={()=>nav('/sofa')}>Sofa</Nav.Link>
                        <Nav.Link style={{color:'black'}} onClick={()=>nav('/matresess')} >Mattresses</Nav.Link>
                        <Nav.Link  style={{color:'black'}} onClick={()=>nav('/decor')} >Home Decor</Nav.Link>
                        <Nav.Link style={{color:'black'}} onClick={()=>nav('/lamps')} >Lamps&Lighting</Nav.Link>
                        
                    </Nav>
                </Container>
            </div>
        </div>


    );
}

export default CustomNavbar;