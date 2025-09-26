import { NextResponse } from 'next/server';

export async function GET(request) {
  const access_token = request.cookies.get('spotify_access_token')?.value;
  if (!access_token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try{
      const res = await fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    if (!res.ok) {
      console.error('Error fetching user data:', res.status, res.text());
    }
    const data = await res.json();
    if (!data || !data.id) {
      return NextResponse.json({ error: 'Error fetching user data' }, { status: 500 });
    }
    const response = NextResponse.json(data);
      response.cookies.set('spotify_user_id', data.id || "rat", {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });
      return response;

  }catch(error){
      return NextResponse.json({ error: 'Error fetching user data' }, { status: 500 });
  }
  
  return NextResponse.json(data);
}