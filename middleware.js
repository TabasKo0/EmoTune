import { NextResponse } from 'next/server'
 
export function middleware(request) {
  console.log('Middleware running for:', request.nextUrl.pathname);
  console.log('Cookies:', request.cookies.getAll());
  
  if (!request.cookies.has("spotify_access_token")) {
    console.log('No spotify_access_token found, redirecting to signin');
    return NextResponse.redirect(new URL('/signin', request.url));
  }
  
  console.log('Token found, allowing access');
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/profile'],
}