import { useEffect, useCallback, useState } from "react";
import { useSocket } from "../context/socketProvider";
import ReactPlayer from 'react-player';
import peer from './service/peer' 

const Room = () => {
    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState(null);

    const handleUserJoined = useCallback(({ name, id }) => {
        console.log(`User with email ${name} joined room with id ${id}`);
        setRemoteSocketId(id);
    }, []);

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        setMyStream(stream);
    }, []);

    useEffect(() => {
        socket.on("user:joined", handleUserJoined);

        return () => {
            socket.off("user:joined", handleUserJoined);
        };
    }, [handleUserJoined, socket]);

    return (
        <div>
            <h1>Room Page</h1>
            <h2>{remoteSocketId ? "Connected" : "Waiting for the guest!"}</h2>
            {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
            {myStream && <ReactPlayer playing muted height="20vh" width="20vw" url={myStream} />}
        </div>
    );
};

export default Room;
