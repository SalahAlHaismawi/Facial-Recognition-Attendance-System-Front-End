import React, { useEffect, useRef } from 'react';

const DetectStream= () => {
    const videoRef = useRef(null);  // Reference to the video element

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8766');

        ws.binaryType = 'blob';  // Important: Set binary type to 'blob'

        ws.onopen = () => {
            console.log('WebSocket Connection Established');
        };

        ws.onmessage = (event) => {
            if (videoRef.current) {
                const url = URL.createObjectURL(event.data);
                videoRef.current.src = url;
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket Error: ', error);
        };

        ws.onclose = () => {
            console.log('WebSocket Connection Closed');
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div>
            <h2>Live Video Stream</h2>
            <img ref={videoRef} alt="Video Stream" />
        </div>
    );
};

export default DetectStream;
