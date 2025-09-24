import { NextResponse } from 'next/server';

const protectedRoutes = ['/profile'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const accessToken = request.cookies.get('spotify_access_token');
    if (!accessToken) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile'],
};