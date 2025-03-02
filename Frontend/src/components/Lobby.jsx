import React, { useEffect, useRef, useState } from 'react'

const server_URL = 'htpp://localhost:8080'

const peerConfigConnections = {
    'iceServers': [
        { 'urls': 'stun.alltel.com.au:3478' }
    ]
}
export default function Lobby() {
    let socketRef = useRef();
    let socketIdRef = useRef();
    let localVideoRef = useRef();
    let connections = useRef({});
    const videoRef = useRef([]);


    let [videoAvailable, setVideoAvailable] = useState(true);
    let [audioAvailable, setAudioAvailable] = useState(true);

    let [audio, setAudio] = useState();
    let [video, setVideo] = useState();
    let [screen, setScreen] = useState();

    let [showModel, setShowModel] = useState();
    let [screenAvailable, setScreenAvailable] = useState();
    let [messages, setMessages] = useState();
    let [message, setMessage] = useState();

    let [newMessages, setNewMessages] = useState();

    let [askForUsername, setAskForUsername] = useState(true);
    let [username, setUsername] = useState();
    let [videos, setVideos] = useState();


    const getPermissions = async () => {
        try {
            const videoPermissions = await navigator.mediaDevices.getUserMedia({ video: true })
            if (videoPermissions) {
                setVideoAvailable(true);
            }
            else {
                setVideoAvailable(false);
            }
            const audioPermissions = await navigator.mediaDevices.getUserMedia({ audio: true })
            if (audioPermissions) {
                setAudioAvailable(true);
            }
            else {
                setAudioAvailable(false);
            }

            if (videoAvailable || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
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

    let getUserMediaSuccess=(stream)=>{

    }
    let getUserMedia=()=>{
        if((video && videoAvailable) || (audio && audioAvailable)){
            navigator.mediaDevices.getUserMedia({video:video,audio:audio})
            .then(getUserMediaSuccess)//get user mediaSuccess
            ,then((stream)=>{})
            .catch((e)=>console.log(e))
        } else{
            try{
                let tracks= localVideoRef.current.srcObject.getTracks();
                tracks.forEach(track=>track.stop())
            }
            catch (e){
                console.log(e);
            }
        }
    }
    useEffect(() => {
        getPermissions();
    }, [])

    useEffect(()=>{
        if(video != undefined && audio!=undefined)
        {
            getUserMedia();
        }
    },[audio,video])
    let getmedia=()=>{
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();
    }

    return (
        <div>
            {
                askForUsername === true ?
                    <div className=''>
                        <h2>
                            Meeting Loby
                        </h2>
                        <input label='username' value={username} onChange={(e) => { e.target.value }} className='bg-amber-50' ></input>
                        <button type='button' className='mx-2 py-2 px-10 border border-white '>Connect</button>
                        <div>
                            <video ref={localVideoRef} autoPlay muted></video>
                        </div>
                    </div> :
                    <>
                        <h2>happ</h2></>
            }
        </div>
    )
}
