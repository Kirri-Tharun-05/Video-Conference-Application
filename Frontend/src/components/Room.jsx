import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import isAuth from '../utils/isAuth'
function Room(){
    const navigate=useNavigate();
    const [roomID,setRoomId]=useState();
    const handleClick=()=>{
        navigate(`/Room/${roomID}`);
    }
  return (
    <div>
        <h1>Hello User!</h1>
        <h1>Type Your Room Id</h1>
        <input type="text" name="" id="" placeholder='Enter Room Id' onChange={e=>setRoomId(e.target.value)}/>
        <button type='button' onClick={handleClick}>Join</button>
    </div>
  )
}

export default isAuth(Room);
