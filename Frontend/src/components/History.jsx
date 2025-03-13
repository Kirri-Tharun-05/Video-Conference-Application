import { useState } from "react";
import { useNavigate } from "react-router-dom";

const History = ({ meetings }) => {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
                <h2 className="text-xl font-semibold mb-4">Meeting History</h2>
                <ul className="space-y-2">
                    {meetings.map((meeting, index) => (
                        <li key={index} className="p-2 bg-gray-100 rounded-md">
                            <span className="font-medium">Room ID:</span> {meeting.roomId} <br />
                            <span className="font-medium">Date:</span> {meeting.date}
                        </li>
                    ))}
                </ul>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md w-full"
                    onClick={() => navigate(-1)} // Close popup
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default History;
