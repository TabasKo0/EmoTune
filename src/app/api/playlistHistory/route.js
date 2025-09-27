import { addPlaylist,getPlaylists } from '../../db/playlist.js';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { id, playlist } = await req.json();
    let result=await getPlaylists(id).then(async (plst) => {
          const plast = plst[0] ? JSON.parse(plst[0].playlists) : [];
          console.log(plst);
          console.log("pres",plast);
          plast.push(playlist);
          return  await addPlaylist(id,JSON.stringify(plast));
         
          })
           return NextResponse.json({ 
            success: result.success, 
            id: result.id,
            message: 'Playlist saved successfully' 
          });
    
  } catch (error) {
    console.error('Error saving playlist:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const id = req.cookies.get('spotify_user_id')?.value;
    console.log("id",id);
    const playlists = await getPlaylists(id);
    return NextResponse.json({ success: true, playlists });
  } catch (error) {
    console.error('Error getting playlists:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}