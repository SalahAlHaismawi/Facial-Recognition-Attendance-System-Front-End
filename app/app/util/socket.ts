// utils/socket.js
import io from "socket.io-client";

let socket: any;

export const initSocket = () => {
    if (!socket) {
        socket = io('http://localhost:8000', {
            // Additional options if needed
            transports: ['websocket'],
        });

        socket.on('connect', () => {
            console.log('Connected to WebSocket server!');
        });

        // You can handle disconnection or other events as well
        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });
    }
    return socket;
};
