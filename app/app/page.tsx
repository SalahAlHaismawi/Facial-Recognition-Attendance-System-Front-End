'use client';
import Image from "next/image";
import Github from '../public/icons/GitHub.png';
import Microsoft from '../public/icons/Microsoft.png';
import Linkedin from '../public/icons/LinkedIn.png';
import { AuthProvider } from '../context/AuthContext';
import { OAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import React from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import Hero from "@/app/components/landing-page/Hero";
import LandingPageSection1 from "@/app/components/landing-page/LandingPageSection1";
import Section1Image from '../public/section1Image.png';
import LandingPageSection3 from "@/app/components/landing-page/LandingPageSection3";
import LandingPageSection2 from "@/app/components/landing-page/LandingPageSection2";
import Vision from "@/app/components/landing-page/Vision";
import Package from "@/public/Package.png";
import Security from "@/public/Security.png";
import Future from "@/public/Future.png";
import Contact from "@/app/components/landing-page/Contact";

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
        <main className="flex flex-col items-center w-full min-h-screen snap-y snap-mandatory">
                <Hero />

                <LandingPageSection1 />

                <LandingPageSection2 />

                <LandingPageSection3 />

                <Vision />

                <Contact />
        </main>
    );
};

export default Home;
