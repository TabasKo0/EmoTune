import { NextResponse } from 'next/server';

export async function GET(request) {
  const access_token = request.cookies.get('spotify_access_token')?.value;
  if (!access_token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const res = await fetch('https://api.spotify.com/v1/me', {
    headers: { Authorization: `Bearer ${access_token}` }
  });
  const data = await res.json();
  return NextResponse.json(data);
}