import { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";


const SocketContext = createContext(null);

// conext helps in directly giving data to every component instead of passing by parent to child

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
}

export const SocketProvider = (props)=>{
                                     // server port
    const socket = useMemo (() => io('http://localhost:8000'), []);
    // use momo for optimizing the creation of socket. useMemo stops rendring of comonent again and again without any changes.

    return (
        // so using create context we are creating a context. which will be present in all the components.
        //vale is the actual socket

                                         // this the prop which will be directly accessible to every component
        <SocketContext.Provider value = {socket}>
            {props.children}
        </SocketContext.Provider>

    )
}