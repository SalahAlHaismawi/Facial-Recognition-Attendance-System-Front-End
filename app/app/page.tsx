'use client'
import Image from "next/image";
import Github from '../public/icons/GitHub.png'
import Microsoft from '../public/icons/Microsoft.png'

import { AuthProvider } from '../context/AuthContext';
import Linkedin from '../public/icons/LinkedIn.png'
import { OAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import React from "react";
import { motion } from "framer-motion";
import Hero from "@/app/components/landing-page/hero";
import LandingPageSection1 from "@/app/components/landing-page/LandingPageSection1";
import LandingPageSection2 from "@/app/components/landing-page/LandingPageSection2";
import LandingPageSection3 from "@/app/components/landing-page/LandingPageSection3";


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

    const Divider = () => {
        return (
            <div className="w-full border-t border-black border-8 my-8"></div>
        );
    };

    const heroText = 'Unlock the power of AI For Ultimate security and attendance tracking'.split();

    return (
        <main className="flex min-h-screen flex-col items-center  w-full">
            <section className="  min-h-screen w-full flex items-center justify-center p-10">
                <Hero/>
            </section>
            <Divider/>
            <section className=" min-h-screen w-full flex items-center justify-center p-10 my-auto">
                <LandingPageSection1/>
            </section>
            <section className=" min-h-screen w-full flex items-center justify-center p-10 my-auto">
                <LandingPageSection2/>
            </section>
            <section className=" min-h-screen w-full flex items-center justify-center p-10 my-auto">
                <LandingPageSection3/>
            </section>

        </main>
    );
}
