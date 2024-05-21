import React from 'react';
import Image from "next/image";
import Microsoft from "@/public/icons/Microsoft.png";
import {motion} from "framer-motion";
import {OAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "@/firebaseConfig";

const MyComponent = () => {
    const heroText= 'Unlock the power of AI For Ultimate security and attendance tracking'.split(' ');

    const signInWithMicrosoft = async () => {
        const provider = new OAuthProvider('microsoft.com');

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("User signed in: ", user);
            // You can now handle the signed-in user in your app
        } catch (error) {
            console.error("Authentication failed: ", error);
            alert("Login failed: " + error.message);
        }
    };

    return (
        <div className='flex flex-col items-center  w-full min-h-screen'>
            <div className='w-full flex flex-row justify-between'>
                <div >
                    <h1 className='text-white text-xl'>Vision</h1>
                    <h1 className='text-white text-xl'>Cafe</h1>
                </div>

                <button
                    type="submit"
                    onClick={signInWithMicrosoft}
                    className="w-[120px] h-[50px] flex flex-row justify-between items-center p-2 border border-transparent rounded-xl shadow-lg text-md font-medium text-white bg-gradient-to-b from-[#6707FF] to-[#b01dddcc]"
                >
                    <p className='text-md'>Sign In</p>
                    <Image src={Microsoft} alt={'login-microsoft'}/>
                </button>
            </div>

            <div className='flex flex-grow items-center justify-center w-full'>
                <div className='w-[70%] text-white mx-auto flex items-center text-center gap-3 flex-wrap'>
                    {heroText.map((el, i) => (
                        <motion.span
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            className='text-7xl 2xl:text-8xl font-bold'
                            transition={{
                                duration: 0.7,
                                delay: i / 10,
                            }}
                            key={i}
                        >
                            {el}{" "}
                        </motion.span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
