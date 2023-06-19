import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from './components/navbar/Navbar';
import LoginUser from './components/login/LoginUser';
import Home from './components/home/home';
import Signup from './components/signup/Signup';
import Explore from './components/explore/Explore';
import Publish from './components/publish/Publish';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Footer from './components/footer/Footer';

function App() {
  
  return (
    <div className='app'>
      {/* <h1>Connect React JS to Django</h1>
      <Button/>
      {
        inovators.map((inovator, i)=>{
          return (
            <div><h2>{inovator.name}</h2>
            <h2>{inovator.email}</h2>
            <a href={inovator.linkedin}>Linedin</a></div>
          )
        })
      } */}
      <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/explore' element = {<Explore/>} />
        <Route path='/publish' element = {<Publish/>} />
        <Route path='/login' element = {<LoginUser/>} />
        <Route path='/signup' element = {<Signup/>} />
      </Routes>
      <Footer/>
      </Router>
    </div>

  );
}

export default App;
