import React from 'react';
import Image from "next/image";
import Section1Image from '../../../public/section1Image.png';

const MyComponent = () => {
    return (
        <div className='min-h-screen w-[90%] flex flex-row justify-between'>
            <div className='my-auto'>
                <div className='rounded-full w-[30px] h-[30px] bg-white text-black text-center p-1'>
                    <span>2</span>
                </div>
                <h1 className='text-5xl font-bold text-white W-[30%] flex flex-col mt-5'>
                    <span className="truncate overflow-hidden whitespace-nowrap text">AUTOMATE ATTENDANCE</span>
                    <span className="truncate overflow-hidden whitespace-nowrap underline">SAVE TIME.</span>
                    <span className="truncate overflow-hidden whitespace-nowrap underline">SAVE EFFORT.</span>

                </h1>
            </div>
            <div className='my-auto'>
                <Image src={Section1Image} alt="Section 1" className='rounded-xl '/>
            </div>
        </div>
    );
};

export default MyComponent;