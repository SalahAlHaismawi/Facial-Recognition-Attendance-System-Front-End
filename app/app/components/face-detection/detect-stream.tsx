import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";

const DetectStream= () => {
    const [isActive, setIsActive] = useState(true); // Track if the video stream is active
    const streamSocket = useRef(null);
    const encodeSocket = useRef(null);



    const handleStartEncoding = async () => {
        // Close the stream socket if it's open
        if (streamSocket.current && streamSocket.current.readyState === WebSocket.OPEN) {
            streamSocket.current.close();
        }

        // Initialize encoding WebSocket
        encodeSocket.current = new WebSocket('ws://localhost:8000/ws/encode');
        encodeSocket.current.onmessage = (event) => {
            console.log("Encoding Data:", event.data);
        };
        encodeSocket.current.onclose = () => console.log("Encoding WebSocket closed");

        // Optionally send a start command
        encodeSocket.current.onopen = () => {
            encodeSocket.current.send("start encoding");
            setIsActive(false); // Update state to indicate encoding is active
        };

        // Make API call to start encoding
        try {
            const response = await axios.post('http://localhost:8000/generate-encodings');
            console.log('Encoding started:', response.data.message);
        } catch (error) {
            console.error('Error starting encoding:', error);
        }
    };

    return (
        <div>
            {isActive ? (
                <button onClick={handleStartEncoding}>Start Encoding</button>
            ) : (
                <p>Encoding in progress...</p>
            )}
        </div>
    );
};



export default DetectStream;
