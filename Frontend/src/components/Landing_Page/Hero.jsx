import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import videoCall from '../../logos/videoCall.jpg'
import { Button } from '../Button.jsx'
export const Hero = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        console.log("clicked");
        navigate('/Room');
    }
    return (
        <div className='flex justify-between'>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex flex-col justify-center text-center mb-3 hero-title'>
                    <h1 className='text-5xl mb-2'>Seamless <span style={{color:'#386fe7'}}>Video Calls</span></h1>
                    <h1 className='text-4xl mb-2'>Anytime, Anywhere</h1>
                </div>
                <Button title={"Get Started!"} onClick={handleClick}/>
            </div>
            <div>
                <motion.img
                    src={videoCall}
                    alt="Floating Image"
                    className="w-2xl rounded-3xl shadow-xl"
                    animate={{
                        y: [0, -10, 0], // Moves up and down
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                    }}
                />
                {/* <img src={videoCall} alt="" className='w-2xl rounded-3xl' /> */}
            </div>
        </div>
    )
}
