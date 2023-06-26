import React from 'react'
import './Signup.css'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("loggedin") == 'true') {
            navigate("/");
        }
    }, [])
    async function Signup() {
        try {
            const data = {
                "name": document.getElementById('name').value,
                "email": document.getElementById('email').value,
                "phone": document.getElementById('phone').value,
                "linkedin": document.getElementById('linkedin').value,
                "password": document.getElementById('password').value,
            }
            if(document.getElementById('password').value===document.getElementById('cpassword').value){
                const body = JSON.stringify(data)
                const signup = await axios.post("https://inovatech-riosumit.vercel.app/signup", body)
                if (signup.data.status === "success") {
                    localStorage.setItem("loggedin", true)
                    localStorage.setItem("id", signup.data.data.id)
                    navigate("/");
                }
                else {
                    document.getElementsByClassName("error")[0].innerHTML = signup.data.msg;
                }
            }
            else {
                document.getElementsByClassName("error")[0].innerHTML = "Confirm Password Doesn't match";
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='signup'>
            <div className="box">
                <div className="boxhead">SignUp</div>
                <div className="boxcontent">
                    <div className="row">
                        <label htmlFor="name">Name :<br />
                            <input type="text" placeholder='Username' id='name' required />
                        </label>
                        <label htmlFor="email">E-mail :<br />
                            <input type="text" placeholder='E-mail' id='email' required />
                        </label>
                    </div>
                    <div className="row">
                        <label htmlFor="phone">Phone No. :<br />
                            <input type="text" placeholder='Phone Number' id='phone' required />
                        </label>
                        <label htmlFor="linkedin">Linkedin :<br />
                            <input type="text" placeholder='Linkedin' id='linkedin' required />
                        </label>
                    </div>
                    <div className="row">
                        <label htmlFor="password">Password :<br />
                            <input type="password" placeholder='Password' id='password' required />
                        </label>
                        <label htmlFor="cpassword">Confirm Password :<br />
                            <input type="password" placeholder='Confirm Password' id='cpassword' required />
                        </label>
                    </div>
                    <div className="error"></div>
                    <button className='submitbtn' onClick={Signup}>SignUp</button>
                    <p>Don't have an account? <Link to="/login">SignIn</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup
