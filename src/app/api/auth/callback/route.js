import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    if (error) {
        return NextResponse.redirect('/?error=spotify_auth_failed');
    }
    if (!code) {
        return NextResponse.redirect('/?error=missing_code');
    }
    console.log('Authorization code received:', code);
    const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
        client_id,
        client_secret
        }).toString()
    });
    //console.log('Token response status:', tokenRes.status);
    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) {
        return NextResponse.redirect('/?error=token_exchange_failed');
    }

    const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
    response.cookies.set('spotify_access_token', tokenData.access_token, {
        httpOnly: true,
        maxAge: tokenData.expires_in,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    });
    response.cookies.set('spotify_refresh_token', tokenData.refresh_token, {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    });
    return response;
    }