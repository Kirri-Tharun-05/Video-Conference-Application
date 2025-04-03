import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import isAuth from '../utils/isAuth'
import Lottie from 'lottie-react'
import axios from 'axios';
import animation2 from '../assets/animation2.json'
import { toast } from 'react-toastify';
import server from '../environment';
function Room() {
  const navigate = useNavigate();
  const [roomID, setRoomId] = useState();
  const [userName, setUserName] = useState(null);

  const handleClick = () => {
    if (roomID != null) {
      axios.post(`${server}/history/addUserHistory`, { meeting_code: roomID }, { withCredentials: true })
        .then((res) => {
          console.log(res);
          setAddHistory(false);
        })
        .catch((e) => { console.log(e) })
      navigate(`/Room/${roomID}`);
    } else {
      toast.warning('Enter Room Id');
    }
  }

  // Fetch user details from session
  useEffect(() => {
    axios.get(`${server}/api/user`, { withCredentials: true }) // Send cookies with request
      .then((res) => setUserName(res.data.name))
      .catch(() => setUserName("Guest")); // If unauthorized, set default
  }, []);

  return (
    <div className="roomContent lg:px-5">
      <div>
        {userName !== null && <div className="opacity-0 fade-in work roomContainer sm:mt-5"> <h1 className='sm:text-5xl lg:text-6xl sm:text-center lg:text-start'>Hello <span className='text-blue-500 '>{userName}!</span></h1>
          <h1 className='text-2xl mt-5 sm:text-center lg:text-start sm:text-3xl'>Enter Your Room Id To Join</h1>
          <input type="text" name="" id="" placeholder='Enter Room Id' onChange={e => setRoomId(e.target.value)} className='roomId' required />
          <button type='submit' className='getStarted m-5 px-4 py-2 text-white font-bold transition-transform active:scale-90' onClick={handleClick}>
            Join
          </button>
        </div>
        }
      </div>
      <div className='animation'>
        <Lottie animationData={animation2} className='animation' />
      </div>
    </div>
  )
}

export default isAuth(Room);
// export default Room;
