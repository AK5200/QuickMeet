import { useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/socketProvider';
import '../index.css';

const Lobby = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const socket = useSocket();
    const navigate = useNavigate();

    const submitHandler = useCallback((e) => {
        e.preventDefault();
        socket.emit('room:join', { name, room });
    }, [name, room, socket]);

    const handleJoinRoom = useCallback((data) => {
        const { name, room } = data;
        navigate(`/room/${room}`);
    });

    useEffect(() => {
        socket.on("room:join", handleJoinRoom);
        return () => socket.off("room:join", handleJoinRoom);
    }, [socket]);

    return (
        <div className="app-container">
            <div className="lobby-container">
                <h1 className="site-title">QuickMeet</h1>
                <form className="lobby-form" onSubmit={submitHandler}>
                    <label className="lobby-label" htmlFor="name">Name</label>
                    <input
                        className="lobby-input"
                        type="text"
                        placeholder="Gita"
                        name="name"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <label className="lobby-label" htmlFor="room">Room</label>
                    <input
                        className="lobby-input"
                        type="text"
                        name="room"
                        id="room"
                        value={room}
                        onChange={e => setRoom(e.target.value)}
                    />
                    <button className="lobby-button" type="submit">Join</button>
                </form>
            </div>
            <p className="site-description">Video call anyone by creating a room with a unique room number and send the room number to whom you want to call.</p>
        </div>
    );
};

export default Lobby;
