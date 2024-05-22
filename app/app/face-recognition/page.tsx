'use client';
import React, { Suspense } from 'react';
import WelcomeCard from '@/app/components/shared/WelcomeCard';
import SideBar from '@/app/components/shared/SideBar';
import { AuthProvider } from '../../context/AuthContext';
import useProtectedRoute from '@/context/useProtectedRoute';
import Loading from "@/app/face-recognition/loading";
const VideoStream = React.lazy(() => import('@/app/components/face-recognition/Livestream'));

// Remove the PageProps interface as it's not necessary here

const Page: React.FC = () => { // Name the component directly
    useProtectedRoute();

    return (
        <AuthProvider>
            <div className='flex h-screen w-screen justify-center items-center'>
                <SideBar />
                <div className='p-5 w-full'>
                    <WelcomeCard />
                    <Suspense fallback={<Loading />}>
                        <VideoStream />
                    </Suspense>
                </div>
            </div>
        </AuthProvider>
    );
};

export default Page; // Export the component directly
