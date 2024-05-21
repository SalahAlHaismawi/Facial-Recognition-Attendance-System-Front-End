'use client'
import Image from "next/image";
import Github from '../public/icons/GitHub.png'
import Microsoft from '../public/icons/Microsoft.png'

import {AuthProvider} from '../context/AuthContext';
import Linkedin from '../public/icons/LinkedIn.png'
import {OAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "@/firebaseConfig";
import React from "react";
import { motion } from "framer-motion";

export default function Home() {

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
    const heroText= 'Unlock the power of AI For Ultimate security and attendance tracking'.split()
  return (

      <main className="flex min-h-screen flex-col items-center  p-10 w-full gap- ">
            <div className=' w-full flex flex-row justify-between  '>



                <div>
                    <h1 className='text-white text-xl'>
                        Envision
                    </h1>
                    <h1 className='text-white text-xl'>
                        Studio
                    </h1>

                </div>

                <button
                    type="submit"
                    onClick={signInWithMicrosoft}
                    className="w-[120px] flex flex-row justify-between items-center p-2  border border-transparent rounded-xl  shadow-lg text-md font-medium text-white bg-gradient-to-b from-[#6707FF] to-[#b01dddcc]"
                >
                   <p className='text-md'>Sign In</p>

                    <Image src={Microsoft} alt={'login-microsoft'} />

                </button>


            </div>
          <div className='w-[90%] text-white mx-auto flex items center  flex-col text-center gap-3 ali my-auto'>
              {heroText.map((el, i) => (
                  <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className='text-7xl'
                      transition={{
                          duration: 0.5,
                          delay: i / 10,
                      }}
                      key={i}
                  >
                      {el}{" "}
                  </motion.span>
              ))}
          </div>

      </main>


  );
}
