import React, { useState } from 'react'
import gLogo from '../logos/google_logo.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import server from '../environment';
import { Button } from './Button';

const signin = () => {

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${server}/signin`, {
        username, password
      },{withCredentials:true});
      // console.log('Response :', result.data);
      localStorage.setItem('flashMessage', result.data.message);
      navigate('/home')
    }
    catch (e) {
      toast.error(e.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex flex-col text-center">
      <div className='mb-4 sm:pb-10 lg:pb-10'>
        <h1 className='text-5xl work'>Sign in</h1>
      </div>
      <div className='px-2'>
        <form action="" className='flex flex-col items-center' onSubmit={handleSubmit}>
          <div className=' my-5 lg:my-10 mx-10'>
            <label htmlFor="username" className=' sm:mr-10 lg:mr-10 text-2xl tracking-wide'>Username</label>
            <input type="text" id='username' className='border px-3 py-2 border-neutral-400 rounded' required onChange={(e) => { setusername(e.target.value) }} />
          </div>
          <div className='my-5 mx-10 '>
            <label htmlFor="password" className='sm:mr-10 lg:mr-12 tracking-wide text-2xl'>Password</label>
            <input type="password" id='password' className='border px-3 py-2 border-neutral-400 rounded' required onChange={(e) => { setpassword(e.target.value) }} />
          </div>
          <div className="mt-8 flex flex-col justify-center items-center gap-5">
            <div className=''>
              <button type="submit" className='px-3 py-2 rounded-lg  tracking-wide  border-white fon border-2 signin-btn work'>Sign in</button>
            </div>
            <div className="">
              <p>Or</p>
            </div>
            <div className=''>
              <button className='px-3 py-3 rounded-lg bg-gradient-to-r  tracking-wide text-1xl border-white fon border-2 g-btn' onClick={() => window.location.href = `${server}/auth/google`}><img src={gLogo} alt="" className='w-8 inline mx-2' />Sign in with Google</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default signin;