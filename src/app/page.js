"use client";
import {useState} from "react";

export default function Home() {
  const [loading,isloading]=useState(true);
  const [playlist,setPlaylist]=useState(null);

  function handleSubmit() {
    return async function (e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const message = formData.get("message");

      if (!message) return;

      isloading(false);

      try {
        const response = await fetch("/api/getPlaylist", {
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
        setPlaylist(data);
        try {
          const resp = JSON.stringify(data.reply);
          console.log(resp);
        } catch (err) {
          console.error('Invalid playlist JSON:', err);
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
      } finally {
        isloading(true);
      }
    };
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-[90vh] p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <form
            onSubmit={handleSubmit()}
            className="flex items-center gap-4">
            <input type="text" name="message" placeholder="What are you in the mood for today ?" className="p-4 rounded-full border border-gray-300 w-[300px] sm:w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </form>
        </div>
      </main>
    </div>
  );
}
