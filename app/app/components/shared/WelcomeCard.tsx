import React from "react";
import Image from "next/image";
import Student from "../../../public/Student.png";
const WelcomeCard: React.FC = () => {
  return (
    <div className="max-w-screen bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] rounded-lg p-6 flex items-center justify-between w-[90%] mx-auto h-[200px]  ">
      <div className="flex w-full">
        <div className="text-xs text-gray-300 ">September 4, 2023</div>
        <div className="text-2xl text-white font-semibold">
          Welcome back, John!
        </div>
        <div className="text-sm text-gray-200 mb-auto">
          Always stay updated in your student portal
        </div>
      </div>
      <div className="self-end mb-auto  ">
        {" "}
        {/* Container for the image and notification icon */}
        <Image
          src={Student}
          alt="Graduation Cap"
          
          sizes="100vh"
          className="max-h-[320px] max-w-[400px] pt-3 "
        />
      </div>
    </div>
  );
};

export default WelcomeCard;
