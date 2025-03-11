import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import isAuth from '../utils/isAuth'
import Lottie from 'lottie-react'
import axios from 'axios';
import animation2 from '../assets/animation2.json'
function Room() {
  const navigate = useNavigate();
  const [roomID, setRoomId] = useState();
  const handleClick = () => {
    navigate(`/Room/${roomID}`);
  }
  const [userName, setUserName] = useState("Guest");

  // Fetch user details from session
  useEffect(() => {
    axios.get("http://localhost:8080/api/user", { withCredentials: true }) // Send cookies with request
      .then((res) => setUserName(res.data.name))
      .catch(() => setUserName("Guest")); // If unauthorized, set default
  }, []);

  return (
    <div>
      <div className="roomContent">
        <div>
          <h1 className='text-3xl'>Hello {userName}!</h1>
          <h1 className='text-2xl'>Type Your Room Id</h1>
          <input type="text" name="" id="" placeholder='Enter Room Id' onChange={e => setRoomId(e.target.value)} className='roomId'/>
          <button type='button' onClick={handleClick}>Join</button>
        </div>
        <div>
          <Lottie animationData={animation2} className='animation' />
        </div>
      </div>
    </div>
  )
}

export default isAuth(Room);
