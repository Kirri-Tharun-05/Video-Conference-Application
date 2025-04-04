import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import isAuth from "../utils/isAuth";
import server from "../environment";

const History = () => {
    const [meetings, setMeetings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${server}/history/getUserHistory`, { withCredentials: true })
            .then((res) => {
                // console.log(res.data);
                setMeetings(res.data);
            })
            .catch((e) => { console.log(e) })
    }, []);
    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    return (
        <div className="">
            <div className="history">
                <div className="bg-white p-6 rounded-2xl shadow-xl w-96  flex flex-col border-4 border-blue-500" style={{ maxHeight: '80%' }}>
                    <h2 className="text-xl font-semibold mb-4 text-black text-center">Meeting History</h2>
                    <div className="historyList">
                        <ul className="space-y-2">
                            {meetings.map((meeting, index) => (
                                <li key={index} className="p-2 bg-gray-100 rounded-md border-2 border-blue-500 historyListItem">
                                    <p className="text-black font-medium">Room Id : {meeting.meeting_code}</p>
                                    <p className="text-black font-medium">Date : {formatDate(meeting.date)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <button className="mt-4 px-4 py-2 text-white rounded-md w-full historyBtn text-2xl" style={{ background: '#386fe7' }} onClick={() => navigate(-1)}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default isAuth(History);
