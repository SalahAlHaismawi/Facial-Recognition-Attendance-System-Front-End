import React from "react";
import Image from "next/image";
import Student from "../../../public/Student.png";

const WelcomeCard: React.FC = () => {
    return (
        <div className="max-w-screen bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] rounded-lg p-6 flex items-center justify-between w-[90%] mx-auto h-[200px]">
            <div className="flex flex-col w-full">
                <div className="text-xs text-gray-300">September 4, 2023</div>
                <div className="text-lg text-white font-semibold">Welcome back!</div>
                <div className="text-sm text-gray-200 mb-auto">
                    Always stay updated in your student portal
                </div>
            </div>
            <div className="self-end mb-auto">
                <Image
                    src={Student}
                    alt="Graduation Cap"
                    className="h-auto w-auto max-h-[320px] max-w-[400px] pt-3"
                    layout="responsive"
                />
            </div>
        </div>
    );
};

export default WelcomeCard;
