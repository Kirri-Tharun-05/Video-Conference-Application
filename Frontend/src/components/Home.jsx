import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
const Home = () => {
  useEffect(() => {
    // For google.signin
    const googleMessage = localStorage.getItem("googleMessage");
    if (!googleMessage) {
      axios.get("http://localhost:8080/auth/login/success", { withCredentials: true })
        .then((response) => {
          toast.success(response.data.message);
          localStorage.setItem("googleMessage", "true");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    // For Manual Sign in 
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

export default Home;