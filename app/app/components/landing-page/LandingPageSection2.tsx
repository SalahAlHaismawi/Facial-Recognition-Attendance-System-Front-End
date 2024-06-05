import React from 'react';
import Image from "next/image";
import Section1Image from '../../../public/hardwareLanding.jpg';

const MyComponent = () => {
    return (
        <div className='min-h-screen w-full flex flex-row justify-between p-20 bg-gradient-to-t from-[#070739] to-[#121212] '>
            <div className='flex flex-row justify-between w-full  rounded-xl p-20'>
                <div className='my-auto'>
                    <div
                        className='rounded-full w-[30px] h-[30px] bg-gradient-to-b from-[#872CD8] to-[#b01dddcc] text-white text-center p-1'>
                        <span>2</span>
                    </div>
                    <h1 className='text-5xl font-bold text-white W-[30%] flex flex-col mt-5'>
                        <span className="truncate overflow-hidden whitespace-nowrap text">NO ADDITIONAL</span>
                        <span className="truncate overflow-hidden whitespace-nowrap"> HARDWARE NEEDED!</span>

                    </h1>
                </div>
                <div className='my-auto rounded-xl max-w-[900px] '>
                    <Image src={Section1Image} alt="Section 1" className='rounded-xl  ' />
                </div>
            </div>

        </div>
    );
};

export default MyComponent;
