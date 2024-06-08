import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Package from '../../../public/Package.png';
import Security from '../../../public/Security.png';
import Future from '../../../public/Future.png';
const MyComponent = () => {
    const text = "Vision Cafe";
    const [displayedText, setDisplayedText] = useState("");
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');

        try {
            const response = await fetch('https://formspree.io/f/mqkrvnpk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('Email sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('Failed to send email.');
            }
        } catch (error) {
            console.error(error);
            setStatus('Failed to send email.');
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
    };

    return (
        <div className='min-h-screen w-screen flex flex-col align p-10 bg-gradient-to-b from-[#151512] to-[#151515] flex items-center '>
            <div className='w-full p-10 rounded-2xl border justify-center flex flex-col items-center border-4 border-Lpurple'>
                <h1 className='text-2xl lg:text-6xl text-white'>
                    Contact us:
                </h1>
                <div className='w-full justify-center text-white flex'>
                    <form className='flex flex-col gap-5 p-5 w-full 2xl:w-[50%]' onSubmit={handleSubmit}>
                        <label htmlFor="name" className='text-sm w-1/2'>Name:</label>
                        <input type="text" id="name" name="name" className='p-2 rounded-md text-black' value={formData.name} onChange={handleChange} />
                        <label htmlFor="email" className='text-sm'>Email:</label>
                        <input type="email" id="email" name="email" className='p-2 rounded-md text-black' value={formData.email} onChange={handleChange} />
                        <label htmlFor="message" className='text-sm'>Message:</label>
                        <textarea id="message" name="message" className='p-2 rounded-md h-40 text-black' value={formData.message} onChange={handleChange} />
                        <button type="submit" className='bg-[#6707FF] text-white p-2 rounded-md'>Submit</button>
                    </form>
                </div>
                {status && <p className='text-white mt-4'>{status}</p>}
            </div>
        </div>
    );
};

export default MyComponent;
