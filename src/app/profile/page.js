"use client";
import React, { use } from 'react'
import { useEffect ,useState} from 'react';
import Image from 'next/image';
import { TrophySpin } from 'react-loading-indicators';

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [playlists,setPlaylists]=useState(null);
    const [show,isshow] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/auth/check');
            const data = await res.json();
            //console.log(JSON.stringify(data));
            setUserData(data);
        };
        fetchData();
        const fetchPlaylists = async () => {
            const res = await fetch('/api/playlistHistory');
            const data = await res.json();
            setPlaylists(data.playlists);
            isshow(new Array(data.playlists.length).fill(false));
            //console.log("Wdadawd",playlists)
            console.log(data);
        }
        fetchPlaylists();
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
        <div className="flex flex-col items-center text-foreground">
                <div>{!userData?.error ? (
                    <div className={`flex justify-end bg-tertbac gap-4 p-8 mt-10 rounded-[48] shadow w-[90vw] flex-col justify-start max-w-[90vw] `}>
                        <div className="flex flex-row gap-10 ">{userData?.images?.[0]?.url ? <Image src={userData?.images?.[0]?.url ? userData.images[0].url : null} alt={userData.display_name ? userData.display_name : 'username'} height="200" width="200" className="rounded-[48]"/>:"username"}
                            <div className='text-2xl'>
                                <div>Username: {userData?.display_name}</div>
                                <div>Email: {userData?.email ? userData.email : "No email provided"}</div>
                            </div>
                        </div>
                        <div className="m-6">
                            {isLoading ? (
                                <TrophySpin color="#ae104b" size="medium" text="Logging out..." textColor={"#d5bf9dff"} />
                            ) : (
                                <button className="bg-red-500 text-white px-4 py-2 rounded hover:scale-[1.1] transition duration-300" onClick={handleLogout}>Logout</button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="absolute top-[36vh]"><TrophySpin color="#733893" size="medium" text="loading..." textColor="#870303" />
                    </div>
                )}
            </div>
            <h2 className="text-2xl font-bold mt-10 mb-4">Your Playlists</h2>
            <ol className="flex flex-col justify-center items-center mb-10 gap-4 w-[90vw] max-w-4xl">
                {playlists ? playlists.map((item, index) => (
                    <li key={index}><div className="bg-secondaryBackground min-w-[90vw] p-4 rounded-[20px]">
                        <div className="flex flex-row justify-between "><div><div className="font-bold text-foreground text-3xl ">{item.name}</div>
                            <div>{item.description}</div></div>
                            <div><button onClick={() => isshow(prev => {
                                const newShow = [...prev];
                                newShow[index] = !newShow[index];
                                return newShow;
                            })}>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                >
                                <path d="M6 9l6 6 6-6" />
                                </svg>
                                </button></div>
                            </div>
                        <embed src={"https://open.spotify.com/embed/playlist/"+item.url} className={`w-[90vw] h-[10em] object-cover ${show[index] ? '' : 'hidden'}`} />
                    </div></li>
                )) : null}
            </ol>
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