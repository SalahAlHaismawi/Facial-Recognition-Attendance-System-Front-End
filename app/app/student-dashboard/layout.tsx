'use client'
import React, { useContext } from 'react';
import Image from 'next/image';
import WelcomeCard from '@/app/components/shared/WelcomeCard';
import AttendanceBox from '@/app/components/shared/AttendanceBox';
import Account from '../../public/icons/Account.png';
import SideBar from '@/app/components/shared/SideBar';
import { AuthContext, AuthProvider } from '../../context/AuthContext';
import useProtectedRoute from '@/context/useProtectedRoute';

const Layout = ({ children }: { children: React.ReactNode }) => {
    useProtectedRoute();
    const { user, isLoading } = useContext(AuthContext); // Get user from context

    return (
        <AuthProvider>
            <div className="flex h-screen w-screen justify-center flex flex-col overflow-y-scroll">
                <div className='flex flex-row-reverse p-5 justify-between'>
                    <div className='flex flex-col items-center justify-center rounded-full bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] p-4 w-[65px] h-[65px]'>
                        <Image src={Account} alt={'Account'} className='w-10 h-10 object-cover rounded-full'/>

                    </div>
                    <div className='bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] text-white text-sm w-3/4 rounded-xl p-2'>
                        <h1>
                            {isLoading ? 'Loading...' : user ? `Welcome Back, ${user.displayName || 'User'}!` : 'Welcome Back, Guest!'}
                        </h1> {/* Display username */}
                    </div>
                </div>
                <div className="flex flex-col flex-grow">
                    <div className='max-w-screen '>
                        <AttendanceBox/>
                    </div>
                    <h1 className='text-white'>Latest Capture:</h1>
                    <div>
                        
                    </div>
                </div>

            </div>
        </AuthProvider>
    );
};

export default Layout;
