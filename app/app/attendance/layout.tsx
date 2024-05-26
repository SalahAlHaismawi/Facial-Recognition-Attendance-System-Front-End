'use client'
import WelcomeCard from '@/app/components/shared/WelcomeCard';
import AttendanceBox from '@/app/components/shared/AttendanceBox';

import SideBar from '@/app/components/shared/SideBar'
import {AuthProvider} from '../../context/AuthContext'
import useProtectedRoute from '@/context/useProtectedRoute';
import { useLocation } from 'react-router-dom'; // Import useLocation
import DetectStream from '../components/face-detection/detect-stream';
const Layout = ({ children }: { children: React.ReactNode }) => {

    useProtectedRoute();
    return (

        <div className="flex h-screen w-screen justify-center pt-10">
            <SideBar />
            <div className="flex flex-col flex-grow">

                <DetectStream/>
                <main className="overflow-auto">{children}</main>
            </div>
        </div>


    );
};

export default Layout;