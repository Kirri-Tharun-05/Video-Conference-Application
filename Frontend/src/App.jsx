import { useState } from 'react'
import React from 'react';
import Navbar from './Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/Signin';
import LogIn from './components/Login'
import Home from './components/Home';
import Room from './components/Room';
import PageNotFound from './components/PageNotFound';
import Lobby from './components/Lobby';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/Room' element={<Room />} />
          <Route path='/Room/:url' element={<Lobby/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
