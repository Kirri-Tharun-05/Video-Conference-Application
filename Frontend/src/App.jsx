import { useState } from 'react'
import React from 'react';
import Navbar from './Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/Signin';
import LogIn from './components/Login'
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/login' element={<LogIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
