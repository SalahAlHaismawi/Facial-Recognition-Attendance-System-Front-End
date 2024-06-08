import React from 'react';
import Profile from '../components/shared/Profile';
import Manage from "@/app/components/Manage-Students/Manage";
import SideBar from "@/app/components/shared/SideBar"; // Adjust the import path as necessary

const ManageStudents = () => {
    return (
        <div className="flex h-screen w-screen justify-center pt-10">
            <SideBar/>
            <div className="flex flex-col flex-grow p-10">
                <Manage/>

            </div>
        </div>
    );
};

export default ManageStudents;
