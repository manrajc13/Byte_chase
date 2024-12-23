// import { useState } from 'react'
// import viteLogo from '/vite.svg'
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
// import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css";
import React from "react";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";

function App() {
  

  return (
    <>
     
      <Routes>
      <Route path='/' element={<Home />} />
      
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/contact' element={<Contact />} />
      </Routes>
      

    </>
  )
}

export default App
