"use client";
import React, { use } from 'react'
import { useEffect ,useState} from 'react';
import Image from 'next/image';
import { TrophySpin } from 'react-loading-indicators';

export default function profile() {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/auth/check');
            const data = await res.json();
            console.log(JSON.stringify(data, null, 2));
            setUserData(data);
        };
        fetchData();
    }, []);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);

        function handleResize() {
        setIsMobile(window.innerWidth < 768);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    async function handleLogout() {

        try {
            setIsLoading(true);
            const res=await fetch('/api/auth/logout');
            setIsLoading(false);
            if (res.ok){
                window.location.href='/';
            }else{
                console.error("Error logging out");
            }
        }catch (error) {
            console.error("Error during logout:",error);
        }
    }
    
    return (
        <div className="flex justify-center">
            {!userData?.error ? (
                <div className={`absolute flex items-start bg-tertbac gap-4 p-4 mt-10 rounded-[36px] shadow w-[90vw] ${isMobile ? 'flex-col max-w-[90vw]' : 'flex-row justify-evenly max-w-[50vw]'} min-h-[56vh] `}>
                    {userData?.images?.[0]?.url ? <Image src={userData?.images?.[0]?.url ? userData.images[0].url : null} alt={userData.display_name ? userData.display_name : 'username'} height="200" width="200" className="rounded-[48]"/>:"username"}
                    <div>
                        <div>Username: {userData?.display_name}</div>
                        <div>Email: {userData?.email ? userData.email : "No email provided"}</div>
                    </div>
                    {isLoading ? (
                        <TrophySpin color="#ae104b" size="medium" text="Logging out..." textColor="#870303" />
                    ) : (
                        <button className="absolute bottom-[2em] right-[2em] bg-red-500 text-white px-4 py-2 rounded hover:scale-[1.1] transition duration-300" onClick={handleLogout}>Logout</button>
                    )}
                </div>
            ) : (
                <div className="absolute top-[36vh]"><TrophySpin color="#733893" size="medium" text="loading..." textColor="#870303" />
                </div>
            )}
        </div>
    )
}

/*
{
  "country": "",
  "display_name": "",
  "email": "@.",
  "explicit_content": {
    "filter_enabled": ,
    "filter_locked": 
  },
  "external_urls": {
    "spotify": ""
  },
  "followers": {
    "href": null,
    "total": 2
  },
  "href": "u",
  "id": "h",
  "images": [
    {
      "height": 300,
      "url": "https://i.scdn.co/image/",
      "width": 300
    },
    {
      "height": 64,
      "url": "https://i.scdn.co/image/",
      "width": 64
    }
  ],
  "product": "premium",
  "type": "user",
  "uri": "spotify:user:h"
}
*/