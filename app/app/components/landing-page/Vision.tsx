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
        <div className='min-h-screen w-[100%] flex flex-row p-5 bg-gradient-to-b from-[#040D12] to-[#700B97]'>
            <div className='w-full  p-10 rounded-2xl'>
                <h1 className='text-6xl text-white mb-10'>
                    The Ultimate Vision:
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                    <div className='bg-gradient-to-b from-[#6707FF] to-[#b01dddcc]  p-6 flex flex-col rounded-3xl '>
                        <Image src={Package} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
                        <h1 className='text-2xl text-white mt-4 mb-2'>1. Smart Add-On</h1>
                        <p className='text-white flex-grow'>Our system integrates seamlessly with your existing CCTV cameras, using advanced algorithms like ArcFace for recognition and MTCNN for detection. This ensures high accuracy and reliability without disrupting your current operations.</p>
                    </div>
                    <div className='bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] rounded-3xl p-6 flex flex-col'>
                        <Image src={Security} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
                        <h1 className='text-2xl text-white mt-4 mb-2'>2. Empowering Security</h1>
                        <p className='text-white flex-grow'>Enhance your surveillance with our solution, providing real-time face detection and recognition. Improve situational awareness and response times, whether monitoring public spaces, commercial properties, or private facilities.</p>
                    </div>
                    <div className='bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] rounded-3xl p-6 flex flex-col'>
                        <Image src={Future} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
                        <h1 className='text-2xl text-white mt-4 mb-2'>3. Future-Proofing Surveillance</h1>
                        <p className='text-white flex-grow'>Our scalable and adaptable system ensures your security infrastructure remains robust and ready for future challenges. Upgrade your existing CCTV network with our cost-effective, cutting-edge technology for enhanced protection and peace of mind.</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MyComponent;
