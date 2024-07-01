import React from 'react';
import Image from "next/image";
import Section1Image from '../../../public/faceDetection.png';

const MyComponent = () => {
    return (
        <div className='min-h-screen w-full flex items-center justify-center bg-gradient-to-t from-purple-900 to-black'>
            <div className='p-5 max-w-5xl w-full'>
                <div className='bg-purple-800 p-5 rounded-lg shadow-lg'>
                    <div className='flex flex-col md:flex-row items-center'>
                        <div className='flex-1'>
                            <div className='rounded-full w-8 h-8 bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] text-white text-center mb-5'>
                                <span>1</span>
                            </div>
                            <h1 className='text-2xl md:text-4xl font-bold text-white'>
                                Upgrade Your Existing CCTV Camera,
                                <span className="block">with Face Detection and Recognition</span>
                            </h1>
                            <p className='text-white mt-4'>
                                In an era where technology rapidly evolves, staying ahead requires tools that not only keep pace but also set the pace. Our state-of-the-art machine learning models represent the pinnacle of innovation in artificial intelligence, providing unparalleled accuracy and efficiency.
                            </p>
                        </div>
                        <div className='mt-5 md:mt-0 md:ml-5 flex-1'>
                            <Image
                                src={Section1Image}
                                alt="Face Detection"

                                width={1000}  // Adjusted width
                                height={600}  // Adjusted height for better aspect ratio
                                className='rounded-xl'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
