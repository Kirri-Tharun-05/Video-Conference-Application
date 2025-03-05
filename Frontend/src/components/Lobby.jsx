import React, { useEffect, useRef, useState } from 'react'

const server_URL = 'htpp://localhost:8080'

const peerConfigConnections = {
    'iceServers': [
        { 'urls': 'stun:stun.l.google.com:19302' }  // this is a Stun server used to extract the public ip address of the individual 
        // STUN server are lightweight servers running on the public internet which eturns the IP address of the requester's device. 
    ]
}
export default function Lobby() {

    var socketRef = useRef();
    let socketIdRef = useRef(); // Refers to current user socket id

    let localVideoRef = useRef(); // current user video

    let [videoAvailable, setVideoAvailable] = useState(true); // To store the permission for camara (video).
    let [audioAvailable, setAudioAvailable] = useState(true); // to store the perrmission for Mic (audio)

    let [video, setVideo] = useState(); // we will set the source for the video 

    let [audio, setAudio] = useState();// we will set the source for the audio

    let [screen, setScreen] = useState();// we will set the source for sharing the screen

    let [showModal, setShowModal] = useState();// 

    let [screenAvailable, setScreenAvailable] = useState(); // to set the screen share 

    let [messages, setMessages] = useState([]); // to set all messages

    let [message, setMessage] = useState();// to set the current user message

    let [newMessages, setNewMessages] = useState(0); // Fot the notification of new messages

    let [askForUsername, setAskForUsername] = useState(true);

    let [username, setUsername] = useState(); // to set the username

    const videoRef = useRef([]) // it will store the references of all videos of users

    let [videos, setVideos] = useState([]); // will store the videos

    const getPermissions = async () => {  // This function is to get the permissions for the video and audio
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoPermission) {
                setVideoAvailable(true);
            }
            else {
                setVideoAvailable(false);
            }
            
            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (audioPermission) {
                setAudioAvailable(true);
            }
            else {
                setAudioAvailable(false);
            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getPermissions();
    })
    return (
        <div>
            {askForUsername === true ? <div>
                <h2>Enter into Lobby</h2>
                <label htmlFor="username">Username</label>
                <input type="text" id='username' style={{ margin: '1rem', backgroundColor: 'white', color: 'white' }} />
                <button type='button' style={{ backgroundColor: 'gray', padding: '1rem', color: 'black' }}> join</button>
                <div>
                    <video ref={localVideoRef} autoPlay muted></video>
                </div>
            </div> : <>
                <h3>Not allowed</h3>
            </>}

        </div>
    );
}
