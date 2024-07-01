import React from 'react';
import Image from "next/image";
import Section1Image from '../../../public/yoloBenchmark.png';

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
                                STATE OF THE ART MODELS,
                                <span className="block">LIKE YOLO, AND MTCNN</span>
                            </h1>
                            <p className='text-white mt-4'>
                                In this  fast-paced technological age, staying at the forefront demands tools that advance as rapidly as they innovate. YOLO (You Only Look Once), renowned for its exceptional speed and accuracy in object detection, is indispensable for scenarios requiring instant and reliable analysis. Similarly, MTCNN (Multi-task Cascaded Convolutional Networks) excels in facial detection and alignment, providing precise and robust recognition capabilities. These advanced machine learning models are pivotal in the realm of artificial intelligence, offering unmatched efficiency and accuracy essential for modern applications.                            </p>
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
