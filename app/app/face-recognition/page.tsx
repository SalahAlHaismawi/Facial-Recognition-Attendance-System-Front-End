'use client'
import React, { Suspense } from "react";
import WelcomeCard from '@/app/components/shared/WelcomeCard';
import SideBar from '@/app/components/shared/SideBar';
import { AuthProvider } from '../../context/AuthContext';
import useProtectedRoute from '@/context/useProtectedRoute';
import Loading from "@/app/face-recognition/loading";
const VideoStream = React.lazy(() => import('../components/faceRecognition/VideoStream'));

const Page = ({ children }) => {
    useProtectedRoute();

    return (
       <div>

       </div>
    );
};

export default Page;
