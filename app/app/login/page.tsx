'use client'
import React, { useState } from "react";
import { Poppins } from "next/font/google";
import drawing from "../../public/drawing.png";
import Image from "next/image";
import dynamic from "next/dynamic";
import { auth } from '../../firebaseClient';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    

    const [password, setPassword] = useState('');
    
    const handleSignInWithEmail = async (event: any) => {
        event.preventDefault();

        if (!email.endsWith("@student.mmu.edu.my")) {
            alert("Please use your MMU email");
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            window.location.href = "/dashboard";
            const user = userCredential.user;
            console.log("Signed in user:", user);
            // Redirect or manage user session here
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Login error", errorCode, errorMessage);
            alert("Failed to log in: " + errorMessage);
          });
      };



  return (
    <div className="w-screen h-screen flex">
      <div className="flex flex-row w-1/2 h-screen items-center justify-center bg-Lblack ">
        <div className="w-[50%] ">
        <h1 className="text-[48px] text-white">Login</h1>
            <form className="mt-8">
                <div>
                    
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="mt-2 px-4 py-2 w-full   text-white bg-Lblack border-b"
                        placeholder="Enter Your MMU Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-2 px-4 py-2 w-full   text-white bg-Lblack border-b"
                    />
                </div>
                <div className="mt-6">
                    {/*add a remember me check box*/}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                className="h-4 w-4 text-Lpurple focus:ring-Lpurple border-gray-300 rounded"
                            />
                            <label
                                htmlFor="remember_me"
                                className="ml-2 block text-sm text-white"
                            >
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a
                                href="#"
                                className="font-medium text-Lpurple hover:text-LpurpleDark"
                            >
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                    <button
                        type="submit"
                        onClick={handleSignInWithEmail}
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-Lblue hover:bg-LblueDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-Lpurple bg-Lpurple"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </div>
      </div>
      <div className="w-1/2 h-screen flex flex-col items-center justify-center bg-Lpurple relative">
        
        <h1 className="text-[80px] pb-[600px] text-white ">Welcome to student portal</h1>

       
    
        <Image src={drawing} alt="Image" className="absolute opacity-0.5  pt-[100px]" />

       

      </div>
    </div>
  );
};

export default LoginPage;
