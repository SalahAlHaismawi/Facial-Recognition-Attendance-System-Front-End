import React from 'react';
import Image from "next/image";
import Student from '../../public/Student.png';
const WelcomeCard: React.FC = () => {
    return (
        <div className="bg-purple-600 rounded-lg p-6 flex items-center justify-between w-[90%] mx-auto ">
  <div>
    <div className="text-xs text-gray-300 pb-20">
      September 4, 2023
    </div>
    <div className="text-2xl text-white font-semibold">
      Welcome back, John!
    </div>
    <div className="text-sm text-gray-200">
      Always stay updated in your student portal
    </div>
  </div>
  <div className="relative"> {/* Container for the image and notification icon */}
  <Image 
            src={Student} 
            alt="Graduation Cap" 
            layout="responsive"
            sizes="100vh"
            className="p-4" 
            

          />
  </div>
</div>
    );
};

export default WelcomeCard;