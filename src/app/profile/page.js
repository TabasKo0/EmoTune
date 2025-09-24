"use client";
import React, { use } from 'react'
import { useEffect ,useState} from 'react';
import Image from 'next/image';

export default function profile() {
    const [userData, setUserData] = useState(null);
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
            const res=await fetch('/api/auth/logout');
            if (res.ok){
                console.log("Logged out");
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
                <div className={`absolute flex items-center bg-tertbac gap-4 p-4 mt-10 rounded-[36px] shadow w-[90vw] ${isMobile ? 'flex-col' : 'flex-row'}`}>
                    {userData?.images?.[0]?.url ? <Image src={userData?.images?.[0]?.url ? userData.images[0].url : null} alt={userData.display_name ? userData.display_name : 'username'} height={100} width={48} className="rounded-[48]"/>:"username"}
                    <div><div>Username: {userData?.display_name}</div>
                    <div>Email: {userData?.email ? userData.email : "No email provided"}</div>
                    </div>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:scale-[1.2]" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

/*
{
  "country": "IN",
  "display_name": "fat_PANDA_1",
  "email": "souptikshivam@gmail.com",
  "explicit_content": {
    "filter_enabled": false,
    "filter_locked": false
  },
  "external_urls": {
    "spotify": "https://open.spotify.com/user/hbpl35dylvao9w9jmzv4gu2ru"
  },
  "followers": {
    "href": null,
    "total": 2
  },
  "href": "https://api.spotify.com/v1/users/hbpl35dylvao9w9jmzv4gu2ru",
  "id": "hbpl35dylvao9w9jmzv4gu2ru",
  "images": [
    {
      "height": 300,
      "url": "https://i.scdn.co/image/ab6775700000ee85b5f4fe94542242d727ec4ad8",
      "width": 300
    },
    {
      "height": 64,
      "url": "https://i.scdn.co/image/ab67757000003b82b5f4fe94542242d727ec4ad8",
      "width": 64
    }
  ],
  "product": "premium",
  "type": "user",
  "uri": "spotify:user:hbpl35dylvao9w9jmzv4gu2ru"
}
*/