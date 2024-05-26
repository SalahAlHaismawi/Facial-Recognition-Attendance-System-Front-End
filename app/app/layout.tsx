import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Poppins } from 'next/font/google';
import Sidebar from "@/app/components/shared/SideBar";
import { AuthProvider } from "@/context/AuthContext";
import LoadingSkeleton from "@/app/components/shared/LoadingSkeleton";


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

      <body className={poppinsFont.className}>{children}</body>
    </html>
    </AuthProvider>
    
  );
}
