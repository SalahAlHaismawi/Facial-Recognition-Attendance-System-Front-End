import React from 'react';
import Image from "next/image";
import Section1Image from '../../../public/manageAttendance.png';
import Section2Image from '../../../public/manageStudents.png';

const MyComponent = () => {
    return (
        <div className='min-h-screen min-w-screen flex flex-row justify-between pt-10  bg-gradient-to-b from-[#040D12] to-[#700B97] '>
            <div className='lg:flex lg:flex-row flex flex-col items-center lg:justify-between w-screen lg:p-20 '>

                <div className='flex flex-col p-5'>
                    <div
                        className='rounded-full w-[30px] h-[30px] bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] text-white text-center p-1 ml-5'>
                        <span>3</span>
                    </div>

                    <h1 className='text-2xl p-5 lg:text-5xl font-bold text-white W-[30%] flex flex-col pt-5'>
                        <span
                            className="truncate overflow-hidden whitespace-nowrap text">MANAGE RECORDS ON-THE-GO,</span>
                        <span className="truncate overflow-hidden whitespace-nowrap">WITH REAL-TIME DATA</span>

                    </h1>
                    <p className='text-white text-sm pl-5 pr-5'>
                        Elevate your management capabilities with our innovative platform, designed to streamline
                        operations and ensure seamless access to information wherever you are. By leveraging real-time
                        data processing, our system enables faster decision-making, reduces administrative burdens, and
                        enhances overall efficiency. Stay ahead with instant updates and manage your tasks effectively,
                        directly from your mobile device.

                    </p>
                    <div className=' rounded-xl max-w-full lg:max-w-[900px] p-5 flex flex-col gap-5 lg:flex-row l'>

                        <Image src={Section1Image} alt="Section 1" className='rounded-xl  max-w-[600px] ' style={{
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
