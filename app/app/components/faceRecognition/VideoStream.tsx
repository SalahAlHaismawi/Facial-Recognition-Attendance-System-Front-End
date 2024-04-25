import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const VideoStream = () => {
    const [streamUrl, setStreamUrl] = useState('');

    useEffect(() => {
        // Connect to the server
        const socket = io('http://localhost:5000'); // Change the URL/port as needed

        socket.on('connect', () => {
            console.log('Connected to the server.');
        });

        // Listen for new_frame events from the server
        socket.on('new_frame', data => {
            setStreamUrl(data.image);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server.');
        });

        // Clean up the socket connection on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>Video Stream</h1>
            <img src={streamUrl} alt="Video Stream" />
        </div>
    );
};

export default VideoStream;
