import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const Navbar = () => {
  const [currUser, setCurrUser] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/auth/user", {
          withCredentials: true, // ✅ Required for cookies
        });
        setCurrUser(res.data); // ✅ Set user state
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.warn("User not authenticated"); 
          setCurrUser(null); // ✅ Make sure to set user as null
        } else{
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [currUser]);
  const handleLogout = async () => {
    try {
      let result = await axios.get("http://localhost:8080/auth/logout", { withCredentials: true }); // Inform backend
      console.log("Fron navbar : ", result);
      localStorage.removeItem("googleMessage"); // Remove stored message
      toast.success(result.data.message);
      setCurrUser(null);
      navigate('/home');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  return (
    <>
      <nav className='sticky top-0 py-6 lg :py-4 sm:py-5 border-b border-neutral-700/80 z-1'>
        <div className="container px-4 mx-auto">
          <div className="flex justify-between">
            <div className='flex items-center'>
              <a className='text-2xl' href='/home'>😉 Let's Talk</a>
            </div>
            <div className="lg:flex justify-center space-x-10 items-center">
              {!currUser ? (
                <>
                  <Link to={'/signin'} className='border-2 px-3 py-2 rounded-lg'>Sign in</Link>
                  <Link to={'/login'} className='border-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-900 '>Log in</Link>
                </>
              ) : (
                < button className='cursor-pointer border-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-900 pointer' onClick={handleLogout}>Log Out</button>)
              }
            </div>
          </div>
        </div>
      </nav >
    </>
  )
}

export default Navbar