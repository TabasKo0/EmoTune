"use client";
import "./globals.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Prism from '../components/Prism';

export default function RootLayout({ children }) {
  
  const [userData, setUserData] = useState(null);
      useEffect(() => {
          const fetchData = async () => {
              const res = await fetch('/api/auth/check');
              const data = await res.json();
              if(res.status===401 && window.location.pathname!=="/signin"){
                window.location.href='/signin';
              }
              setUserData(data);
          };
          fetchData();
      }, []);
  //console.log(userData);
  return (
    <html lang="en">
      <body
        className={`antialiased bg-black `}
      >
        <div>
          <nav className="fixed left-[5vw] mt-6 mb-14 flex flex-row justify-between items-center  bg-gray-100/20 h-[10vh] text-sm text-gray-500 p-6 ring-4 ring-white/30 w-[90vw] rounded-[24px]">
            <div className="font-bold text-2xl text-background textSize-8xl opacity-100"><Link href="/">EmoTune</Link></div>
            <div className="font-bold text-2xl text-white opacity-100">
            {!userData?.error ? <Link href="/profile">{userData?.images?.[0]?.url ?<Image src={userData?.images?.[0]?.url ? userData.images[0].url : null} alt={userData.display_name ? userData.display_name : 'username'} height={100} width={48} className="rounded-full"/>:"username"}</Link> : <Link href="/signin">Login</Link>}</div>
        </nav>
        <div className="z-[-1] absolute top-0 min-h-[10vh]" style={{ width: '100%', height: '100vh', position: 'fixed' }}>
          <Prism
            animationType="rotate"
            timeScale={0.5}
            height={3.5}
            baseWidth={5.5}
            scale={3.6}
            hueShift={0}
            colorFrequency={1}
            noise={0}
            glow={1}
            
          />
          </div>
        </div>
        <div className="h-[15vh] "></div>
        {children} 
      </body>
    </html>
  );
}
