import { addPlaylist,getPlaylists } from '../../db/playlist.js';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { id, playlist } = await req.json();
    let plst= await getPlaylists(id);
    plst=plst.playlists;
    if (plst != []) {
      plst.push(playlist);
    } else {
      plst=[playlist];
    }
    console.log("pres",plst);
    const result = await addPlaylist(id,JSON.stringify(plst));
    return NextResponse.json({ 
      success: true, 
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