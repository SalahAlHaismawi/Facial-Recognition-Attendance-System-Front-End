import React from 'react';
import Image from 'next/image';
import Package from '../../../public/Package.png';
import Security from '../../../public/Security.png';
import Future from '../../../public/Future.png';

const MyComponent = () => {
    return (
        <div className='w-screen min-h-screen p-10 bg-gradient-to-b from-[#151512] to-[#151515] flex flex-col items-center justify-center'>
            <h1 className='text-5xl text-white mb-5'>Demo:</h1>
            <div className='flex flex-col md:flex-row items-center justify-center w-full max-w-6xl space-y-10 md:space-y-0 md:space-x-10'>
                <div className='w-full md:flex-1'>
                    <div className='w-full overflow-hidden rounded-xl aspect-video'>
                        <iframe
                            className='w-full h-full'
                            src="https://www.youtube.com/embed/W97CpkhRYMA?si=OR-kD-Csq4x4TPh9"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>
                <div className='w-full md:flex-1'>
                    <h2 className='text-3xl text-white mb-4'>Seamless Integration:</h2>
                    <p className='text-white text-xs lg:text-2xl text-justify'>
                        Vision Cafe is designed to integrate seamlessly into your existing infrastructure,
                        offering hassle-free compatibility with all types of CCTV cameras. Whether you're upgrading
                        an old system or installing a new one, Vision Cafe provides a robust solution that enhances
                        security and functionality without requiring significant changes to your current setup.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
