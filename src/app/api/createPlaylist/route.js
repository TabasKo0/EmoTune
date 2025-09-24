import { NextResponse } from 'next/server';

export async function POST(req) {
    console.log("here");
    const resp = await req.json();
    const playlist = JSON.parse(resp.playlist);
    if (!resp || !playlist || !resp.accessToken || !resp.userid) {
        return NextResponse.json({ reply: 'Invalid playlist data.' });
    }
    const url = `https://api.spotify.com/v1/users/${resp.userid}/playlists`;
    const body= {
        name: playlist.playlistName,
        description: playlist.description,
        public: false,
      };
    //console.log("Rat",resp, url, body);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${resp.accessToken}` 
        },          
            body: JSON.stringify(body)
        });
        
        const playlistData = await response.json();
        
        async function getTrackUri(title, artist) {
            const q = `track:${title} artist:${artist}`;
            const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track&limit=1`;

            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${resp.accessToken}` }
            });
            const data = await response.json();
            if (data.tracks && data.tracks.items.length > 0) {
                return data.tracks.items[0].uri;
            }
            return null;
            }

            const uris = await Promise.all(
            playlist.songs.map(song =>
                getTrackUri(song.title, song.artist)
            )
            );
            const validUris = uris.filter(Boolean); // Remove any not found

        console.log("playlistdata",playlistData);
        const trackUrl=`https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`;
    

        console.log(validUris);
        const songResponse = await fetch(trackUrl, {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${resp.accessToken}` 
        },          
            body: JSON.stringify({uris: validUris})
        });
        const songData = await songResponse.json();
        console.log(songData);
        return NextResponse.json({ 
            playlist: playlistData, 
            addTracksResult: songData 
        });
    }catch (error) {
        console.error(error);
        return NextResponse.json({ reply: 'Error creating playlist.' });
    }
}
