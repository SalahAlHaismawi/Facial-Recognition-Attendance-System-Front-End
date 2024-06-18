'use client';
import React, { Suspense } from 'react';
import WelcomeCard from '@/app/components/shared/WelcomeCard';
import SideBar from '@/app/components/shared/SideBar';
import { AuthProvider } from '@/app/context/AuthContext';
import useProtectedRoute from '@/app/context/useProtectedRoute';
import Loading from "@/app/face-recognition/loading";
const VideoStream = React.lazy(() => import('@/app/components/face-recognition/Livestream'));

// Remove the PageProps interface as it's not necessary here

const Page: React.FC = () => { // Name the component directly
    useProtectedRoute();

    return (
      <div className=''>

      </div>
    );
};

export default Page; // Export the component directly
