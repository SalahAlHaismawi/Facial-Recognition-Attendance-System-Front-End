import React from 'react';
import Book from '../../../public/icons/Book.png';
import Cap from '../../../public/icons/Cap.png';
import Stats from '../../../public/icons/Stats.png';
import OpenBook from '../../../public/icons/OpenBook.png';
import Image from "next/image";

const AttendanceBox: React.FC = () => {
    const data = [
        { id: 1, icon: <Image src={Book} alt="Book" style={{ width: '80%', height: 'auto' }} />, text: "Library", percentage: "80%" },
        { id: 2, icon: <Image src={Cap} alt="Graduation Cap" style={{ width: '80%', height: 'auto' }} />, text: "Graduation", percentage: "40%" },
        { id: 3, icon: <Image src={Stats} alt="Statistics" style={{ width: '80%', height: 'auto' }} />, text: "Statistics", percentage: "80%" },
        { id: 4, icon: <Image src={OpenBook} alt="Open Book" style={{ width: '80%', height: 'auto' }} />, text: "Study", percentage: "80%" }
    ];

    return (
        <div className="rounded-lg flex flex-wrap items-center justify-end  gap-4 text-white max-w-screen-lg p-5 w-full">
            {data.map(item => (
                <div key={item.id} className="flex flex-col items-center bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] rounded-lg shadow-md hover:border-4 border-[#925FE2] text-white p-2 flex-grow">
                    <div className='p-4'>{item.icon}</div>
                    <div className='p-2'>{item.percentage}</div>
                    <div className="text-sm p-2 font-medium">{item.text}</div>
                </div>
            ))}
        </div>
    );
};

export default AttendanceBox;
