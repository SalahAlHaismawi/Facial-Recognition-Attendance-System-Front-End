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
        <div className='min-h-screen w-[100%] flex flex-row p-5 bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] flex'>
            <div className=' w-full  p-10 rounded-2xl border jusitfy-center '>
            <h1 className='text-6xl text-white'>
                Contact us:
            </h1>
            <div className='w-full justify-center'>
                <form className='flex flex-col gap-5 p-5 w-full 2xl:w-[50%] '>
                    <label htmlFor="name" className='text-lg'>Name:</label>
                    <input type="text" id="name" name="name" className='p-2 rounded-md' />
                    <label htmlFor="email" className='text-lg'>Email:</label>
                    <input type="email" id="email" name="email" className='p-2 rounded-md' />
                    <label htmlFor="message" className='text-lg'>Message:</label>
                    <textarea id="message" name="message" className='p-2 rounded-md h-40 ' />
                    <button type="submit" className='bg-[#6707FF] text-white p-2 rounded-md'>Submit</button>
                </form>
            </div>

            </div>
        </div>
    );
};

export default MyComponent;
