'use client';
import Image from "next/image";
import Github from '../public/icons/GitHub.png';
import Microsoft from '../public/icons/Microsoft.png';
import LinkedIn from '../public/icons/LinkedIn.png';
import { AuthProvider } from '../context/AuthContext';
import { OAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import React from "react";
import Hero from "@/app/components/landing-page/Hero";
import LandingPageSection1 from "@/app/components/landing-page/LandingPageSection1";
import LandingPageSection3 from "@/app/components/landing-page/LandingPageSection3";
import LandingPageSection2 from "@/app/components/landing-page/LandingPageSection2";
import Vision from "@/app/components/landing-page/Vision";
import Contact from "@/app/components/landing-page/Contact";
import Demo from "@/app/components/landing-page/Demo";

const Home = () => {
    const signInWithMicrosoft = async () => {
        const provider = new OAuthProvider('microsoft.com');
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("User signed in: ", user);
        } catch (error) {
            console.error("Authentication failed: ", error);
            alert("Login failed: " + error.message);
        }
    };

    return (
        <main className="h-screen overflow-y-auto scrollbar-custom overflow-x-hidden snap-y snap-mandatory">
            <div className="h-screen flex justify-center items-center w-screen snap-start">
                <Hero />
            </div>
            <div className="flex justify-center items-center h-screen w-screen snap-center">
                <LandingPageSection1 />
            </div>
            <div className="flex justify-center items-center h-screen w-screen snap-center">
                <LandingPageSection2 />
            </div>
            <div className="flex justify-center items-center h-screen w-screen snap-center">
                <LandingPageSection3 />
            </div>
            <div className="flex justify-center items-center w-screen snap-center">
                <Vision />
            </div>
            <div className="flex justify-center items-center w-screen h-screen snap-center">
                <Demo />
            </div>
            <div className="snap-center flex justify-center items-center w-screen flex flex-col pt-10">
                <Contact />
            </div>
            <div className="w-screen p-5 bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] text-white flex flex-row justify-between">
                <h1 className="text-xl">Developed By: Salah AlHaismawi</h1>
                <div className="flex flex-row snap-start">
                    <a href="https://github.com/SalahAlHaismawi" target="_blank" rel="noopener noreferrer">
                        <Image src={Github} alt="GitHub" width={55} height={55} />
                    </a>
                    <a href="https://www.linkedin.com/in/salah-alhaismawi-a62696228/" target="_blank" rel="noopener noreferrer">
                        <Image src={LinkedIn} alt="LinkedIn" width={55} height={55} />
                    </a>
                </div>
            </div>
        </main>
    );
};

export default Home;
