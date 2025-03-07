import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
const server_URL = 'http://localhost:8080'

var connections = {};
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

    let [video, setVideo] = useState([]); // to handle video off/on

    let [audio, setAudio] = useState();// we will set the source for the audio

    let [screen, setScreen] = useState();// we will set the source for sharing the screen

    let [showModal, setShowModal] = useState();// 

    let [screenAvailable, setScreenAvailable] = useState(); // to set the screen share 

    let [messages, setMessages] = useState([]); // to set all messages

    let [message, setMessage] = useState();// to set the current user message

    let [newMessages, setNewMessages] = useState(0); // Fot the notification of new messages

    let [askForUsername, setAskForUsername] = useState(true);

    let [username, setUsername] = useState(); // to set the username


    let [videos, setVideos] = useState([]); // will store the videos
    // Whenever a new user joins or updates their video stream, setVideos updates the state.
    // This state will trigger a re-render, ensuring the video elements are updated on the screen.

    const videoRef = useRef([]) //A React ref (useRef) that stores the same list of video streams but does NOT trigger re-renders.
    //Manually updated whenever videos is updated.


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
    let addMessage = () => {

    }

    let gotMessageFromServer = (fromId, message) => {
        console.log('inside gotMessageFromServer Function : ', message);
        var signal = JSON.parse(message);
        console.log('inside gotMessageFromServer Function : ', signal);
        if (fromId !== socketIdRef.current) {  // Ensure that the message is NOT from the current user (prevents handling own signals)
            // Local Description → The SDP message they create.
            // Remote Description → The SDP message they receive from the other peer.
            // it is like   second user ---> server ----> current user (he recieved a offer)   then      current user(create's a answer) ---> server ---->second user   
            if (signal.sdp) {
                connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)) //If Peer A sends an offer, then for Peer B, that offer is considered remote.
                    .then(() => {
                        if (signal.sdp.type === 'offer') { // If the received SDP is an "offer", the other peer (receiver) must create an "answer"
                            connections[fromId].createAnswer().then((description) => {
                                console.log("printing the description : ", description);
                                connections[fromId].setLocalDescription(description).then(() => {
                                    // Send the answer back to the original peer through the signaling server
                                    socketIdRef.current.emit('signal', fromId, JSON.stringify({ "sdp": connections[fromId].localDescription })) //sending the answer to the second user who sent the offer
                                }).catch(e => console.log(e))
                            }).catch(e => { console.log(e) })
                        }
                    }).catch(e => { console.log(e) })
            }

            if (signal.ice) {
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => { console.log(e) });
            }
        }
    }

    let connectToSocketServer = () => {
        socketRef.current = io.connect(server_URL, { secure: false });

        console.log('inside connectToSocketServer : ', socketRef);

        socketRef.current.on('signal', gotMessageFromServer);

        socketRef.current.on('connect', () => {

            socketRef.current.emit('join-Call', window.location.href); // sedning path to socket.js server

            socketIdRef.current = socketRef.current.id; //after Connection the socket will get a id

            socketRef.current.on('chat-message', addMessage); // getting the message from server

            socketRef.current.on('user-left', (id) => {
                setVideos((videos) => videos.filter((video) => video.socketId !== id))// We will get all the videos except the user id who left the room
            })

            socketRef.current.on('user-joined', (id, clients) => { // it receives id (the new user's ID) and clients (a list of existing users in the call).
                clients.forEach((socketListId) => {
                    connnections[socketListId] = new RTCPeerConnection(peerConfigConnections); //RTCPeerConnection is a WebRTC API that helps in establishing a direct connection between two users for video/audio.

                    connections[socketListId].onicecandidate = (event) => {  // Here ice is a protocal ICE(Intractive Connectivity Establishment)
                        if (event.candidate !== null) {
                            socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate })) // sending the details towards the Signaling Server
                        }
                    }

                    connections[socketListId].onaddstream = (event) => {
                        let videoExists = videoRef.current.find(video => video.socketId === socketListId);

                        // this is how the info will be stored in videoRef
                        // videoRef.current = [
                        //     {
                        //         socketId: "user123",
                        //         stream: MediaStream {},
                        //         autoPlay: true,
                        //         playsinLine: true
                        //     },
                        //     {
                        //         socketId: "user456",
                        //         stream: MediaStream {},
                        //         autoPlay: true,
                        //         playsinLine: true
                        //     }
                        // ];

                        // connections[] stores WebRTC connections for each user.
                        // connections = {
                        //     "user123": RTCPeerConnection {}, // WebRTC connection for user123
                        //     "user456": RTCPeerConnection {}, // WebRTC connection for user456
                        //     "user789": RTCPeerConnection {}  // WebRTC connection for user789
                        // };

                        // ✔ videoRef.current keeps an updated list of video streams without causing re-renders.


                        if (videoExists) {
                            setVideos(videos => {
                                const updatedVideos = videos.map(video =>
                                    video.socketId === socketListId ? { ...video, stream: event.stream } : video
                                );
                                videoRef.current = updateVideos;
                                return updatedVideos;
                            })
                        } else {
                            let newVideo = {
                                socketId: socketListId,
                                stream: event.stream,
                                autoPlay: true,
                                playsinLine: true
                            }
                            setVideos(videos => {
                                const updatedVideos = [...videos, newVideo];
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            })
                        }
                    }

                    if (window.localStream !== undefined && window.localStream !== null) {
                        connections[socketListId].addStream(window.localStream);
                    }
                    else {
                        // todo blacksilence
                    }
                })

                if (id === socketIdRef.current) {
                    for (let id2 in connections) {
                        if (id2 === socketIdRef.current) continue;

                        try {
                            connections[id2].addStream(window.localStream)
                        }
                        catch (e) { }

                        connections[id2].createOffer().then((description) => {
                            connections[id2].setLocalDescription(description)
                                .then(() => {
                                    socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
                                })
                                .cathch(e => console.log(e))
                        })
                    }
                }
            })
        })
    }

    let getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        console.log('inside getMedia function : ', video); // it will give undefined because setVideo and setAudio are asyncronous
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
