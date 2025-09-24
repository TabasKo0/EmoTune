import { NextResponse } from 'next/server';

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
  const scope = [
    'user-read-private',
    'user-read-email',
    'playlist-modify-public',
    'playlist-modify-private'
  ].join(' ');
  const state = Math.random().toString(36).substring(2);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id,
    redirect_uri,
    scope,
    state
  });

  const url = `https://accounts.spotify.com/authorize?${params.toString()}`;
  return NextResponse.json({ url });
}