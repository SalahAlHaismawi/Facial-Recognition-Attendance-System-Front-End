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
            <h1>
                <p className='text-sm pt-5'> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </h1>
            </div>

        </div>
    );
};

export default MyComponent;
