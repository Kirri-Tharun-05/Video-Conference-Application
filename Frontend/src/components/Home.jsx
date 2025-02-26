import React from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
const Home = () => {
  useEffect(() => {
    const message = localStorage.getItem('flashMessage'); // ✅ Retrieve from localStorage
    if (message) {
      toast.success(message);
      localStorage.removeItem('flashMessage'); // ✅ Remove after showing
    }
  }, []);
  return (
    <div>Home</div>
  )
}

export default Home