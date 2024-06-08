import React from 'react';
import Image from "next/image";
import Section1Image from '../../../public/faceDetection.png';

const MyComponent = () => {
    return (
        <div className='min-h-screen min-w-screen flex flex-row justify-between pt-10  bg-gradient-to-t from-[#8013D6] to-[#121212] '>
            <div className='lg:flex lg:flex-row flex flex-col items-center lg:justify-between w-screen lg:p-20 '>
                <div className=''>
                    <div
                        className='rounded-full w-[30px] h-[30px] bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] text-white text-center p-1'>
                        <span>1</span>
                    </div>
                    <h1 className='text-2xl lg:text-5xl font-bold text-white W-[30%] flex flex-col pt-5'>
                        <span className="truncate overflow-hidden whitespace-nowrap text">UPGRADE EXISTING CCTV,</span>
                        <span className="truncate overflow-hidden whitespace-nowrap">WITH RELIABLE FACE DETECTION</span>
                        <span className="truncate overflow-hidden whitespace-nowrap">AND RECOGNITION.</span>

                    </h1>
                </div>
                <div className=' rounded-xl max-w-[350px] lg:max-w-[900px] pt-10'>
                    <Image src={Section1Image} alt="Section 1" className='rounded-xl max-w-[600px] ' style={{
                        width: '100%',
                        height: 'auto'
                    }} />
                </div>
            </div>

        </div>
    );
};

export default MyComponent;
