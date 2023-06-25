import React from 'react'
import './LoginUser.css'
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginUser = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("loggedin")=='true'){
      navigate("/");
    }
  },[])
  async function Login() {
    try {
      const data = {
        "email": document.getElementById('email').value,
        "password": document.getElementById('password').value,
      }
      const body = JSON.stringify(data)
      const check_login = await axios.post("https://inovatech-riosumit.vercel.app/api/login",body)
      if(check_login.data.found == "true"){
        console.log(123)
        localStorage.setItem("loggedin", true)
        localStorage.setItem("id", check_login.data.data.id)
        navigate("/");
      }
      else{
        document.getElementsByClassName("err")[0].innerHTML = check_login.data.msg;
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='login'>
      <div className="box">
        <div className="boxhead">SignIn</div>
        <div className="boxcontent">
          <label htmlFor="email">E-mail :<br />
            <input type="text" placeholder='E-mail' id='email' required />
          </label>
          <label htmlFor="password">Password :<br />
            <input type="password" placeholder='Password' id='password' required />
          </label>
          <div className="err"></div>
          <button className='submitbtn' onClick={Login}>LogIn</button>
          <p>Don't have an account? <Link to='/signup'>SignUp</Link></p>
        </div>
      </div>
    </div>
  )
}

export default LoginUser
