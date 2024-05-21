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
import LaningPageSection1 from "@/app/components/landing-page/LandingPageSection1";
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

    const heroText = 'Unlock the power of AI For Ultimate security and attendance tracking'.split();

    return (
        <main className="flex min-h-screen flex-col items-center p-10 w-full     ">
            <section className="snap-always snap-center min-h-screen w-full flex items-center justify-center">
                <Hero />
            </section>
            {/*<section className="snap- shrink-0 min-h-screen w-full flex items-center justify-center bg-white">*/}
            {/*    <LaningPageSection1/>*/}
            {/*</section>*/}
        </main>
    );
}
