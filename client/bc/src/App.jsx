// import { useState } from 'react'
// import viteLogo from '/vite.svg'
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
// import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css";
import React from "react";
import Signup from "./pages/Signup";

function App() {
  

  return (
    <>
     
      <Routes>
      <Route path='/' element={<Home />} />
      
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      </Routes>
      

    </>
  )
}

export default App
