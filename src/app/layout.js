"use client";
import "./globals.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";



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
        className={`antialiased`}
      >
        <nav className="flex flex-row justify-between items-center  bg-secondaryBackground h-[10vh] text-sm text-gray-500 p-6 shadow">
          <div className="font-bold text-2xl text-foreground textSize-8xl"><Link href="/">EmoTune</Link></div>
          <div className="font-bold text-2xl text-foreground">
            {!userData?.error ? <Link href="/profile">{userData?.images?.[0]?.url ?<Image src={userData?.images?.[0]?.url ? userData.images[0].url : null} alt={userData.display_name ? userData.display_name : 'username'} height={100} width={48} className="rounded-full"/>:"username"}</Link> : <Link href="/signin">Login</Link>}</div>
        </nav>
        {children}
      </body>
    </html>
  );
}
