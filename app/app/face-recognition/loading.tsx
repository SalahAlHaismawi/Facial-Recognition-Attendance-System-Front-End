import React from 'react';
import Image from "next/image";
import loadingGif from "@/public/loadingGif.gif";

const Loading = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Image
                src={loadingGif}
                alt="Graduation Cap"

                sizes="100vh"
                className="max-h-[320px] max-w-[400px] pt-3 "
            />
        </div>
    );
};

export default Loading;