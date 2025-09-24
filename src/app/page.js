"use client";
import {useState,useEffect} from "react";
import { TrophySpin } from "react-loading-indicators";

export default function Home() {
  const [loading,isloading]=useState(false);
  const [playlist,setPlaylist]=useState(null);
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

  
  async function createPlaylist(accessToken, playlist1) {
      try {
        //console.log("kuch tih hua hau");
        const body = {
          userid:userData.id,
          playlist: playlist1,
          accessToken: accessToken
        };
        console.log(body);
        const response = await fetch(`/api/createPlaylist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        
        const data = await response.json();
        //console.log(data);
        return data;
      } catch (error) {
        console.error("Error creating playlist:", error);
      }
  }
  function handleSubmit() {
    return async function (e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const message = formData.get("message");

      if (!message) return;

      try {
        isloading(true);
        const response = await fetch("/api/geminiPlaylist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        
        const data = await response.json();
        try {
          const resp = JSON.stringify(data.reply).replace(/```json|```/g, '').trim();
          console.log(JSON.parse(resp));
          setPlaylist(JSON.parse(resp));
          const res1 = await fetch('/api/getToken');
          const data1 = await res1.json();
          //console.log(data1.accessToken);
          createPlaylist(data1.accessToken, JSON.parse(resp) );
        } catch (err) {
          console.error('Invalid playlist JSON:', err);
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
      } finally {
        isloading(false);
      }
    };
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-[90vh] p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col">
          <form
            onSubmit={handleSubmit()}
            className="flex items-center gap-4">
            <input type="text" name="message" placeholder="What are you in the mood for today ?" className="p-4 rounded-full border border-gray-300 w-[300px] sm:w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <button type ="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:scale-[1.1] transition duration-300">Generate Playlist</button>
          </form>
          {loading?<TrophySpin color="#530f80" size="medium" text="Loading..." textColor="#530f80" style={{ display: loading ? 'block' : 'none' }} />: null}
        </div>
      </main>
    </div>
  );
}
