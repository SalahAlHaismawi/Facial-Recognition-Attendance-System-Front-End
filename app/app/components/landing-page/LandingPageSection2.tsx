import React from 'react';
import Image from "next/image";
import Section1Image from '../../../public/yoloBenchmark.jpg';
import Section2Image from '../../../public/manageStudents.png';

const MyComponent = () => {
    return (
        <div className='min-h-screen min-w-screen flex flex-row justify-between pt-10  bg-gradient-to-b from-[#040D12] to-[#700B97] '>
            <div className='lg:flex lg:flex-row flex flex-col items-center lg:justify-between w-screen lg:p-20 '>

                <div className='flex flex-col p-5'>
                    <div
                        className='rounded-full w-[30px] h-[30px] bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] text-white text-center p-1 ml-5'>
                        <span>2</span>
                    </div>

                    <h1 className='text-2xl p-5 lg:text-5xl font-bold text-white W-[30%] flex flex-col pt-5'>
                        <span
                            className="truncate overflow-hidden whitespace-nowrap text">STATE OF THE ART,</span>
                        <span className="truncate overflow-hidden whitespace-nowrap">MACHINE LEARNING MODELS</span>

                    </h1>
                    <p className='text-white text-md pl-5 pr-5'>
                        In an era where technology rapidly evolves, staying ahead requires tools that not only keep pace but also set the pace. Our state-of-the-art machine learning models represent the pinnacle of innovation in artificial intelligence, providing unparalleled accuracy and efficiency.

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
