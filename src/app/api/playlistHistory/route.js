import { addPlaylist,getPlaylists } from '../../db/playlist.js';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, description, url } = await req.json();
    console.log('Trying to save playlist:', { name, description, url });
    
    const result = await addPlaylist(name, description, url);

    console.log('Playlist saved with ID:', result.id);
    
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
    const playlists = await getPlaylists();
    return NextResponse.json({ success: true, playlists });
  } catch (error) {
    console.error('Error getting playlists:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}