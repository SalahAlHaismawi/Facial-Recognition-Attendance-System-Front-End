'use client'
import WelcomeCard from '@/app/components/shared/WelcomeCard';
import AttendanceBox from '@/app/components/shared/AttendanceBox';

import SideBar from '@/app/components/shared/SideBar'
import {AuthProvider} from '../../context/AuthContext'
import useProtectedRoute from '@/context/useProtectedRoute';
const Layout = ({ children }: { children: React.ReactNode }) => {

  useProtectedRoute(); 
    return (
      <AuthProvider>
        <div className="flex h-screen w-screen justify-center pt-10 bg-[#F5F5F5]">
      <SideBar />
      <div className="flex flex-col flex-grow">
        <WelcomeCard />
        <div className='mt-10 flex flex-col '>
          <h1 className=' pl-12 text-xl xl:pl-[50px] 2xl:pl-[120px] 3xl:pl-[140px]'>Current Attendance</h1>
        <AttendanceBox />
        </div>
        
        <main className="overflow-auto">{children}</main>
      </div>
    </div>
      </AuthProvider>
      
    );
  };

  export default Layout;