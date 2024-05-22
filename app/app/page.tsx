'use client'

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

const ParallaxSection = ({ children, offset = 100, bgColor, bgGradient, speed = 0.1, snap = true }) => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -offset * speed]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

    const style = {
        backgroundImage: bgGradient,
        backgroundColor: bgColor,
        transform: `translateY(${y})`,
        opacity
    };

    return (
        <motion.div style={style} className={`relative w-full flex items-center justify-center bg-cover ${snap ? 'snap-start' : ''}`}>
            {children}
        </motion.div>
    );
};

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
        <main className="flex flex-col items-center w-full min-h-screen overflow-y-scroll snap-y snap-mandatory">
            <style jsx global>{`
              html {
                scroll-behavior: smooth;
              }
              body {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              }
            `}</style>
            <ParallaxSection offset={0} snap={true}>
                <Hero />
            </ParallaxSection>
            <ParallaxSection offset={100} bgGradient="linear-gradient(to bottom, rgba(103, 7, 255, 1), rgba(176, 29, 221, 0.6))" speed={0.1} snap={true}>
                <LandingPageSection1 />
            </ParallaxSection>
            <ParallaxSection offset={100} bgGradient="linear-gradient(to bottom, rgba(100, 57, 232, 1), rgba(57, 79, 200, 0.6))" speed={0.1} snap={true}>
                <LandingPageSection2 />
            </ParallaxSection>
            <ParallaxSection offset={100} bgGradient="linear-gradient(to bottom, rgba(103, 7, 255, 1), rgba(116, 75, 236, 0.6))" speed={0.1} snap={true}>
                <LandingPageSection3 />
            </ParallaxSection>
            <ParallaxSection offset={0} speed={0.1} snap={false}>
                <Vision />
            </ParallaxSection>
            <ParallaxSection offset={0} speed={0.6} snap={false}>
                <Contact />
            </ParallaxSection>
        </main>
    );
};

export default Home;
