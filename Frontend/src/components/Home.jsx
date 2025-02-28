import axios from 'axios';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
const Home = () => {
  useEffect(() => {
    // For google.signin
    if (!localStorage.getItem('googleMessage')) {
      axios.get("http://localhost:8080/auth/login/success", { withCredentials: true })
        .then((response) => {
          toast.success(response.data.message);
          localStorage.setItem("googleMessage", "true");
        })
        .catch((error) => {
          console.warn("Error:", error);
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