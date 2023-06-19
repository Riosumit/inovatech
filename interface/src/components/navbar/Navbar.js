import React, { useState } from 'react';
import { useEffect } from "react";
import './Navbar.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [nav, setnav] = useState(0)
  function logout(){
    localStorage.setItem("loggedin", false);
    localStorage.setItem("id", null);
    setnav(nav+1)
  }
  function Real_Boolean(s){
    if(s=='true'){
      return true
    }
    else{
      return false
    }
  }
  return (
    <div className="nav">
      <div className="title">
        <div className="logo"></div>
        <div className="name"><span style={{color:"#C01B1B"}}>Inova</span><span style={{color:"#43CCA3"}}>Tech</span></div>
      </div>
      <div className="navigations">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/">About</Link>
      </div>
      {Real_Boolean(localStorage.getItem("loggedin")) ? (
        <div className="sign">
          <Link to='' className='signin'>Profile</Link>
          <Link to='' className='signup' onClick={logout}>Logout</Link>
        </div>
      ):(
        <div className="sign">
          <Link to='/login' className='signin'>SignIn</Link>
          <Link to='/signup' className='signup'>SignUp</Link>
        </div>
      )}
    </div>
  )
}

export default Navbar
