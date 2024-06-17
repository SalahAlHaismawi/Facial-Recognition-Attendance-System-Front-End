import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from 'next/head';
import "./globals.css";
import { Poppins } from 'next/font/google';
import Sidebar from "@/app/components/shared/SideBar";
import { AuthProvider } from "@/context/AuthContext";
import LoadingSkeleton from "@/app/components/shared/LoadingSkeleton";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vision Cafe",
  description: "Smart computer vision applications for your business",
};

const poppinsFont = Poppins({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-poppins',
});

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <AuthProvider>
        <html lang="en">
        <Head>
          <title>Vision Cafe</title>
          <meta name="description" content="Smart computer vision applications for your business" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </Head>
        <body className={poppinsFont.className}>
        {children}
        <SpeedInsights />
        <Analytics/>
        </body>
        </html>
      </AuthProvider>
  );
}
