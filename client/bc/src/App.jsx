// import { useState } from 'react'
// import viteLogo from '/vite.svg'
import { Routes, Route } from "react-router-dom"; 
// import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css";
import React from "react";
import Signup from "./pages/Signup";
// import Cheat from "./pages/Cheat";
import Quiz from "./pages/Quiz";
import Review from "./pages/Review";


function App() {
  

  return (
    <>
     
      <Routes>
      <Route path='/' element={<Home />} />
      
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      {/* <Route path='/cheat' element={<Cheat />} /> */}
      <Route path='/quiz' element={<Quiz />} />
      <Route path='/review' element={<Review />} />
      
      </Routes>
      

    </>
  )
}

export default App
