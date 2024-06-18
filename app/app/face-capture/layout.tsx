'use client'
import WelcomeCard from '@/app/components/shared/WelcomeCard';
import AttendanceBox from '@/app/components/shared/AttendanceBox';

import SideBar from '@/app/components/shared/SideBar'
import {AuthProvider} from '@/app/context/AuthContext'
import useProtectedRoute from '@/app/context/useProtectedRoute';
import { useLocation } from 'react-router-dom'; // Import useLocation
import DetectStream from '../components/face-detection/detect-stream';
import React, {Suspense} from "react";
import Livestream from "@/app/components/face-recognition/Livestream";
import Loading from "@/app/face-recognition/loading";
const Layout = ({ children }: { children: React.ReactNode }) => {

  useProtectedRoute(); 
    return (

        <div className="flex h-screen w-screen justify-center pt-10">
          <SideBar/>
          <div className="flex flex-col flex-grow">
            <Suspense fallback={<Loading/>}>
              <Livestream link={'ws://localhost:8000/ws/yolodetection'}/>
            </Suspense>
          </div>
        </div>


    );
};

export default Layout;