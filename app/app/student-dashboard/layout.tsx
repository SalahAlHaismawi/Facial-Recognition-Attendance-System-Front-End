'use client'
import WelcomeCard from '@/app/components/shared/WelcomeCard';
import AttendanceBox from '@/app/components/shared/AttendanceBox';

import SideBar from '@/app/components/shared/SideBar'
import {AuthProvider} from '../../context/AuthContext'
import useProtectedRoute from '@/context/useProtectedRoute';
import axios from "axios";

const handleButtonClick = () => {
  console.log('Button clicked');

  axios.post('http://localhost:8000/generate-encodings')
      .then(response => {
        console.log('Success:', response.data.message);
      })
      .catch(error => {
        console.error('Error:', error.response ? error.response.data.error : error.message);
      });
};
const Layout = ({ children }: { children: React.ReactNode }) => {

  useProtectedRoute(); 
    return (
      <AuthProvider>
        <button onClick={handleButtonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> </button>
        <div className="flex h-screen w-screen justify-center pt-10 ">
      <SideBar />
      <div className="flex flex-col flex-grow">
        <WelcomeCard />
        <div className='mt-10 flex flex-col '>
        <AttendanceBox />
        </div>
        
        <main className="overflow-auto">{children}</main>
      </div>
    </div>
      </AuthProvider>
      
    );
  };

  export default Layout;