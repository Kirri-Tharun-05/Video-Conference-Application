import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import server from '../environment';
const Login = () => {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  
  const navigate=useNavigate();
  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
      const result= await axios.post(`${server}/login`,{
        username,password },{ withCredentials: true })
      console.log(result);
      localStorage.setItem('flashMessage', result.data.message);
      window.dispatchEvent(new Event("userLoggedIn"));
      navigate('/home')
    }
    catch(e){
      console.log(e);
       toast.error(e.response?.data?.message || 'Something went wrong');
    }
  }
  
  return (
    <div className="flex flex-col text-center justify-center">
      <div className='mb-15'>
        <h1 className='text-5xl work'>Log in</h1>
      </div>
      <div className='px-2 rounded-3xl'>
        <form onSubmit={handleSubmit} className='flex flex-col items-center'>
          <div className='lg:my-10 mx-10'>
            <label htmlFor="username" className='sm:mr-10 lg:mr-10 text-2xl tracking-wide'>Username</label>
            <input type="text" id='username' className='border px-3 py-2 border-neutral-400 rounded' onChange={(e)=>{setUsername(e.target.value)}}/>
          </div>
          <div className='my-5 mx-10'>
            <label htmlFor="password" className='sm:mr-12 lg:mr-12 tracking-wide text-2xl'>Password</label>
            <input type="password" id='password' className='border px-3 py-2 border-neutral-400 rounded' onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>
          <div className='mt-10'>
            <button type='submit' className='px-3 py-2 rounded-lg bg-gradient-to-r  tracking-wide text-2xl border-white fon border-2 mt-5 signin-btn work'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login