import { NextResponse } from 'next/server';

export async function GET() {
    const redurl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = NextResponse.redirect(redurl);
    response.cookies.set('spotify_access_token', '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    });
    response.cookies.set('spotify_refresh_token', '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    });

    return response;
}