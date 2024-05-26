'use client'
import React, { Suspense } from "react";
import WelcomeCard from '@/app/components/shared/WelcomeCard';
import SideBar from '@/app/components/shared/SideBar';
import { AuthProvider } from '../../context/AuthContext';
import useProtectedRoute from '@/context/useProtectedRoute';
import Loading from "@/app/face-recognition/loading";
const VideoStream = React.lazy(() => import('@/app/components/face-recognition/Livestream'));

const Layout = ({ children }) => {
    useProtectedRoute();

    return (
        <AuthProvider>
            <div className="flex h-screen w-screen justify-center pt-10">

                    <SideBar />


                <div className="flex flex-col flex-grow">
                    <Suspense fallback={<Loading />}>
                        <VideoStream />
                    </Suspense>
                </div>
            </div>
        </AuthProvider>
    );
};

export default Layout;
