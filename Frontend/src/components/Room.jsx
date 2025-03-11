import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import isAuth from '../utils/isAuth'
import Lottie from 'lottie-react'
import animation1 from '../assets/animation1.json'
function Room() {
  const navigate = useNavigate();
  const [roomID, setRoomId] = useState();
  const handleClick = () => {
    navigate(`/Room/${roomID}`);
  }
  return (
    <div>
      <div className="roomContent">
        <div>
          <h1 className='text-3xl'>Hello User!</h1>
          <h1 className='text-2xl'>Type Your Room Id</h1>
          <input type="text" name="" id="" placeholder='Enter Room Id' onChange={e => setRoomId(e.target.value)} className='roomId'/>
          <button type='button' onClick={handleClick}>Join</button>
        </div>
        <div className="">
          <Lottie animationData={animation1}/>
        </div>
      </div>
    </div>
  )
}

export default isAuth(Room);
