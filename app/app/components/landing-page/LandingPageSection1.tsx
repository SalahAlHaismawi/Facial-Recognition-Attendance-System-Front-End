import React from 'react';
import Image from "next/image";
import Section1Image from '../../../public/faceDetection.png';
import Section2Image from '../../../public/manageStudents.png';

const MyComponent = () => {
    return (
        <div className='min-h-screen min-w-screen flex flex-row justify-between pt-10  bg-gradient-to-b from-[#040D12] to-[#700B97] '>
            <div className='lg:flex lg:flex-row flex flex-col items-center lg:justify-between w-screen '>

                <div className='flex flex-col '>
                    <div
                        className='rounded-full w-[30px] h-[30px] bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] text-white text-center ml-5'>
                        <span>1</span>
                    </div>

                    <h1 className='text-2xl p-5 lg:text-5xl font-bold text-white w-full flex flex-col pt-5'>
                        <span
                            className="truncate overflow-hidden whitespace-nowrap text">UPGRADE YOUR EXISTING CCTV,</span>
                        <span
                            className="truncate overflow-hidden whitespace-nowrap">WITH REAL-TIME</span>
                        <span
                            className="truncate overflow-hidden whitespace-nowrap">AND RECOGNITION</span>

                    </h1>
                    <p className='text-white text-md pl-5 pr-5'>
                        Elevate your security measures to the next level with our state-of-the-art face detection and recognition technology. Designed to seamlessly integrate with your existing CCTV infrastructure, our solution empowers you with real-time capabilities to enhance monitoring and ensure unparalleled safety.

                    </p>
                    <div className=' rounded-xl max-w-full lg:max-w-[900px] p-5 flex flex-col gap-5 lg:flex-row l'>

                        <Image src={Section1Image} alt="Section 1" className='rounded-xl  max-w-[1000px] ' style={{
                            width: '100%',
                            height: 'auto'
                        }}/>


                    </div>
                </div>

            </div>

        </div>
    );
};

export default MyComponent;
