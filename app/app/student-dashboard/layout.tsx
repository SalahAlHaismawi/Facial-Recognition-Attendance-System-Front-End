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
            <div className="flex h-screen w-screen justify-center pt-10 ">
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