import React from 'react';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi';  // Import icons from React Icons
import Book from '../../../public/icons/Book.png';
import Cap from '../../../public/icons/Cap.png';
import Stats from '../../../public/icons/Stats.png';
import OpenBook from '../../../public/icons/OpenBook.png';
import Image from "next/image";



const AttendanceBox: React.FC = () => {
    const data = [
        { id: 1, icon: <Image src={Book} alt="Book" width={100} height={100} />, text: "Library" , percentage: "%80" },
        { id: 2, icon: <Image src={Cap} alt="Graduation Cap" width={100} height={100} />, text: "Graduation" , percentage: "%80" },
        { id: 3, icon: <Image src={Stats} alt="Statistics"  />, text: "Statistics" , percentage: "%80" },
        { id: 4, icon: <Image src={OpenBook} alt="Open Book" width={100} height={100} />, text: "Study", percentage: "%80" }
      ];
    
    return (
        <div className="rounded-lg  flex items-center w-[90%] mx-auto h-[200px]  space-x-10  pt-20 ">
            
      {data.map(item => (
        <div key={item.id} className="flex flex-col items-center justify-center  bg-white rounded-lg flex-grow shadow-md hover:border-4 border-[#925FE2]">
          <div className='p-4'>{item.icon}</div>
          <div className='p-2'>{item.percentage}</div>
          <div className="text-sm p-2 text-Lpurple font-medium">{item.text}</div>
        </div>
      ))}
    </div>
    );
};

export default AttendanceBox;