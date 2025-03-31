import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Flashlight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import server from './environment';
// import logo8 from './logos/logo1.png';
// import logo8 from './logos/logo2.png';
// import logo8 from './logos/logo3.png';
// import logo8 from './logos/logo4.png';
// import logo8 from './logos/logo8.png';
// import logo8 from './logos/logo8.png';
import logo7 from './logos/logo6.png';
// import logo7 from './logos/logo7.png';
const Navbar = () => {
  const [currUser, setCurrUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${server}/auth/user`, { withCredentials: true });
      setCurrUser(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        setCurrUser(null);
      } else {
        console.error("Error fetching user:", error);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = 'auto'; // Restore scrolling
    }

    return () => {
      document.body.style.overflow = 'auto'; // Cleanup on unmount
    };
  }, [isOpen]);
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    window.addEventListener("userLoggedIn", fetchUser);
    return () => window.removeEventListener("userLoggedIn", fetchUser);
  }, []);

  const handleHistory = () => navigate('/history');

  const handleLogout = async () => {
    try {
      let result = await axios.get(`${server}/auth/logout`, { withCredentials: true });
      localStorage.removeItem("googleMessage");
      toast.success(result.data.message);
      setCurrUser(null);
      navigate('/home');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSignIn = () => {
    setIsOpen(false);
    navigate('/signin');
  }
  const handleLogIn = () => {
    setIsOpen(false);
    navigate('/login');
  }
  return (
    <nav className='sticky top-0 py-4 border-b border-neutral-700/80 z-10 lg:px-6' style={{ background: 'linear-gradient(to right, #111827, #1f2937, #374151)' }}>
      <div className="container mx-auto px-4 flex justify-between items-center">

        {/* Logo */}
        <a href='/home' className='text-2xl'>
          <img src={logo7} alt="Logo" className="h-12" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-8 items-center">
          {!currUser ? (
            <>
              <button onClick={handleSignIn} className='border-2 py-2 rounded-lg text-white text-2xl px-3 menu menu-signin'>Sign in</button>
              <button onClick={handleLogIn} className='border-2 py-2 rounded-lg  text-white text-2xl px-3 menu menu-login'>Log in</button>
            </>
          ) : (
            <>
            <button onClick={handleHistory} className='border-2 py-2 rounded-lg text-white text-2xl px-3 menu menu-signin'>History</button>
            <button onClick={handleLogout} className='border-2 py-2 rounded-lg  text-white text-2xl px-3 menu menu-login'>Log Out</button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 lg:hidden shadow-md w-full left-0 top-16 p-4 flex justify-center items-center dropdown-menu"
          >
            <ul className="flex flex-col items-center justify-center space-y-4  text-gray-700">
              {!currUser ? (
                <>
                  <button onClick={handleSignIn} className='border-2 py-2 rounded-lg text-white text-2xl px-3 menu'>Sign in</button>
                  <button onClick={handleLogIn} className='border-2 py-2 rounded-lg bg-gradient-to-r text-white text-2xl px-3 menu menu-login'>Log in</button>
                </>
              ) : (
                <>
                  <button onClick={handleHistory} className="hover:text-orange-500 transition">History</button>
                  <button onClick={handleLogout} className='border-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-900 text-white'>Log Out</button>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
