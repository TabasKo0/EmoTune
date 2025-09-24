"use client";
import {useState,useEffect} from "react";
import { TrophySpin } from "react-loading-indicators";

export default function Home() {
  const [loading,isloading]=useState(false);
  const [playlisturl,setPlaylist]=useState(null);
  const [playlist,setPlaylistData]=useState(null);
  const [userData, setUserData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
      useEffect(() => {
          setIsMobile(window.innerWidth < 768);
  
          function handleResize() {
          setIsMobile(window.innerWidth < 768);
          }
          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);
      }, []);
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
        //console.log(data.playlistUrl);
        setPlaylist(data.playlistUrl);
        fetchPlaylistDetails(data.playlistUrl, accessToken);
        //console.log(data);
        return data;
      } catch (error) {
        console.error("Error creating playlist:", error);
      }
  }

  async function fetchPlaylistDetails(playlistUrl, accessToken) {
      const playlistId = playlistUrl;

      // Fetch the playlist details from Spotify API
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Spotify API error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      setPlaylistData(data);
      return data;
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
    <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center min-h-[90vh] p-8 pb-20 gap-16 ">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col">
          <form
            onSubmit={handleSubmit()}
            className="flex items-center flex-col gap-4">
            <input type="text" name="message" placeholder="What are you in the mood for today ?" className="p-4 rounded-full border border-gray-300 w-[300px] sm:w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <button type ="submit" className="bg-secondaryBackground text-foreground px-4 py-2 rounded-full hover:scale-[1.1] transition duration-300">Generate Playlist</button>
          </form>
          {loading?<TrophySpin color="#530f80" size="medium" text="Loading..." textColor="#530f80" style={{ display: loading ? 'block' : 'none' }} />: null}
          {playlisturl ? <div> <div className={`bg-secondaryBackground text-white rounded-xl p-8 max-w-4xl mx-auto flex  gap-8 ${isMobile ? 'flex-col' : 'flex-row'} sm:flex-row items-center sm:items-start`}>
      {playlist?.images?.[0]?.url && (
        <div className="flex-shrink-0">
          <img
            src={playlist.images[0].url}
            alt={playlist.name}
            className="w-48 h-48 rounded-lg object-cover"
          />
        </div>
      )}

      <div className="flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-3xl font-bold mb-2">{playlist?.name}</h2>
          <p className="text-gray-300 mb-4">{playlist?.description}</p>
          <p className="mb-2">
            <span className="font-semibold">By:</span>{" "}
            {playlist?.owner?.external_urls?.spotify ? (
              <a
                href={playlist?.owner.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                {playlist?.owner.display_name}
              </a>
            ) : (
              playlist?.owner?.display_name
            )}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Tracks:</span> {playlist?.tracks?.total}
          </p>
        </div>
        <div className="mt-6">
          <a
            href={playlist?.external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-foreground hover:bg-green-600 text-tertbac px-8 py-2 rounded-full font-bold transition"
          >
            Open in Spotify
          </a>
        </div>
      </div>
    </div>
    <div className="max-w-4xl mx-auto mt-10">
      <h3 className="text-2xl font-semibold mb-4">Tracks</h3>
      <ol className="space-y-6">
        {playlist?.tracks?.items?.map((item, i) =>
          item?.track ? (
            <li
              key={item.track.id || i}
              className="flex items-center gap-4 bg-secondaryBackground p-4 rounded-lg"
            >
              {item.track.album?.images?.[0]?.url && (
                <img
                  src={item.track.album.images[0].url}
                  alt={item.track.album.name}
                  className="w-12 h-12 rounded-md object-cover"
                />
              )}
              <div className="flex-1 ">
                <div className="font-semibold text-lg flex items-center gap-2">
                  {item.track.external_urls?.spotify ? (
                    <a
                      href={item.track.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-foreground"
                    >
                      {item.track.name}
                    </a>
                  ) : (
                    item.track.name
                  )}
                  <span className="text-gray-400 text-sm font-normal">
                    by{" "}
                    {item.track.artists.map((artist, j) =>
                      artist.external_urls?.spotify ? (
                        <a
                          key={artist.id}
                          href={artist.external_urls.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-foreground"
                        >
                          {artist.name}
                          {j < item.track.artists.length - 1 ? ", " : ""}
                        </a>
                      ) : (
                        <span key={artist.id}>
                          {artist.name}
                          {j < item.track.artists.length - 1 ? ", " : ""}
                        </span>
                      )
                    )}
                  </span>
                </div>
                <div className="text-gray-400 text-sm">{item.track.album?.name}</div>
              </div>
            </li>
          ) : null
        )}
      </ol>
    </div></div>  : null}
        </div>
      </main>
    </div>
  );
}
