"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  
  const [userData, setUserData] = useState(null);
      useEffect(() => {
          const fetchData = async () => {
              const res = await fetch('/api/auth/check');
              const data = await res.json();
              //console.log(JSON.stringify(data, null, 2));
              setUserData(data);
          };
          fetchData();
      }, []);
  //console.log(userData);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex flex-row justify-between items-center  bg-secondaryBackground h-[10vh] text-sm text-gray-500 p-6 shadow">
          <div className="font-bold text-2xl text-foreground textSize-8xl"><a href="/">EmoTune</a></div>
          <div className="font-bold text-2xl text-foreground">
            {!userData?.error ? <a href="/profile">{userData?.images?.[0]?.url ?<Image src={userData?.images?.[0]?.url ? userData.images[0].url : null} alt={userData.display_name ? userData.display_name : 'username'} height={100} width={48} className="rounded-full"/>:"username"}</a> : <a href="/signin">Login</a>}</div>
        </nav>
        {children}
      </body>
    </html>
  );
}
