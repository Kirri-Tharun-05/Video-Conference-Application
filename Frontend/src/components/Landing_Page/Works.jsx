import React from 'react'

function Works() {
    const steps = [
        {
            title: "Sign Up & Log In",
            description: "Create an account or log in securely using Google or email authentication.",
        },
        {
            title: "Start or Join a Meeting",
            description: "Create a new meeting and share the link, or join an existing one instantly.",
        },
        {
            title: "Collaborate in Real-Time",
            description: "Enjoy HD video, screen sharing, and in-meeting chat for seamless communication.",
        },
        {
            title: "End Meeting & Save Progress",
            description: "Leave anytime, and keep chat history & shared files accessible.",
        },
    ];
    return (
        <div className='my-80 flex flex-col items-center'>
            <h1 className='text-5xl text-center mb-20 work'>
                How It <span className='text-blue-500'>Works?</span>
            </h1>

            <div>
                {
                    steps.map((step, index) => (
                        <div key={index} className='steps'>
                            <p>{`Step : ${index+1}`}<span> {step.title}</span></p>
                            <p>{step.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Works;
