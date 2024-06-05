import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Package from '../../../public/Package.png';
import Security from '../../../public/Security.png';
import Future from '../../../public/Future.png';

const MyComponent = () => {
    const text = "Vision Cafe";
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let currentIndex = 0;

        const typeText = () => {
            if (currentIndex < text.length) {
                setDisplayedText((prevText) => prevText + text[currentIndex]);
                currentIndex++;
                setTimeout(typeText, 300); // Adjust typing speed
            }
        };

        typeText(); // Start the typing effect

        return () => {
            // Cleanup function to reset displayed text and index
            setDisplayedText("");
            currentIndex = 0;
        };
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <div className='flex flex-col p-5 bg-gradient-to-b from-[#040D12] to-[#700B97] h-screen overflow-y-auto snap-y snap-mandatory'>
            <div className='w-full p-10 rounded-2xl'>
                <h1 className='text-5xl text-white mb-10'>
                    The Ultimate Vision:
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                    <div className='bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] p-6 flex flex-col rounded-3xl '>
                        <Image src={Package} sizes="100vw" style={{width: 'auto', height: 'auto'}} className='self-center'/>
                        <h1 className='text-xl text-white mt-4 mb-2'>Smart Add-On</h1>
                        <p className='text-white flex-grow text-sm text-center'>Our system integrates seamlessly with your existing CCTV cameras, using advanced algorithms like ArcFace for recognition and MTCNN for detection. This ensures high accuracy and reliability without disrupting your current operations.</p>
                    </div>
                    <div className='bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] p-6 flex flex-col rounded-3xl  '>
                        <Image src={Security} sizes="100vw" style={{width: 'auto', height: 'auto'}} className='self-center'/>
                        <h1 className='text-xl text-white mt-4 mb-2'>Smart Add-On</h1>
                        <p className='text-white flex-grow text-sm text-center'>Our system integrates seamlessly with your existing CCTV cameras, using advanced algorithms like ArcFace for recognition and MTCNN for detection. This ensures high accuracy and reliability without disrupting your current operations.</p>
                    </div>
                    <div className='bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] p-6 flex flex-col rounded-3xl '>
                        <Image src={Future} sizes="100vw" style={{width: 'auto', height: 'auto'}} className='self-center'/>
                        <h1 className='text-xl text-white mt-4 mb-2'>Smart Add-On</h1>
                        <p className='text-white flex-grow text-sm text-center'>Our system integrates seamlessly with your existing CCTV cameras, using advanced algorithms like ArcFace for recognition and MTCNN for detection. This ensures high accuracy and reliability without disrupting your current operations.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
