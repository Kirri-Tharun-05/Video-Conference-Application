import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
const server_URL = 'http://localhost:8080'

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

    let [video, setVideo] = useState([]); // we will set the source for the video 

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
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true }); // getting user permission for video
            if (videoPermission) {
                setVideoAvailable(true);
            }
            else {
                setVideoAvailable(false);
            }

            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true }); // getting user permission for audio
            if (audioPermission) {
                setAudioAvailable(true);
            }
            else {
                setAudioAvailable(false);
            }

            if (navigator.mediaDevices.getDisplayMedia) {
                setScreenAvailable(true);
            }
            else {
                setScreenAvailable(false);
            }
            if (videoAvailable || audioAvailable) { // from here we will get the stream that we will send to different users through WEB RTC
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable })

                if (userMediaStream) {
                    window.localStream = userMediaStream;
                    if (localVideoRef.current) {
                        localVideoRef.current.srcObject = userMediaStream;
                    }
                }
            }

        } catch (e) {
            console.log(e);
        }
    }

    let getUserMediaSuccess = (stream) => {

    }

    let getUserMedia = () => {  // this function is to handle the video and audio controlles
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess) // getUserMediaSuccess
                .then((stream) => { })
                .catch((e) => { console.log(e) })
        } else {
            try {
                let tracks = localVideoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop())
            } catch (e) { }
        }
    }
    useEffect(() => {
        getPermissions();
    })

    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia()
        }
    }, [audio, video]);

    // todo addMessage
    let addMessage=()=>{

    }

    let connectToSocketServer = () => {
        socketRef.current = io.connect(server_URL, { secure: false });
        
        console.log('inside connectToSocketServer : ',socketRef);

        socketRef.current.on('signal',gotMessage);

        socketRef.current.on('connect',()=>{
            
            socketRef.current.emit('join-Call',window.location.href) // sneding path to socket.js server
            
            socketIdRef.current= socketRef.current.id;
            
            socketRef.current.on('chat-message',addMessage);

            socketRef.current.on('user-left',(id)=>{
                setVideo((videos)=>videos.filter((video)=>video.socketId !==id))// We will get all the videos except the user id who left the room
            })

            socketRef.current.on('user-joined',(id,clients)=>{
                clients.forEach((socketListId)=>{
                    // connections[socketListId] = new
                })
            })
        })
    }

    let getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        console.log('inside getMedia function : ', video);
        console.log('inside getMedia function : ', videoAvailable);
        console.log('inside getMedia function : ', audio);
        console.log('inside getMedia function : ', audioAvailable);
        connectToSocketServer();
    }

    let connect = () => { // when the user will click on the join button he will arive here. 
        setAskForUsername(false);
        getMedia();
    }

    return (
        <div>
            {askForUsername === true ? <div>
                <h2>Enter into Lobby</h2>
                <label htmlFor="username">Username</label>
                <input type="text" id='username' style={{ margin: '1rem', backgroundColor: 'white', color: 'black' }} />
                <button type='button' style={{ backgroundColor: 'gray', padding: '1rem', color: 'black' }} onClick={connect}> join</button>
                <div>
                    <video ref={localVideoRef} autoPlay muted></video>
                </div>
            </div> : <>
                <h3>Not allowed</h3>
            </>}

        </div>
    );
}
