import React from 'react';
import { motion } from 'framer-motion';

function Works() {
    const steps = [
        {
            title: "Sign Up & Log In",
            description: "Create an account or log in securely using Google or email authentication.",
        },
        {
            title: "Start or Join a Meeting",
            description: "Create a new meeting and share the Room Id, or join an existing one instantly.",
        },
        {
            title: "Collaborate in Real-Time",
            description: "Enjoy HD video, screen sharing, and in-meeting chat for seamless communication.",
        },
    ];

    return (
        <div className='mt-70 flex flex-col items-center'>
            <motion.h1
                className='text-5xl text-center mb-10 work'
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                How It <span className='text-blue-500'>Works?</span>
            </motion.h1>
            <div className="flex flex-col items-center space-y-6">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        className="steps border p-6 rounded-lg shadow-md w-full max-w-lg text-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                        <h2 className="text-xl font-bold">
                            {`Step ${index + 1}:`}
                            <span className="font-semibold text-blue-500"> {step.title}</span>
                        </h2>
                        <p className="text-gray-400">{step.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default Works;