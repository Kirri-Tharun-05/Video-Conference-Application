import React from 'react'
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
        <div className='my-80 flex flex-col items-center'>
            <h1 className='text-5xl text-center mb-10 work'>
                How It <span className='text-blue-500'>Works?</span>
            </h1>

            <div className="flex flex-col items-center space-y-4">
                {steps.map((step, index) => (
                    <div key={index} className="steps border p-4 rounded-lg shadow-md w-full max-w-lg text-center">
                        <h2 className="text-xl font-bold">
                            {`Step ${index + 1}:`}
                            <span className="font-semibold text-blue-500"> {step.title}</span>
                        </h2>
                        <p className="text-gray-400">{step.description}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Works;
