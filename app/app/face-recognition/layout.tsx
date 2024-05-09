'use client'
import WelcomeCard from '@/app/components/shared/WelcomeCard';
import AttendanceBox from '@/app/components/shared/AttendanceBox';

import SideBar from '@/app/components/shared/SideBar'
import {AuthProvider} from '../../context/AuthContext'
import useProtectedRoute from '@/context/useProtectedRoute';
import { useLocation } from 'react-router-dom'; // Import useLocation
import VideoStream from '../components/faceRecognition/VideoStream'
const Layout = ({ children }: { children: React.ReactNode }) => {

  useProtectedRoute(); 
    return (
    
        <div className="flex h-screen w-screen justify-center pt-10 bg-[#F5F5F5]">
      <SideBar />
      <div className="flex flex-col flex-grow justify-between w-full">
      <WelcomeCard />
      <div className='ml-5'>
      <VideoStream/>
      </div>
        <main className="overflow-auto">{children}</main>
      </div>
    </div>
    
      
    );
  };

  export default Layout;