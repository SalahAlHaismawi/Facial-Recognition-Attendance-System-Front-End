'use client'

import React from 'react';
import GraduationCap from '../../public/GraduationCap.png';
import Image from "next/image";
import cash from '../../public/icons/cash.png';
import contacts from '../../public/icons/contacts-alt.png';
import dashboard from '../../public/icons/dashboard.png';
import notebook from '../../public/icons/notebook.png';
import logout from '../../public/icons/logout.png';
const SideBar: React.FC = () => {
  const handleLogoutClick = () => {
    // Handle the logout logic
  };

  return (
    <div className="ml-5 min-h-[90vh] max-h-[90vh]  flex flex-col text-base text-center text-black rounded-3xl max-w-[233px] bg-gradient-to-b from-[#925FE2] to-[#b01dddcc]  w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:max-w-[233px]">
      <div className='inline-block mx-auto rounded-xl relative mt-10 bg-gradient-to-r from-[#9C6FE4] to-[#7042C0]'>
        <Image 
          src={GraduationCap} 
          alt="Graduation Cap" 
          layout="responsive"
          className="p-4" 
        />
      </div>
      <div className="mt-10">
        <ul className="space-y-4">
          
          <li className='flex items-center'>
          <div>
            <Image 
            src={dashboard} 
            alt="Graduation Cap" 
            
            sizes="100vh"

            className="p-4 w-[50px] h-[50px]" 
          />
            </div>
            <a className='text-white text-[14px]' href="/face-recognition">Dashboard</a>
            
            
          </li>
          <li className='flex items-center'>
          <div>
            <Image 
            src={cash} 
            alt="Graduation Cap" 
            sizes="100vh"
            className="p-4 w-[50px] h-[50px]" 
            

          />
            </div>
            <a className='text-white text-[14px]' href="/face-recognition">Face Recognition</a>
            
            
          </li>
          <li className='flex items-center'>
          <div>
            <Image 
            src={notebook} 
            alt="Graduation Cap" 
            className="p-4 w-[50px] h-[50px]" 
            sizes="100vh"

          />
            </div>
            <a className='text-white text-[14px]' href="/face-recognition">Attendance</a>
            
            
          </li>
          <li className='flex items-center'>
          <div>
            <Image 
            src={contacts} 
            alt="Graduation Cap" 
            
            className="p-4 w-[50px] h-[50px]" 
 
            width={0}
            height={0}
            sizes="100vh"

          />
            </div>
            <a className='text-white text-[14px]' href="/face-recognition">Manage Students</a>
            
            
          </li>
          
        </ul>
      </div>
      <div className='flex items-center mt-auto mb-10 ml-5'>
  <button 
    className="text-white flex items-center justify-center"
    onClick={handleLogoutClick}
  >
    <span className="w-6 h-6 flex justify-center items-center mr-2"> {/* Added mr-2 for more space */}
      <Image 
        src={logout} 
        alt="Logout" 
        width={24}
        height={24}
        objectFit="contain"
      />
    </span>
    Logout
  </button>
</div>

     
    </div>
  );
};

export default SideBar;
