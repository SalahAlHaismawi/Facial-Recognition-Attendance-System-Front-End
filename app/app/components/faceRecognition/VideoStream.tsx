import React, { useEffect, useRef } from 'react';

const VideoStream = () => {
    const videoRef = useRef(null);  // Reference to the video element

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8765');

        ws.binaryType = 'blob';  // Important: Set binary type to 'blob'

        ws.onmessage = (event) => {
            if (videoRef.current) {
                const url = URL.createObjectURL(event.data);
                (videoRef.current as HTMLImageElement).src = url;
            }
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

export default VideoStream;
