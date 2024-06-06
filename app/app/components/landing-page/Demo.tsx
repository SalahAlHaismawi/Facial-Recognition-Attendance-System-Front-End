import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Package from '../../../public/Package.png';
import Security from '../../../public/Security.png';
import Future from '../../../public/Future.png';

const MyComponent = () => {
    const text = "Vision Cafe";
    const [displayedText, setDisplayedText] = useState("");

    return (
        <div className='min-h-screen w-screen max-w-screen flex flex-col align p-10 bg-gradient-to-b from-[#151512] to-[#151515] flex items-center '>
            <div className=''>
                <h1 className='text-5xl text-white mb-10'>
                    Demo:
                </h1>
            </div>
            <div className='video-container rounded-xl'>
                <iframe
                    src="https://www.youtube.com/embed/RwU7YY6emYc?si=8-TKmU57fy-0fpUz"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                </iframe>
            </div>

            <div className='text-white'>

            </div>

        </div>
    );
};

export default MyComponent;
