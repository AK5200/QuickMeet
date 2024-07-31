import { useCallback, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'

import { useSocket } from '../context/socketProvider';

const Lobby = ()=>{

     const [name, setName] = useState('');
     const [room, setRoom] = useState('');

     const socket = useSocket();
     const navigate = useNavigate();

     const submitHandler = useCallback( (e)=>{
        e.preventDefault();
        socket.emit('room:join', {name, room});
     }, [name, room, socket]
    );

    const handleJoinRoom = useCallback((data)=>{
        const {name, room} = data
        navigate(`/room/${room}`, [navigate]);  
    })

    useEffect(()=>{
        socket.on("room:join", handleJoinRoom);
        return () => socket.off("room:join", handleJoinRoom);
    }, [socket]);

    return <>
    <h1>Lobby</h1>
    <form onSubmit={submitHandler}>
        <label htmlFor="name">Name</label>
        <input
         type="text"  
         placeholder="Gita" 
         name="name" 
         id='name'
         value={name}
         onChange= { e => setName(e.target.value)}
         />

        <label htmlFor="room">Room</label>
        <input 
        type="text" 
        name="room" 
        id='room'
        value={room}
        onChange={e=> setRoom(e.target.value)}
        />
        <button type="submit">Join</button>
    </form>
    </>
}

export default Lobby;