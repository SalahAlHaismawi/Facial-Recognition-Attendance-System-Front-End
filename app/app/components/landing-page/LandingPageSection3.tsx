import React from 'react';
import Image from "next/image";
import Section1Image from '../../../public/manageAttendance.png';

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
                                    MANAGE ATTENDANCE ON THE GO,
                                <span className="block">HASSLE FREE.</span>
                            </h1>
                            <p className='text-white mt-4'>
                                In an age where data management and efficiency are paramount, having robust tools that streamline processes and enhance accessibility is crucial. Our advanced record management systems embody the forefront of technological innovation, providing seamless, reliable, and secure handling of vast datasets. These systems are designed to ensure that managing records, from storage to retrieval, is not only intuitive but also markedly efficient, thus significantly enhancing operational capabilities and ensuring data integrity in a fast-evolving digital landscape.
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
