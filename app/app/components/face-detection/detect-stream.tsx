import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";

const DetectStream: React.FC = () => {
    const [isActive, setIsActive] = useState(true);
    const streamSocket = useRef<WebSocket | null>(null); // Explicitly type the ref
    const encodeSocket = useRef<WebSocket | null>(null);

    // const handleStartEncoding = async () => {
    //     if (streamSocket.current?.readyState === WebSocket.OPEN) { // Optional chaining
    //         streamSocket.current.close();
    //     }
    //
    //     encodeSocket.current = new WebSocket('ws://localhost:8000/ws/yolodetection');
    //
    //     encodeSocket.current.onopen = () => {
    //         if(encodeSocket.current) { // Add type check
    //             encodeSocket.current.send("start encoding");
    //         }
    //         setIsActive(false);
    //     };
    //
    //     encodeSocket.current.onmessage = (event) => {
    //         console.log("Encoding Data:", event.data);
    //     };
    //     encodeSocket.current.onclose = () => console.log("Encoding WebSocket closed");
    //
    //     try {
    //         const response = await axios.post('http://localhost:8000/generate-encodings');
    //         console.log('Encoding started:', response.data.message);
    //     } catch (error) {
    //         console.error('Error starting encoding:', error);
    //     }
    // };

    return (
        <div>



        </div>
    );
};

export default DetectStream;
