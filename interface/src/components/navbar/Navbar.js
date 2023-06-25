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
        <img src="http://localhost:8000/static/img/logo.png" className="logo" />
        <div className="name"><span style={{color:"rgb(16 103 173)"}}>Inova</span><span style={{color:"rgb(12 192 223)"}}>Tech</span></div>
      </div>
      <div className="navigations">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/">About</Link>
      </div>
      {Real_Boolean(localStorage.getItem("loggedin")) ? (
        <div className="sign">
          <Link to='/profile' className='signin'>Profile</Link>
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
