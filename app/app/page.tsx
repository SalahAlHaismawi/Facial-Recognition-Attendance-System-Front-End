'use client';
import Image from "next/image";
import Github from '../public/icons/GitHub.png';
import Microsoft from '../public/icons/Microsoft.png';
import Linkedin from '../public/icons/LinkedIn.png';
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
import LinkedIn from "../public/linkedIn.png";

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
        <main className="snap-y snap-mandatory h-screen overflow-y-scroll overflow-x-hidden ">
            <div className="snap-start h-screen flex justify-center items-center w-screen">
                <Hero />
            </div>
            <div className="snap-start flex justify-center items-center ">
                <LandingPageSection1 />
            </div>
            <div className="snap-start h-screen flex justify-center items-center w-screen">
                <LandingPageSection2 />
            </div>
            <div className="snap-start h-screen flex justify-center items-center w-screen">
                <LandingPageSection3 />
            </div>
            <div className="snap-start flex justify-center items-center w-screen">
                <Vision />
            </div>
            {/*<div className="snap-start h-screen flex justify-center items-center w-screen ">*/}
            {/*    <Contact />*/}
            {/*</div>*/}
            {/*<div className='w-screen  p-5 bg-gradient-to-b from-[#6707FF] to-[#b01dddcc] text-white flex flex-row justify-between'>*/}
            {/*    <h1 className='text-xl'>Developed By: Salah AlHaismawi</h1>*/}
            {/*    <div className='flex flex-row'>*/}
            {/*        <Image src={Github} alt={"GitHub"} />*/}
            {/*        <Image src={LinkedIn} alt={"LinkedIn"} />*/}
            {/*    </div>*/}
            {/*</div>*/}
        </main>
    );
};

export default Home;
