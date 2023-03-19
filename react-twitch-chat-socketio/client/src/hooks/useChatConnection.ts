import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

const ENDPOINT = import.meta.env.VITE_SOCKET_ENDPOINT

const connect = () => {
    return io(ENDPOINT, {
        reconnectionAttempts: 5,
    })
}

export default function useChatConnection() {
    const [socket, setSocket] = useState<Socket>()

    useEffect(() => {
        console.log('Connecting....');
        const socket = connect()
        setSocket(socket)

        return () => {
            console.log('Disconnecting...');
        socket.close()
        }
    }, [])

    return socket;
}
